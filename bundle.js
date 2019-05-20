
const createTable = (rowNum,colNum,parentNode)=>{
  let table=document.createElement('table');
  table.classList.add('matrix__content');
  parentNode.appendChild(table);
  


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
  parentNode.removeChild(parentNode.children[0]);
}

const matrix = document.querySelector('#matrix'),
createButton = document.querySelector('#createButton'),
rowEl = document.querySelector('#rows'),
colEl = document.querySelector('#columns');
let rowNum = document.querySelector('#rows').value,
colNum = document.querySelector('#columns').value;

const checkInput = (inputElement, highLim, lowLim) => {
  const result = (inputElement.value <= highLim && inputElement.value >= lowLim) ?  inputElement.value : false;
  return result;
}
rowEl.addEventListener('change', function(){rowNum = rowEl.value; });
colEl.addEventListener('change', function(){colNum = colEl.value; })
createButton.addEventListener('click', function(){ 
  if (matrix.children.length > 0) {removeTable(matrix);} 
  createTable(rowNum, colNum, matrix);
})

