// <reference path="typescript/global.d.ts" />
//const { read } = require("fs");
//var diagramming = require("@mindfusion/pack ");

// the list of the nodes that were detected on the stream
var nodeList = {};
//Wanted to read the txt file but cannot do it on base js
let file = '../dist/J1939-Sample-Data-CL3000.TXT';
var keepReading = false;
const worker = new Worker("../src/worker.js");

//the last node that was clicked for selection
let lastNodeClicked = '';
//offset to make the nodes not appear on the same place/ initial value will be 1000 becuase thats where the right section is 
let offset = 1000;
// the contents of the table
let fileContents = ["11T082554602;1;cf00203;cd402800043828ff", "11T082554603;1;c00000b;fcffff7dffffffff",
  "11T082554604;2;cf00400;f4dede3028fff0ff", "11T082554604;12;18fee527;be7a0400d8b60e00",
  "11T082554606;3;cef27fd;20fffae1ff00ffff", "11T082554611;10;c000003;ecffffffffffffff"];

//get the table from the page
let table = document.getElementById('table-body')
//aux vars
//var flag = false;
var i = 0;


//fill the table with the contents of the dictionary. cannot read file with base js
for (let row of fileContents) {

  let rowContents = row.split(';');
  let newTableRow = document.createElement('tr');
  newTableRow.innerHTML = `<td> ${rowContents[0]}</td>
                           <td> ${rowContents[1]}</td>
                           <td> ${rowContents[2]}</td>
                           <td> ${rowContents[3]}</td>
                           <td> <button id="button${row}">opt</button> </td>`;
  table.appendChild(newTableRow);
  if (!(rowContents[2] in nodeList)) { nodeList[rowContents[2]] = `node${i}`; i++; }
}

// this is the right section of the page
let right = document.getElementById('right-column');

//create a node for every id in the node list, will have to change this for an event listener that adds a node every time it detects one
// or create a worker thread to do it
for (let node in nodeList) {
  //nodes are divs with class name node and id node<number of node>
  let newNode = document.createElement("div");
  //save the node id with the value of the node list
  newNode.id = `${nodeList[node]}`;
  //change the div class to node
  newNode.className = 'node';
  //add the icon inside of the div the icon is inside of the assets folder of the project
  newNode.innerHTML = `<img id="${nodeList[node]}"class="icon" src="../dist/assets/${nodeList[node]}.png" alt ="s"/>${nodeList[node]}`;
  //change the position with the offset so that nodes appear one every <offset> pixels
  newNode.style.left = `${offset}px`;
  //add to the offset
  offset += 80;
  //add the node to the right side of the page

//const line = document.createElement("svg");
//line.innerHTML=`<line x1="50" y1="50" x2="${offset}" y2="${2000}" stroke="black"/>`;
newNode.addEventListener('click',async (event)=>{
    lastNodeClicked = newNode.id;
})  
  
  right.append(newNode);
  //right.append(line);
  //make the node draggable
  dragElement(newNode);

}

//this is the  that appears when we press add node
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
  newNode.className = 'node';
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
      // if(lastNodeClicked !== NaN){
      //   let last = document.getElementById(lastNodeClicked);
      //   last.style.backgroundColor ='rgb(0,0,0,0.0)';
      
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
      switchcount++;
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


worker.onmessage = function (message) {
  //const type = message.data.info.data.timestamp;
  //console.log(message.data.Object)
  //console.log(message.data.id)
  const time = message.data.timestamp;
  const id = message.data.id;
  const len = message.data.len;
  const channel = message.data.channel;

  if (time == undefined) {

  } else {
    const row = document.createElement('tr');
    row.innerHTML = `<td> ${time}</td>
                 <td> ${id}</td>
                 <td> ${channel}</td>
                 <td> ${len}</td>
                 <td></td>`
    table.appendChild(row);
    console.log(keepReading)
    if (keepReading == true) { worker.postMessage('read'); }
  }
}

const play = document.getElementById('play-button');
play.addEventListener('click', async (event) => {
  event.preventDefault();
  //await readTraffic();
  keepReading = true;
  worker.postMessage('read');

});

const pause = document.getElementById('pause-button');
pause.addEventListener('click', async (event) => {
  event.preventDefault();
  //await readTraffic();
  console.log(keepReading)
  keepReading = false;
  worker.postMessage('stop');

});


table.addEventListener('click', async (event) => {
  event.preventDefault();
  if (event.target.tagName == "BUTTON") {
    document.getElementById('msgModalContainer').style.display = "block";
    const button = event.target;
    console.log(button.parentNode.parentNode.tagName)
    const row = button.parentNode.parentNode;
    const arr = row.innerText.split('\t');

    document.getElementById('msgTimestamp').value = arr[0]
    document.getElementById('msgType').value = arr[1]
    document.getElementById('msgID').value = arr[2]
    document.getElementById('msgData').value = arr[3]
  }
})


// const saveMsgForm = document.getElementById('modal-saveMessage');
// //event listener that listens for the submit button on the modal
// saveMsgForm.addEventListener('submit', async (event) => {
//   event.preventDefault();//stop the page from reloading
// //get the modal window
//   const modal = document.getElementById("msgModalContainer");
// //when we submit we will hide the modal, so the display property is set to none
//   modal.style.display = 'none';
//   var myobj_1 = {timestamp:document.getElementById('msgTimestamp').value, 
//                 type: document.getElementById('msgType').value, 
//                 id:   document.getElementById('msgID').value,
//                 data: document.getElementById('msgData').value}
// });

const testButton = document.getElementById('save_packets');
testButton.addEventListener('click', async (event) => {
  event.preventDefault();
  const row_data = table.rows;
  const final_row_data = [];

  for (i = 0; i < row_data.length; i++) {
    const string_data = row_data[i].innerText;
    const string_array = string_data.split("\t");
    final_row_data.push(string_array);
  }



  const packet = await fetch('http://127.0.0.1:8383/save_packet', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        packet: final_row_data
    })
})
});


const rmNode = document.getElementById('rmvNode');
rmNode.addEventListener('click', async (event)=>{
  if(lastNodeClicked != undefined){
      const n = document.getElementById(`${lastNodeClicked}`)
      right.removeChild(n);
  }
})
