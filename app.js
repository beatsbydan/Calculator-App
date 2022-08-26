//Screen Functionalities
//Switching themes buttons
//getting the numbers in an array
const numbers = document.querySelector('.numbers')
const themeArray = Array.from(numbers.children)

//getting the buttons
const themeNav = document.querySelector('.theme__navigator')
const themeNavArray = Array.from(themeNav.children)

//function to switch the buttons
const switchButton = (currentBtn ,newBtn) => {
    currentBtn.classList.remove('current__theme')
    newBtn.classList.add('current__theme')
}

//Adding event listeners to the array elements
themeArray[0].addEventListener('click', () => {
    const presentBtn = themeNav.querySelector('.current__theme')
    const nextBtn = themeNavArray[0];
    switchButton(presentBtn, nextBtn );
    //changing to theme 1
    document.body.classList.remove('theme__2')
    document.body.classList.remove('theme__3')
})
themeArray[1].addEventListener('click', () => {
    const presentBtn = themeNav.querySelector('.current__theme')
    const nextBtn = themeNavArray[1];
    switchButton(presentBtn,  nextBtn);
    //changing to theme 2
    document.body.classList.add('theme__2')
    document.body.classList.remove('theme__3')
})
themeArray[2].addEventListener('click', () => {
    const presentBtn = themeNav.querySelector('.current__theme')
    const nextBtn = themeNavArray[2];
    switchButton(presentBtn,  nextBtn);
    //changing to theme 3
    document.body.classList.add('theme__3')
    document.body.classList.remove('theme__2')
})



//Calculator App
//class that contains the various operators for the calculator
class Calculator{
    //creating a constructor for the output screen 
    constructor(previewScreen, resultScreen){
        this.previewScreen = previewScreen
        this.resultScreen = resultScreen
        //to clear and restore calculator to default
        this.clear()
    }
    //function to clear entire screen
    clear(){
        //previous operand becomes null
        this.prevOperand = ''
        //current operand becomes null
        this.currentOperand = 0;
        //operation becomes undefined / empty
        this.operation = undefined
    }
    //function to erase digit(s)
    erase(){
        //converting the current operand to a string and looping through to delete the string value at the very end of the string set. Basically, this stores the entire string minus the last string value.
        this.currentOperand = this.currentOperand.toString()./*cuts off the position not selected*/slice(0/*beginning of the string value*/, /*second to the last string value*/ -1)
        if(this.currentOperand === ""){
            this.currentOperand = 0;
        }
    }
    //function to append a number to the screen
    appendNumber(number){
        //statement to only permit the use of one period
        if(number == '.' && this.currentOperand.includes('.')){
            //stops the function
            return;
        }
        //enables us type in multiple numbers as strings by converting them to the string
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    //function to select operator
    selectOperation(operation){
        //check to prevent operator from clearing screen upon click
        if(this.currentOperand === ""){
            //stopping the function
            return
        }
        //check to evaluate preview screen. This would compute the current operation passed to the preview screen.
        if(this.prevOperand !==''){
            //computing the operation
            this.execute();
        }
        //setting operation
        this.operation = operation
        //equating both operands to indecate that we're done with the first set of digits to be operated on
        this.prevOperand = this.currentOperand;
        //clearing the current Operand / result screen when an operator is added
        this.currentOperand = ''
    }
    //function to execute command
    execute(){
        let computation
        //converting the string to a number
        const previous = parseFloat(this.prevOperand)
        //converting the string to a number
        const current = parseFloat(this.currentOperand)
        //condition to stop the function when there are no numbers in the input
        if(isNaN(previous) || isNaN(current)){
            //stops the operation
            return
        }
        //stating different operations
        switch(this.operation){
            //addition
            case '+':
                computation = previous + current;
            break;
            //subtraction
            case '-':
                computation = previous - current;
            break;
            //multiplication
            case 'x':
                computation = previous * current;
            break;
            //division
            case '/':
                computation = previous / current;
            break;

            default:
                //if no operators match, close.
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.prevOperand = ''
    }
    //function to get and display numbers in proper format
    getNumberOnDisplay(number){
        //getting the entire string number
        const stringNum = number.toString()
        /*splitting the string into two arrays
        first array: before the dot*/
        const intDigit = parseFloat(stringNum.split('.')[0])
        //second array: after the dot
        const decDigit = stringNum.split('.')[1]
        //creating a display for integers
        let intDisplay
        //condition to check if there are no integers
        if(isNaN(intDigit)){
            //display an empty section
            intDisplay = ""
        }
        //if integers are present, display
        else {
            intDisplay = intDigit.toLocaleString('en', {maximumFractionDigits: 0})
        }
        //checking the prescence of decimal digits i.e after the dot
        if(decDigit != null){
            //returning the full string
            return `${intDigit}.${decDigit}`
        }
        //if there are no decimal digits
        else{
            //returns the integers
            return intDisplay
        }
    }

    //function to update screen display
    updateDisplay(){
        //setting the content from the current operand to the result screen
        this.resultScreen.innerHTML = this.getNumberOnDisplay(this.currentOperand)
        //changing to the preview screen
        this.previewScreen.innerHTML =this.prevOperand
        if(this.operation != null){
            //changing to the preview screen as well as including the operand right beside the preious operand
            this.previewScreen.innerHTML =
                //concatenating
                `${this.getNumberOnDisplay(this.prevOperand)}  ${this.operation}`
        }
    }
}


const digitBtn = document.querySelectorAll('[data-num]')
const operatorBtn = document.querySelectorAll('[data-operator]')
const submitBtn = document.querySelector('[data-submit]')
const clearBtn = document.querySelector('[data-clear]')
const eraseBtn = document.querySelector('[data-erase]')
const previewScreen = document.querySelector('[data-result__preview]')
const resultScreen = document.querySelector('[data-current--result__output]')

resultScreen.innerHTML = 0;
//referring/defining to the class
const calculator = new Calculator(previewScreen, resultScreen)

//adding an event listener to print the digits on the screen
digitBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        //appending the button's number to the screen
        calculator.appendNumber(btn.innerHTML)
        //updating the display on the screen to that of the button
        calculator.updateDisplay()
    })
})

//adding event listener to select operator
operatorBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        //selecting operation
        calculator.selectOperation(btn.innerHTML)
        //updating the display on the screen 
        calculator.updateDisplay()
    })
})

//adding event listener to display final result
submitBtn.addEventListener('click', () => {
    //computes the operation
    calculator.execute()
    //updating the display on the screen 
    calculator.updateDisplay()
})

//adding event listener to clear entire screen
clearBtn.addEventListener('click', ()=> {
    //clears the entire screen
    calculator.clear()
    //updates the display on the screen.
    calculator.updateDisplay()
})

//adding event listener to erase a digit or multiple digit
eraseBtn.addEventListener('click', () => {
    //erases current digit
    calculator.erase()
    //updates the display on the screen
    calculator.updateDisplay()
})