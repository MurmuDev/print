let pos = []
let id = []
let time = 0
let cellsize = 0

const animate = (id,initial,final) => {
  id = id.toString()
  document.getElementById(id).animate([
        // keyframes
        { transform: 'translateX('+initial.toString()+'px)' },
        { transform: 'translateX('+final.toString()+'px)' }
      ], {
        // timing options
        fill: 'forwards',
        duration: 1000,
        iterations: 1
      })
}

// x goes to right y goes to left
const swapAnimate = (x,y,cellsize,margin) => {
  return new Promise(async (resolve,reject) => {
    try{
      //get corresponding id
      let xid = id[x]
      let yid = id[y]

      const dist = (cellsize+margin)*Math.abs(x-y) //calculate distance
      let xpos = pos[xid]
      let ypos = pos[yid]
      animate(xid,xpos,xpos+dist)
      animate(yid,ypos,ypos-dist)

      //update positions
      pos[xid] = xpos+dist
      pos[yid] = ypos-dist

      //swap indices
      let temp = id[x]
      id[x] = id[y]
      id[y] = temp
      resolve()
    }catch(e){
      reject(e)
    }
  }) 
}

// sets the size of all the array elements
const setSize = (size, margin) => {
  var cols = document.getElementById('output').getElementsByTagName('span')
  let gap = size+margin
  for(i = 0; i < cols.length; i++) {
    cols[i].setAttribute("style","width:"+size.toString()+"px")
    pos.push(0)
    id.push(i)
  }
}

// returns the number of digits
function getlength(number) {
  return number.toString().length
}

const swapper = (step,x,y) => {
  if(x<y){
    setTimeout(swapAnimate,time,x,y,cellsize,40)
  }
  else{
    setTimeout(swapAnimate,time,y,x,cellsize,40)
  }
  time = time + step
}

const swapcaller = (x,y) => {
  const step = 1500
  swapper(step,x,y)
}

const selectionSort = (inputArr,callback) => { 
    let n = inputArr.length;
        
    for(let i = 0; i < n; i++) {
        // Finding the smallest number in the subarray
        let min = i;
        for(let j = i+1; j < n; j++){
            if(inputArr[j] < inputArr[min]) {
                min=j; 
            }
         }
         if (min != i) {
             // Swapping the elements
             let tmp = inputArr[i]; 
             inputArr[i] = inputArr[min];
             inputArr[min] = tmp;      
             swapcaller(i,min)
             console.log(i,min)
        }
    }
    callback(inputArr)
}

const quickSort = (inputArr,callback) => {
    let swappedIndices = [] 
    const partition = (arr, start, end) => {
      // Taking the last element as the pivot
      const pivotValue = arr[end]
      let pivotIndex = start 
      for (let i = start; i < end; i++) {
          if (arr[i] < pivotValue) {

          // Swapping elements
          let temp = arr[pivotIndex]
          arr[pivotIndex] = arr[i]
          arr[i] = temp
          
          swappedIndices.push([i,pivotIndex])
          // Moving to next element
          pivotIndex++
          }
    }
    
        // Putting the pivot value in the middle
        swappedIndices.push([pivotIndex,end])
        
        // Swapping elements
        let temp = arr[pivotIndex]
        arr[pivotIndex] = arr[end]
        arr[end] = temp

      return pivotIndex;
    }

  const quick = (arr) => {
    // Creating an array that we'll use as a stack, using the push() and pop() functions
    stack = [];
    
    // Adding the entire initial array as an "unsorted subarray"
    stack.push(0);
    stack.push(arr.length - 1);
    
    // There isn't an explicit peek() function
    // The loop repeats as long as we have unsorted subarrays
    while(stack[stack.length - 1] >= 0){
        
        // Extracting the top unsorted subarray
    	end = stack.pop();
        start = stack.pop();
        
        pivotIndex = partition(arr, start, end);
        
        // If there are unsorted elements to the "left" of the pivot,
        // we add that subarray to the stack so we can sort it later
        if (pivotIndex - 1 > start){
        	stack.push(start);
            stack.push(pivotIndex - 1);
		}
        
        // If there are unsorted elements to the "right" of the pivot,
        // we add that subarray to the stack so we can sort it later
        if (pivotIndex + 1 < end){
        	stack.push(pivotIndex + 1);
            stack.push(end);
        }
    }
    return arr
}
  const sorted = quick(inputArr,0,inputArr.length)
  
  callback(swappedIndices)
} 


const addCellsGetSize = (list) => {
  let currdiv = document.createElement('div') // creating div container of array
  let maxno = Number.NEGATIVE_INFINITY    // store max number to calculate the size of all elements
  // create span elements for all array items
  for ( i = 0; i < list.length; i++ ) {
    let sp = document.createElement('span')
    sp.innerHTML = list[i]
    sp.setAttribute("id",i.toString())
    // keeping track of maximum number
    if(list[i] > maxno)
      maxno = list[i]
    currdiv.appendChild(sp)
  }

  const no_digits = getlength(maxno)
  // append the new div inside the output div
  let output = document.getElementById('output')
  output.appendChild(currdiv)
  return new Promise((resolve)=>resolve(no_digits))
}



const parse = (str) => {
  return new Promise((resolve,reject) => {
    try{
      var list = str.split(',') // convert the string input into array
      // loop and convert all words into numbers
      var i;
      for ( i = 0; i < list.length; i++ ) {
        list[i] = parseInt(list[i])
      }
      if(i == list.length){
        resolve(list)
      }
    }catch(e){
      reject(e)
    }
  })
}

const clearCells = () => {
  return new Promise((resolve, reject) => {
    const myNode = document.getElementById('output');
    while (myNode.firstChild) {
      myNode.removeChild(myNode.lastChild);
    }
    resolve()
  })
  
}

const main = async (str,callback) => {
  const list = await parse(str)
  await clearCells()
  const maxdigits = await addCellsGetSize(list)
  cellsize = maxdigits*10
  setSize(maxdigits*10,40)
  //sort(list,(sorted)=>console.log(sorted))
  //console.log('hello')
  //test(maxdigits)
  callback(list)
}

// on click selection sort
document.getElementById('selection_sort').onclick = function() {
    console.log('script loaded')
    let input = document.getElementById('ar').value // input from form
  main(input,(arr) =>{
    selectionSort(arr,(arr)=> console.log(arr))
  }) // parse and display
    return false
}

// on click quick sort
document.getElementById('quick_sort').onclick = function() {
    console.log('script loaded')
    let input = document.getElementById('ar').value // input from form
  main(input,(arr)=>{
    quickSort(arr,(swappedIndices)=>{
      for(indices of swappedIndices){
        //console.log(indices[0],indices[1])
        if(indices[0] == indices[1])
          continue
        swapcaller(indices[0],indices[1])
      }
    })
  })
    return false
}

// clearing
document.getElementById('clear').onclick = function() {
    document.getElementById('ar').value = ''
    return false
}
