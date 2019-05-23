//Functions for our app
// creating table function
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

//remove table function
const removeTable = (parentNode) =>{
  parentNode.removeChild(parentNode.children[0]);
}

// filling table in manual mode function
const fillTable = (tableElement) => {
  if(tableElement){
    
     tableElement.addEventListener('click', function(event){
      
      event.target.classList.toggle('active')
      if (event.target.classList.contains('active')) {
      event.target.innerHTML = 1;
    }else{
      event.target.innerHTML = 0;
    }
    
  })
  }
 

}

//get table data function
const getTableArr = (table) => {
	
  let tableArr = []
  for (let i = 0, row; row = table.rows[i]; i++) {
   //iterate through rows
   //rows would be accessed using the "row" variable assigned in the for loop
     let rowArr=[];
   for (let j = 0, col; col = row.cells[j]; j++) {
    rowArr.push(+col.innerHTML);

     //iterate through columns
     //columns would be accessed using the "col" variable assigned in the for loop
   }
   tableArr.push(rowArr);
}
     

return tableArr;
}

// get object for points 
const findPoints=(x,y)=>{
 
   let obj={};
   
    
    obj.x=x;
    obj.y=y;
    return obj;

}
// function to get points with 1 from array

const getPoints = (arr)=>{
let points=[];
arr.forEach(function(itemY,indexY){
	
  itemY.forEach(function(item,indexX){

    if(item===1){
      
      points.push(findPoints(indexX,indexY));
      
    }
 
  }
  );
})
	
  return points;
}

//compare arr function
const compare= (arr1,arr2)=>{
  return arr2.some(item=>
    arr1.some(elem=>elem===item)
    )
  
  
}
//function for deep compare nested arr
  const deepCompare=(arr)=>{
    for (let i = 0; i < arr.length-1; i++) {
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

// check domain for points with 1
const checkDomain=(arr, value)=>{
  let domains=[];
    arr.forEach(function(item,i,arr){
      for (let j = 0; j < arr.length; j++) {
        if (  ( (Math.abs(item.x - arr[j].x) === value)&&(item.y===arr[j].y) )||
          ( (Math.abs(item.y - arr[j].y) === value)&&(item.x===arr[j].x) ) ) 
        {
          let domainArr=[];
        
          domainArr.push(item,arr[j]);
          domains.push(domainArr); 
        }



      }
     
    })
  
    



   deepCompare(domains);


   domains.forEach(function(item){
    item.forEach(function(point){
      arr.splice(arr.indexOf(point),1);
    })
   })
  let pointsDomain = arr.map(function(point) {
    let item = [];
    item.push(point);
    return item;
  });
   domains=[...domains,...pointsDomain] ;

   
   return domains;
}

//Finally function to find domains
const findDomain=(table)=>{
	return checkDomain(getPoints(getTableArr(table)), 1);
}
// function for domain cells background
const visualDomain = (table, domains)=>{

	for (let i = 0, row; row = table.rows[i]; i++) {
   
  
   for (let j = 0, col; col = row.cells[j]; j++) {
	  if(col.style){
	  	col.removeAttribute("style");
	  }

     //iterate through columns
     //columns would be accessed using the "col" variable assigned in the for loop
   }
    
}

    domains.forEach(function(domain){
    	let r=getRndInteger(0,255), b=getRndInteger(0,255), g=getRndInteger(0,255);
        domain.forEach(function(point){
         	
           table.rows[point.y].cells[point.x].style.background=`rgb(${r},${g},${b})`;
          table.rows[point.y].cells[point.x].style.color="white";
        })
     
    })
}
const queueArr=(arr, length, ...results)=>{
	
	arr.push(results);
	if(arr.length>length){
		
		arr.shift();
	}

		
	
	
	return arr;
}


const outputResult = (autoMode, outputEl, domainTable,inputTable, domainsArr,prob,resultsArr)=>{
	outputEl.innerHTML=domainsArr.length;
	visualDomain(inputTable,domainsArr);
	if (autoMode){
		let sizeInputTable = inputTable.rows.length*inputTable.rows[0].cells.length,
		resTableArr = queueArr(resultsArr,10, prob, domainsArr.length,sizeInputTable);
		for (let i = 0; i < resTableArr.length; i++) {
			resTableArr[i].forEach(function(item,index){
				domainTable.rows[i+1].cells[index].innerHTML=item;
			})
			
		
			
		}

	}
	
}


//Auto mode



//function for get random integer
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
//function to get random int with certain probability
const randomProb = (prob,result1,result2)=> {
  const chances = 2/prob;
  for (let i = 0; i < chances; i++) {
    if (i===getRndInteger(0,chances)||i===getRndInteger(0,chances)){
      return result1;
    }
    else{
      return result2;
    }
  }
}
//function to clear table content
const clearTable = (table) => {
  
  for (let i = 0, row; row = table.rows[i]; i++) {
   //iterate through rows
   //rows would be accessed using the "row" variable assigned in the for loop
   
  
   for (let j = 0, col; col = row.cells[j]; j++) {
    col.innerHTML=0;
      if(col.style){
	  	col.removeAttribute("style");
	  }
    if (col.classList.contains('active')){
      col.classList.remove('active');
    }

     //iterate through columns
     //columns would be accessed using the "col" variable assigned in the for loop
   }
    
}
}
//function to auto filling table
const autoFillTable = (table,prob) => {
  clearTable(table);
  
  for (let i = 0, row; row = table.rows[i]; i++) {
   //iterate through rows
   //rows would be accessed using the "row" variable assigned in the for loop
   
  
   for (let j = 0, col; col = row.cells[j]; j++) {
    col.innerHTML=randomProb(prob,1,0);
       //iterate through columns
     //columns would be accessed using the "col" variable assigned in the for loop
   }
    
}
}



//Control elements

//get control elements
const matrix = document.querySelector('#matrix'),
createButton = document.querySelector('#createButton'),
manualButton = document.querySelector('#manualButton'),
autoButton = document.querySelector('#autoButton'),
checkButton = document.querySelector('#checkButton'),
outputEl = document.querySelector('#output'),
domainTable = document.querySelector('#domainTable'),
probEl = document.querySelector('#prob'),
rowEl = document.querySelector('#rows'),
colEl = document.querySelector('#columns');
let rowNum = document.querySelector('#rows').value,
colNum = document.querySelector('#columns').value,
autoMode,
prob = probEl.value;

//validation


	


const control = () =>{
	let domainTableArr=[];
//add event listeners for changing table and create table
	rowEl.addEventListener('change', function(){rowNum = rowEl.value;});
	colEl.addEventListener('change', function(){colNum = colEl.value; });
	probEl.addEventListener('change', function(){prob = probEl.value; });
	//validation
	createButton.addEventListener('click', function(){ 
		
			if (matrix.children.length > 0) {removeTable(matrix);} 
			  createTable(rowNum, colNum, matrix);
			  const inputTable = document.querySelector('.matrix__content');
			  manualButton.addEventListener('click', function(){

	  	autoMode = false;
	  	fillTable(inputTable);
	  	// checkButton.addEventListener('click', function(){outputResult(autoMode, outputEl, domainTable,inputTable, findDomain(inputTable))});
		  });
		  autoButton.addEventListener('click', function(){
		  	autoMode = true;
		  	autoFillTable(inputTable,prob);
		  	
		  });
		  checkButton.addEventListener('click', function(){outputResult(autoMode, outputEl, domainTable,inputTable, findDomain(inputTable),prob,domainTableArr)});
		
	
	})

}
control();