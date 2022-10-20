
// the list of the nodes that were detected on the stream
var nodeList = {};

let file = '../dist/J1939-Sample-Data-CL3000.TXT';
let lastNodeClicked ='';
let offset = 1000;
let fileContents = ["11T082554602;1;cf00203;cd402800043828ff","11T082554603;1;c00000b;fcffff7dffffffff",
"11T082554604;1;cf00400;f4dede3028fff0ff","11T082554604;1;18fee527;be7a0400d8b60e00",
"11T082554606;1;cef27fd;20fffae1ff00ffff", "11T082554611;1;c000003;ecffffffffffffff"];

let table = document.getElementById('table-body')
var flag = false;
var i = 0;
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

let right = document.getElementById('right-column');
for(let node in nodeList){
  let newNode = document.createElement("div");
  newNode.id = `${nodeList[node]}`;
  newNode.className ='node';
  newNode.innerHTML = `<img id="${nodeList[node]}"class="icon" src="../dist/assets/${nodeList[node]}.png" alt ="s"/>${nodeList[node]}`;
  newNode.style.left = `${offset}px`;
  offset += 80;
  right.append(newNode);
  dragElement(newNode);

}

const addNodeForm = document.getElementById('modal-add');
addNodeForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const modal = document.getElementById("id01");
  modal.style.display = 'none';
  const name = document.getElementById('nodeName');
  const id = document.getElementById("nodeID");
  let newNode = document.createElement("div");
  newNode.id = `node6`;
  newNode.className ='node';
  newNode.innerHTML = `<img id="${newNode.id}"class="icon" src="../dist/assets/node1.png" alt ="s"/>test`;
  right.append(newNode);
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

/*right.addEventListener('click', async (event) => {
  event.preventDefault();

})*/