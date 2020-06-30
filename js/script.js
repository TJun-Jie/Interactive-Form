

//Global Variables
const form = document.querySelector('form');

// select payment and store it in a variable payment
const payment = document.querySelector('#payment');

//Setting autofocus for name
const name = document.querySelector('#name');
name.focus();

const email  = document.querySelector('#mail');
const zip = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
const cardNumber = document.querySelector('#cc-num')
const activities =  document.querySelectorAll('.activities input');


//Job Section
function jobSection() {
    // select .title and store it as jobRole
    const jobRole = document.querySelector('#title');
    const textArea = document.querySelector('#other-title')
    //Hiding textArea
    textArea.style.display="none";
    
    
    // add event listener "change" to jobRole 
    jobRole.addEventListener('change' ,  (e) => {
        if(e.target.value === "other") {
            // when jobrole value is "other", on the display.
            textArea.style.display="block"
            // when jobrole value is not other, hide the display
        } else {
            textArea.style.display = "none";
        }   
    })
}

function shirtSection() {
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
            colorLabel.textContent = "Please select a theme";
        }
    }
     
    // add change event listener to design option 
    // once theme is selected, change the color options to show those that corresponds to the theme
    shirtDiv.addEventListener('change', (e) => {
        if(e.target.id === "design"){
            //If a theme is selected
            if (designSelect.value) {
                onHideDesign(designSelect.value);
            }
            //If no theme is selected
            else {
                onHideDesign(designSelect.value);
            }
                   
          
        }
    })
    
    
    
    
    function onHideDesign(designSelectValue) {
        // loop through all the designs 
        for (let i = 0 ; i< colorOptions.length ; i++) {
            //set all the colorOptions to be hidden
            colorOptions[i].style.display = "none";
    
            //If the selected option is select theme, ask them to select theme first
            if (designSelectValue === "Select Theme") {
                colorOptions[i].disabled = true;
                colorLabel.textContent = "Please select a theme";
            }
    
            // If the selected option is heart js, show the color for it
            else if (designSelectValue === "heart js") {
                if(colorOptions[i].textContent.endsWith('JS shirt only)')) { 
                    colorOptions[i].style.display = 'block';
                    colorLabel.textContent = "Color:";
                    colorOptions[i].disabled = false;
                }     
                
            // If selected option is js puns , show the color for it 
            } else if (designSelectValue === "js puns") {
                if(colorOptions[i].textContent.includes('JS Puns')) {
                    colorOptions[i].style.display = 'block';
                    colorLabel.textContent = "Color:";
                    colorOptions[i].disabled = false;
                }
            }
        }
    }

}


function activitiesSection() {
    // hide the html
    const printCost = document.querySelector('#totalCost span');
    const costTitle = printCost.parentElement;
    costTitle.style.display = "none";
    
    // select activities and store it as activities
    const activitiesDiv = document.querySelector('.activities');
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

}

function paymentSection() {


    // disable select payment method
    const paymentOptions = document.querySelectorAll('#payment option')
    const selectMethod = paymentOptions[0]
    selectMethod.disabled = true;

    //Setting credit card as default
    paymentOptions[1].selected = true;
    const creditCard = document.querySelector('#credit-card');
    const paypal = document.querySelector('#paypal');
    const bitcoin = document.querySelector('#bitcoin')

    //Hide bitcoin and paypal first
    paypal.style.display = "none";
    bitcoin.style.display = "none"


    // add change event listener to payment
    payment.addEventListener('change', () => {
        showPaymentMethods(payment.value);
    })

// when user selects another payment option,
// display that payment options and hide the rest
    function showPaymentMethods(paymentMethod) {
        if (paymentMethod === "credit card"){
            // display credit card div and hide bitcoin and paypal
            paypal.style.display = 'none';
            bitcoin.style.display = 'none';
            creditCard.style.display = 'block';
        }
        else if (paymentMethod === "bitcoin") {
            //Display bitcoin and hide the rest
            creditCard.style.display = 'none'
            paypal.style.display = 'none'
            bitcoin.style.display ="block"
        } else if (paymentMethod === "paypal") {
            //Display paypal and hide the rest
            creditCard.style.display = "none"
            bitcoin.style.display = "none"
            paypal.style.display = "block"
        }
    }
}



function nameValidator() {
    if(name.value.length > 0) {
        return true;
    } else {
        return false;
    }
}

function emailValidator() {
    const validation =/^[\w]+@[a-z]+\.[a-z]+$/i;
    if (validation.test(email.value)) {
        return true;
    }
    else {
        return false;
    }

}

function checkBoxValidator() {
    let count =0;
    for (let i=0 ; i<activities.length; i++){
        if (activities[i].checked) {
            count += 1
        }
    }
    if (count > 0) {
        return true;
    } else {
        return false;
    }
}



function cardNumberValidator() {
    const validation = /^[\d]{13,16}$/;
    if (validation.test(cardNumber.value)){
        return true
    } else {
        return false
    }
}


function zipValidator() {
    const validation = /^[\d]{5}$/;
    if (validation.test(zip.value)){
        return true
    } else {
        return false
    }
}

function cvvValidator() {
    const validation = /^[\d]{3}$/;
    if (validation.test(cvv.value)){
        return true
    } else {
        return false
    }
}




form.addEventListener('submit', (e) => {
    if(!nameValidator()){
        console.log('Please input name');
        name.className = "invalid"
        e.preventDefault();
    }
    if (!emailValidator()) {
        console.log('please input email');
        email.className ="invalid"
        e.preventDefault();
    }
    if (!checkBoxValidator()){
        console.log('please select an activity')
        e.preventDefault();
    };

    // Only check credit card validation if payment is credit card
    if (payment.value === "credit card") {
        if (!cardNumberValidator()){
            console.log('please enter a credit card number')
            cardNumber.className = "invalid"
            e.preventDefault();
        };
    
        if (!zipValidator()){
            console.log('please enter a zip')
            zip.className = "invalid"
            e.preventDefault();
        };
        if (!cvvValidator()){
            console.log('please enter a cvv')
            cvv.className = "invalid"
            e.preventDefault();
        };

    }




})






function initialize() {
    jobSection();
    shirtSection();
    activitiesSection();
    paymentSection();
}

initialize();