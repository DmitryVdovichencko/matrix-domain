
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
        td.innerHTML=0;
    }
  }

}
const removeTable = (parentNode) =>{
  parentNode.removeChild(parentNode.children[0]);
}

const matrix = document.querySelector('#matrix'),
createButton = document.querySelector('#createButton'),
manualButton = document.querySelector('#manualButton'),
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

const enableManual=()=> {
  let manualMode = false;
  if (matrix.children.length > 0) {
    manualButton.classList.toggle('active');
    if (manualButton.classList.contains('active')) {
      manualMode = true;
      fillTable(document.querySelector('.matrix__content'));
    }
    else{
      manualMode = false;
    } 
      
  }
  console.log(`Manual is ${manualMode}`);
  return manualMode; 
}

const fillTable = (tableElement) => {
  if(tableElement){
    
     tableElement.addEventListener('click', function(event){
      console.log(event.target);
      event.target.classList.toggle('active')
      if (event.target.classList.contains('active')) {
      event.target.innerHTML = 1;
    }else{
      event.target.innerHTML = 0;
    }
    getTableArr(tableElement);
  })
  }
 

}
manualButton.addEventListener('click', enableManual)
const getTableArr = (table) => {
  let tableArr = [];
  for (let i = 0, row; row = table.rows[i]; i++) {
   //iterate through rows
   //rows would be accessed using the "row" variable assigned in the for loop
   let rowArr=[];
  
   for (let j = 0, col; col = row.cells[j]; j++) {
    rowArr.push(col.innerHTML);

     //iterate through columns
     //columns would be accessed using the "col" variable assigned in the for loop
   }
   tableArr.push(rowArr);  
}
console.log(tableArr);
}
//matrix logic
//declare matrix as an array
let matrixArr = [
[1,1,0,0,1,0],
[1,0,0,0,0,1],
[1,1,0,0,0,0],
[0,1,0,0,0,1],
[1,1,0,0,1,0],
];



const findPoints=(x,y)=>{
 
   let obj={};
   
    
    obj.x=x;
    obj.y=y;
    return obj;

}

let points=[];
matrixArr.forEach(function(itemY,indexY){
 
  itemY.forEach(


    function(item,indexX){

    if(item===1){
      
      points.push(findPoints(indexX,indexY));
      
    }
 
  }
  );
})




const checkDomain=(arr, value)=>{
  let domains=[],indexes=[];
    arr.forEach(function(item,i,arr){
      for (let j = 0; j < arr.length; j++) {
        if (  ( (item.x - arr[j].x === value)&&(item.y===arr[j].y) )||
          ( (item.y - arr[j].y === value)&&(item.x===arr[j].x) ) ) 
        {
          let domainArr=[];
        
          domainArr.push(item,arr[j]);
          domains.push(domainArr); 
        }



      }
     
    })
    domains.forEach(function(item,i,arr){
      console.log(item.length);
    });
    
 
  const deepCompare=(arr)=>{
    for (let i= 0; i < arr.length-1; i++) {
      if (i+1<=arr.length){
        if(compare(arr[i],arr[i+1])){
          arr[i] = [...new Set([...arr[i] ,...arr[i+1]])];
          arr.splice((i+1),1);
          return deepCompare(arr);
        }
        else {
          return arr;
        }      
      }
   }
   
  }


   deepCompare(domains);
   console.log("Points arr");
   console.log(arr);

   domains.forEach(function(item){
    item.forEach(function(point){
      points.splice(points.indexOf(point),1);
    })
   })
   points = points.map(function(point) {
    let item = [];
    item.push(point);
    return item;
  });
   domains=[...domains,...points] ;

   console.log("Domains arr");
   console.log(domains);

}




checkDomain(points,1);


function compare(arr1,arr2){
  return arr2.some(item=>
    arr1.some(elem=>elem===item)
    )
  
  
}

console.log(`compare result is ${compare([1,2,3],[3,5,0])}`);
// true

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
const randomProb = (prob,result1,result2)=> {
  const chances = (1-prob)*100;
  for (let i = 0; i < chances; i++) {
    if (i===getRndInteger(0,chances)||i===getRndInteger(0,chances)){
      return result1;
    }
    else{
      return result2;
    }
  }
}
for (var i = 0; i < 100; i++) {
  if(randomProb(0.01,1,0)===1){
    console.log(1)
  }
  
}
