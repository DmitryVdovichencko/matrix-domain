
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
//matrix logic
//declare matrix as an array
let matrixArr = [
[1,0,0,0,1,0],
[1,1,0,0,0,1],
[0,0,0,0,0,0],
[0,0,0,0,0,1],
[0,0,0,0,1,0],
];

// let indexArr=matrixArr.map(function(item,i){
//      return item.map(function(item,i){
//      if (item===1){
//        return i;
//      }else{
//       return undefined;
//      } 
     
//     });
//     });
// console.log(indexArr);

const findDomain=(obj,x,y)=>{
 
  
    console.log(`finded index is ${x,y}`);
    
    obj.x=x;
    obj.y=y;
    return obj

}


matrixArr.forEach(function(itemY,indexY){
  let domain = {};
  itemY.forEach(


    function(item,indexX){

    if(item===1){
      
      findDomain(domain,indexX,indexY);
      console.log(domain);
    }
    else{
      
      return domain;
    }
  }
  );
})