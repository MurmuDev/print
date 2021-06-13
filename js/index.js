const messages = () => console.log('hello')

const animate = (id,x) => {
  document.getElementById(id).addEventListener('animationend',messages,true)
  document.getElementById(id).animate([
        // keyframes
        { transform: 'translateX('+0+'px)' },
        { transform: 'translateX('+x+'px)' }
      ], {
        // timing options
        fill: 'forwards',
        duration: 1000,
        iterations: 1
      })
}

const printIndexandValue = (x) => {
  console.log(x,document.getElementById(x).innerHTML) 
}

// x goes to right y goes to left
const swap = (x,y,cellsize) => {
  printIndexandValue(x)
  printIndexandValue(y)
  return new Promise(async (resolve,reject) => {
    try{
      let margin = 40 // as in stylesheet
      let distance = Math.abs(x-y)*(cellsize+margin)
    
      // animation of swap of x and y
      animate(x,distance)
      animate(y,-distance)

      //swap id
      document.getElementById(x).setAttribute("id", '0')
      document.getElementById(y).setAttribute("id", '1')
      resolve()
    }catch(e){
      reject(e)
    }
  }) 
}

// sets the size of all the array elements
const setSize = (size) => {
  var cols = document.getElementById('output').getElementsByTagName('span')
  for(i = 0; i < cols.length; i++) {
    cols[i].setAttribute("style","width:"+size.toString()+"px")
  }
}


function nothing(){

}
// returns the number of digits
function getlength(number) {
  return number.toString().length
}


const test = async (no_digits) => {
  //setTimeout(swapAnimate,0,'2','3',1)
  //setTimeout(swapAnimate,1000,'0','1',1)
  setTimeout(swap,0,0,1,no_digits*10)
  setTimeout(swap,1500,1,0,no_digits*10)
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

const main = async (str) => {
  const list = await parse(str)
  await clearCells()
  const maxdigits = await addCellsGetSize(list)
  setSize(maxdigits*10)
  test(maxdigits)
}

// on click
document.getElementById('form').onsubmit = function() {
    let input = document.getElementById('ar').value // input from form
    main(input)  // parse and display
    return false
}

// clearing
document.getElementById('clear').onclick = function() {
    document.getElementById('ar').value = ''
    return false
}
