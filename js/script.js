
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


// hide the html
const printCost = document.querySelector('#totalCost span');
const costTitle = printCost.parentElement;
costTitle.style.display = "none";

// select activities and store it as activities
const activitiesDiv = document.querySelector('.activities');
const activities =  document.querySelectorAll('.activities input');
// create a timingtaken array
const takenTiming = [];
let totalCost = 0;

// add change or click event listener to activities 
activitiesDiv.addEventListener('change', (e) => {
    // whenever the option is clicked 
    if (e.target.tagName==="INPUT"){
        const cost = e.target.getAttribute('data-cost');
        const timing = e.target.getAttribute('data-day-and-time');
        
        // Checking it
        if(e.target.checked) {
            //add cost of activity to totalcost
            //display it
            totalCost += parseInt(cost);
            printCost.textContent = totalCost;
            costTitle.style.display = 'block';

            //Add timing to takenTiming array
            if (timing) {
                takenTiming.push(timing);
            }
            //check if their timings is inside the timingtaken array
            // if inside, then disable that checkbox of that activty

            disablingTimeSlots(e);
        

        }
        // Unchecking it 
        else {
            // Remove cost from total cost and update it
            totalCost -= parseInt(cost)
            printCost.textContent = totalCost;

            //Remove timing from takenTiming array
            const index =takenTiming.indexOf(timing);
            takenTiming.splice(index, 1);

            disablingTimeSlots(e);

            


        }
    }
    
})      


function disablingTimeSlots(e) {
    for (let i =0 ; i < activities.length ; i++) {
        // Timing taken and is not the element that was clicked 
        if(takenTiming.includes(activities[i].dataset.dayAndTime) && (e.target !== activities[i])){
            // Only disable those that are not checked
            if(!activities[i].checked){
                activities[i].disabled = true;
            }
        } else {
            //Resets the checkbox when the same timings chekcbox are unchecked 
            activities[i].disabled = false;
        }
    } 
}
// select payment and store it in a variable payment
// disable select payment method
// set default option to be credit card 
// display credit card div and hide bitcoin and paypal

// add change event listener to payment
// when user selects another payment option,
// display that payment options and hide the rest
