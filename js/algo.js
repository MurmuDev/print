function animate(id,x){
  //animation
  document.getElementById(id).animate([
  // keyframes
  { transform: 'translateX(0px)' },
  { transform: 'translateX('+x+'px)' }
], {
  // timing options
  fill: 'forwards',
  duration: 1000,
  iterations: 1
});
}

// x goes to right y goes to left
function swapAnimate(x,y,cellsize){
  let margin = 40
  let distance = Math.abs(x-y)*(cellsize+margin)
  // animation of swap of x and y
  animate(x,distance)
  animate(y,-distance)
}

// sets the size of all the array elements
function setSize(size){
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


function swapper(no_digits){
  setTimeout(swapAnimate,1000,['0','3',no_digits*10])
  setTimeout(swapAnimate,1000,['1','2',no_digits*10])
}

function display(list,callback){
  let currdiv = document.createElement('div') // creating div container of array
  let maxno = Number.NEGATIVE_INFINITY    // store max number to calculate the size of all elements

  // create span elements for all array items
  for ( i = 0; i < list.length; i++ ) {
    let sp = document.createElement('span')
    sp.innerHTML = list[i]
    sp.id = i
    // keeping track of maximum number
    if(list[i] > maxno)
      maxno = list[i]

    currdiv.appendChild(sp)
  }

  // append the new div inside the output div
  let output = document.getElementById('output')
  output.appendChild(currdiv)

  let no_digits = getlength(maxno)
  setSize(no_digits*10) // set the size after creating the elements
  swapper(no_digits)
}



function parse(str){
  var list = str.split(',') // convert the string input into array

  // loop and convert all words into numbers
  var i;
  for ( i = 0; i < list.length; i++ ) {
    list[i] = parseInt(list[i])
  }

  display(list) // display the elements
}

// on click
document.getElementById('form').onsubmit = function() {
    let input = document.getElementById('ar').value // input from form
    parse(input)  // parse and display
    return false
}
