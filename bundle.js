
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



const checkDuplicatesArr = (arr,i) => {
 

    

}


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
