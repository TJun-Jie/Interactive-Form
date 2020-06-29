
// select form and store it as form
const form = document.querySelector('form');

// select .title and store it as jobRole
const jobRole = document.querySelector('#title');
const textArea = document.querySelector('#other-title')
//Hiding textArea
textArea.style.display="none";

//Insert textarea beside jobrole
jobRole.insertAdjacentElement('afterend',textArea);

// add event listener "change" to jobRole 
jobRole.addEventListener('change' ,  (e) => {
    if(e.target.value === "other") {
        // when jobrole value is "other", on the display.
        textArea.style.display="block"
    }

})


// Selecting shirt div
const shirtDiv = document.querySelector('.shirt-box');
const designSelect = document.querySelector('#design');

// select coloroption and store it as coloroption
const color =  document.querySelector('#color');
const colorOptions = color.children;
const colorLabel = document.querySelector('#colors-js-puns label');
// Hide and disable all other color options and add  Please select a theme first
for (let i = 0 ; i< colorOptions.length ; i++) {
    if (designSelect.value == "Select Theme") {
        colorOptions[i].disabled = true;
        colorOptions[i].style.display = "none";
        colorLabel.textContent = "Please select an element";
    }
}
 
// add change event listener to design option 
// once theme is selected, change the color options to show those that corresponds to the theme
shirtDiv.addEventListener('change', (e) => {
    if(e.target.id === "design"){
        if(designSelect.value === 'js puns') {
            for (let i = 0 ; i< colorOptions.length ; i++) {
                colorOptions[i].style.display = "none";
                if(colorOptions[i].textContent.includes('JS Puns')) {
                    colorOptions[i].style.display = 'block';
                    colorOptions[i].disabled = false;
                }
            }
        } 
        else if(designSelect.value === 'heart js') {
            for (let i = 0 ; i< colorOptions.length ; i++) {
                colorOptions[i].style.display = "none";
                if(colorOptions[i].textContent.endsWith('JS shirt only)')) { 
                    colorOptions[i].style.display = 'block';
                    colorOptions[i].disabled = false;
                }
            }
        } 
        else {
            for (let i = 0 ; i< colorOptions.length ; i++) {
                if (designSelect.value == "Select Theme") {
                    colorOptions[i].disabled = true;
                    colorOptions[i].style.display = "none";
                    colorLabel.textContent = "Please select an element";
                }
            }
        }
               
      
    }
})


// create html for total cost of activites 
// hide the html
// select activities and store it as activities
// create a timingtaken array
// add change or click event listener to activities 
// whenever the option is clicked 
// check if it is checked or unchecked 
// if checked
//     see if html is hidden or not
//     if hidden
//         unhide it.
//         store totalcost variable
//         add cost of activity to totalcost
//         display it
//     else
//         add cost of activity to total cost
//         display it
//     add the timing of that option to the timingtaken array
//     loop through all activities
//         check if their timings is inside the timingtaken array
//             if inside, then disable that checkbox of that activty
//             if not inside, add it to the timing taken array

            

// else if not checked
//     remove the timing of that option from the timing taken array
//         loop through all activities
//         check if their timings is inside the timingtaken array
//             if not inside, then enable the checkbox of that activity
    
        

// select payment and store it in a variable payment
// disable select payment method
// set default option to be credit card 
// display credit card div and hide bitcoin and paypal

// add change event listener to payment
// when user selects another payment option,
// display that payment options and hide the rest
