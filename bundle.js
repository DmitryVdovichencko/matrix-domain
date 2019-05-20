
const createTable = (rowNum,colNum,parentNode)=>{
  let table=document.createElement('table');
  table.classList.add('matrix__content');
  parentNode.appendChild(table);
  console.log(rowNum, colNum);


  for (let i = 0; i <=(rowNum-1); i++) {
    const tr = table.insertRow(0);

  }

  for (let j = 0; j <=(colNum-1); j++) {
    for (let i = 0; i <=(rowNum-1); i++) {
        const td = table.rows[i].insertCell(0);
        td.classList.add('matrix__cell');
    }
  }
}
const removeTable = (parentNode) =>{
  parentNode.removeChild();
}

const matrix = document.querySelector('#matrix'),
createButton = document.querySelector('#createButton'),
rowNum = document.querySelector('#rows').value,
colNum = document.querySelector('#columns').value;



