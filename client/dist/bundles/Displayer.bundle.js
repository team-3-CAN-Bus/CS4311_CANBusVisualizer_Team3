/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Displayer.js":
/*!**************************!*\
  !*** ./src/Displayer.js ***!
  \**************************/
/***/ (() => {

eval("\r\n// the list of the nodes that were detected on the stream\r\nvar nodeList = {};\r\n\r\nlet file = '../dist/J1939-Sample-Data-CL3000.TXT';\r\nlet lastNodeClicked ='';\r\n\r\nlet fileContents = [\"11T082554602;1;cf00203;cd402800043828ff\",\"11T082554603;1;c00000b;fcffff7dffffffff\",\r\n\"11T082554604;1;cf00400;f4dede3028fff0ff\",\"11T082554604;1;18fee527;be7a0400d8b60e00\",\r\n\"11T082554606;1;cef27fd;20fffae1ff00ffff\", \"11T082554611;1;c000003;ecffffffffffffff\"];\r\n\r\nlet table = document.getElementById('table-body')\r\nvar flag = false;\r\nvar i = 0;\r\nfor(let row of fileContents){\r\n    \r\n    let rowContents = row.split(';');\r\n    let newTableRow = document.createElement('tr');\r\n    newTableRow.innerHTML=`<td> ${rowContents[0]}</td>\r\n                           <td> ${rowContents[1]}</td>\r\n                           <td> ${rowContents[2]}</td>\r\n                           <td> ${rowContents[3]}</td>`;\r\n    table.appendChild(newTableRow);\r\n  if(!(rowContents[2] in nodeList)){nodeList[rowContents[2]] = `node${i}`;i++;}\r\n}\r\n\r\nlet right = document.getElementById('right-column');\r\nfor(let node in nodeList){\r\n  let newNode = document.createElement(\"div\");\r\n  newNode.id = `${nodeList[node]}`;\r\n  newNode.className ='node';\r\n  newNode.innerHTML = `<img id=\"${nodeList[node]}\"class=\"icon\" src=\"../dist/assets/${nodeList[node]}.png\" alt =\"s\"/>${nodeList[node]}`;\r\n  right.append(newNode);\r\n  dragElement(newNode);\r\n\r\n}\r\n\r\nconst addNodeForm = document.getElementById('modal-add');\r\naddNodeForm.addEventListener('submit', async (event) => {\r\n  event.preventDefault();\r\n  const modal = document.getElementById(\"id01\");\r\n  modal.style.display = 'none';\r\n  const name = document.getElementById('nodeName');\r\n  const id = document.getElementById(\"nodeID\");\r\n  let newNode = document.createElement(\"div\");\r\n  \r\n  newNode.id = `node6`;\r\n  newNode.className ='node';\r\n  newNode.innerHTML = `<img id=\"${newNode.id}\"class=\"icon\" src=\"../dist/assets/node1.png\" alt =\"s\"/>test`;\r\n  right.append(newNode);\r\n  dragElement(newNode);\r\n})\r\n\r\n\r\n\r\n\r\n\r\n// function to make the node elements draggable \r\nfunction dragElement(elmnt) {\r\n  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;\r\n    elmnt.onmousedown = dragMouseDown;\r\n\r\n  function dragMouseDown(e) {\r\n    e = e || window.event;\r\n    e.preventDefault();\r\n    console.log(lastNodeClicked)\r\n    if(e.target.className ===\"node\"){\r\n      if(lastNodeClicked !== \"\"){\r\n        let last = document.getElementById(lastNodeClicked);\r\n        last.style.backgroundColor ='rgb(0,0,0,0.0)';\r\n      }\r\n      console.log(elmnt.id);\r\n      lastNodeCliecked = elmnt.id;\r\n      elmnt.style.backgroundColor = 'red';\r\n      elmnt.style.border = '1px solid';\r\n    }\r\n    // get the mouse cursor position at startup:\r\n    pos3 = e.clientX;\r\n    pos4 = e.clientY;\r\n    document.onmouseup = closeDragElement;\r\n    // call a function whenever the cursor moves:\r\n    document.onmousemove = elementDrag;\r\n  }\r\n\r\n  function elementDrag(e) {\r\n    e = e || window.event;\r\n    e.preventDefault();\r\n    // calculate the new cursor position:\r\n    pos1 = pos3 - e.clientX;\r\n    pos2 = pos4 - e.clientY;\r\n    pos3 = e.clientX;\r\n    pos4 = e.clientY;\r\n    // set the element's new position:\r\n    elmnt.style.top = (elmnt.offsetTop - pos2) + \"px\";\r\n    elmnt.style.left = (elmnt.offsetLeft - pos1) + \"px\";\r\n  }\r\n\r\n  function closeDragElement() {\r\n    /* stop moving when mouse button is released:*/\r\n    document.onmouseup = null;\r\n    document.onmousemove = null;\r\n  }\r\n}\r\n\r\n/*right.addEventListener('click', async (event) => {\r\n  event.preventDefault();\r\n\r\n})*/\n\n//# sourceURL=webpack://newprojecthtml/./src/Displayer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/Displayer.js"]();
/******/ 	
/******/ })()
;