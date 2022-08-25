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