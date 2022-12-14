(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//const { read } = require("fs");

// the list of the nodes that were detected on the stream
var nodeList = {};
//Wanted to read the txt file but cannot do it on base js
let file = '../dist/J1939-Sample-Data-CL3000.TXT';

const worker = new Worker("../src/worker.js");

//the last node that was clicked for selection
let lastNodeClicked ='';
//offset to make the nodes not appear on the same place/ initial value will be 1000 becuase thats where the right section is 
let offset = 1000;
// the contents of the table
let fileContents = ["11T082554602;1;cf00203;cd402800043828ff","11T082554603;1;c00000b;fcffff7dffffffff",
"11T082554604;2;cf00400;f4dede3028fff0ff","11T082554604;12;18fee527;be7a0400d8b60e00",
"11T082554606;3;cef27fd;20fffae1ff00ffff", "11T082554611;10;c000003;ecffffffffffffff"];

//get the table from the page
let table = document.getElementById('table-body')
//aux vars
//var flag = false;
var i = 0;


//fill the table with the contents of the dictionary. cannot read file with base js
for(let row of fileContents){
    
    let rowContents = row.split(';');
    let newTableRow = document.createElement('tr');
    newTableRow.innerHTML=`<td> ${rowContents[0]}</td>
                           <td> ${rowContents[1]}</td>
                           <td> ${rowContents[2]}</td>
                           <td> ${rowContents[3]}</td>`;
    table.appendChild(newTableRow);
  if(!(rowContents[2] in nodeList)){nodeList[rowContents[2]] = `node${i}`;i++;}
}

// this is the right section of the page
let right = document.getElementById('right-column');

//create a node for every id in the node list, will have to change this for an event listener that adds a node every time it detects one
// or create a worker thread to do it
for(let node in nodeList){
  //nodes are divs with class name node and id node<number of node>
  let newNode = document.createElement("div");
  //save the node id with the value of the node list
  newNode.id = `${nodeList[node]}`;
  //change the div class to node
  newNode.className ='node';
  //add the icon inside of the div the icon is inside of the assets folder of the project
  newNode.innerHTML = `<img id="${nodeList[node]}"class="icon" src="../dist/assets/${nodeList[node]}.png" alt ="s"/>${nodeList[node]}`;
  //change the position with the offset so that nodes appear one every <offset> pixels
  newNode.style.left = `${offset}px`;
  //add to the offset
  offset += 80;
  //add the node to the right side of the page
const line = document.createElement("svg");
line.innerHTML=`<line x1="50" y1="50" x2="${offset}" y2="${2000}" stroke="black"/>`;

  
  right.append(newNode);
  right.append(line);
  //make the node draggable
  dragElement(newNode);

}

//this is the modal that appears when we press add node
const addNodeForm = document.getElementById('modal-add');
//event listener that listens for the submit button on the modal
addNodeForm.addEventListener('submit', async (event) => {
  event.preventDefault();//stop the page from reloading
//get the modal window
  const modal = document.getElementById("id01");
//when we submit we will hide the modal, so the display property is set to none
  modal.style.display = 'none';
  //getting the text input elements on the modal
  const name = document.getElementById('nodeName');
  const id = document.getElementById("nodeID");
  let newNode = document.createElement("div");
  // for now the id and the class name for the new node are hard coded, will have to CHANGE THIS
  newNode.id = `node6`;
  newNode.className ='node';
  newNode.innerHTML = `<img id="${newNode.id}"class="icon" src="../dist/assets/node1.png" alt ="s"/>test`;
  //after defining the properties add the new node to the right side of the page
  right.append(newNode);
  //make the element draggable
  dragElement(newNode);
})





// function to make the node elements draggable 
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    console.log(lastNodeClicked)
    if(e.target.className ==="node"){
      if(lastNodeClicked !== ""){
        let last = document.getElementById(lastNodeClicked);
        last.style.backgroundColor ='rgb(0,0,0,0.0)';
      }
      console.log(elmnt.id);
      lastNodeCliecked = elmnt.id;
      elmnt.style.backgroundColor = 'red';
      elmnt.style.border = '1px solid';
    }
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
//sort the table based on what header is clicked
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("message-table");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}


function filter() {
  var input, filter, table, tr, td, i, txtValue, selection;
  filter = document.getElementById("filters");
  selection = filter.value;
  input = document.getElementById("filter-input");
  filter = input.value.toUpperCase();
  table = document.getElementById("message-table");
  tr = table.getElementsByTagName("TR");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("TD")[selection];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}

worker.onmessage = function(message){
  console.log(message.data)
}

const play = document.getElementById('play-button');
play.addEventListener('click', async (event) => {
  event.preventDefault();
  //await readTraffic();
  worker.postMessage('something');
  
});
/*
const flag = false;
async function readTraffic(){
  while(flag == false){
    console.log("shiiiiiit");
  }
}*/


},{}]},{},[1]);
