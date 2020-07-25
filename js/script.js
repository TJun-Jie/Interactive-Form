

//Global Variables
const form = document.querySelector('form');
const payment = document.querySelector('#payment');
const name = document.querySelector('#name');
const email  = document.querySelector('#mail');
const zip = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
const cardNumber = document.querySelector('#cc-num')
const activities =  document.querySelectorAll('.activities input');
const activitiesDiv = document.querySelector('.activities');

//Setting autofocus on name when page reload 
name.focus();


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

// Shirt section
function shirtSection() {
    // Selecting shirt div
    const shirtDiv = document.querySelector('.shirt-box');
    const designSelect = document.querySelector('#design');
    
    // select coloroption and store it as coloroption
    const color =  document.querySelector('#color');
    const colorOptions = color.children;
    const colorLabel = document.querySelector('#colors-js-puns label');

    //Hiding the select options before design is selected
    color.style.display = "none";
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
            if (designSelect.value !== "Select Theme") {
                //Show the dropdown bar when design is selected 
                color.style.display = "block"
                onHideDesign(designSelect.value);
            }
            //If no theme is selected
            else {
                color.style.display = "none";
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
                    color.selectedIndex = 3;           
                }     
                
            // If selected option is js puns , show the color for it 
            } else if (designSelectValue === "js puns") {
                if(colorOptions[i].textContent.includes('JS Puns')) {
                    colorOptions[i].style.display = 'block';
                    colorLabel.textContent = "Color:";
                    colorOptions[i].disabled = false;
                    color.selectedIndex = 0;
                }
            }
        }
    }

}


function activitiesSection() {
    //Adding total cost html :<p id="totalCost">Total: $<span></span></p>
    const p = document.createElement('p');
    p.id = "totalCost"
    p.innerHTML = "Total: $<span></span>"
    activitiesDiv.appendChild(p);

    // hide the html
    const printCost = document.querySelector('#totalCost span');
    const costTitle = printCost.parentElement;
    costTitle.style.display = "none";
    
    // create a timingtaken array
    const takenTiming = [];
    let totalCost = 0;
    
    // add change or click event listener to activities 
    activitiesDiv.addEventListener('change', (e) => {
        // whenever the option is clicked 
        if (e.target.tagName==="INPUT"){
            const cost = e.target.getAttribute('data-cost');
            const timing = e.target.getAttribute('data-day-and-time');

            // when checkbox gets checked
            if(e.target.checked) {
                //add cost of activity to totalcost and  display it
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
                    console.log(activities[i].parentElement)
                    activities[i].parentElement.style.textDecoration= 'line-through'
                    activities[i].parentElement.style.color= 'red'
                    activities[i].disabled = true;
                }
            } else {
                //Resets the checkbox when the same timings chekcbox are unchecked 
                activities[i].disabled = false;
                activities[i].parentElement.style.textDecoration= ''
                activities[i].parentElement.style.color= 'black'
            }
        } 
    }

}


//Payment section
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


// Name validator
nameError = ''
function nameValidator() {
    // Make sure that name is not empty 
    if(name.value.length > 0) {
        return true;
    } else {
        nameError ='Name field cannot be left blank';
        return false;
    }
}

// different email error messagees for exceed expectations
let emailError = ''
function emailValidator() {
    // regex for normal email
    const validation =/^[\w]+@[a-z]+\.[a-z]{3}$/i;
    // if email is not empty 
    if (email.value ==="") {
        emailError = 'Email field cannot be blank';
        return false;
    }
    // validation with regex
    else if (!validation.test(email.value)) {
        emailError = 'Your email is invalid';
        return false;
    }
    else {
        return true;
    }

}


let checkboxError = '';
function checkBoxValidator() {
    let count =0;
    // ensure that at least 1 checkbox is checked 
    for (let i=0 ; i<activities.length; i++){
        if (activities[i].checked) {
            count += 1
        }
    }
    if (count > 0) {
        return true;
    } else {
        checkboxError = 'You need to select at least 1 activity'
        return false;
    }
}

let cardNumberError = '';
function cardNumberValidator() {
    const validation = /^[\d]{13,16}$/;
    // No number inside
    if (cardNumber.value === "") {
        cardNumberError = 'Please fill in card no.'
        return false
    }
    //  If number is not 13 to 16 digits
    else if (!validation.test(cardNumber.value)){
        cardNumberError = 'Card number must be between 13 to 16 digits'
        return false
    } else{
        return true
    }
}

let zipError = '';
function zipValidator() {
    // ensure that number has 5 digits
    const validation = /^[\d]{5}$/;
    if (!validation.test(zip.value)){
        zipError = 'ZIP must have at  least 5 digits';
        return false
    } else {
        return true
    }
}


let cvvError = '';
function cvvValidator() {
    // ensure that number has 3 digits
    const validation = /^[\d]{3}$/;
    if (!validation.test(cvv.value)){
        cvvError = "CVV must have at least 3 digits";
        return false
    } else {
        return true
    }
}



// check if all fields are valid before submitting. If not prevent it from submitting
form.addEventListener('submit', (e) => {

    // Only check credit card validation if payment is credit card
    if (payment.value === "credit card") {
        if (!cvvValidator()){
            cvv.className = "invalid"
            cvv.focus();
            e.preventDefault();
            
        };
        if (!zipValidator()){
            zip.className = "invalid"
            zip.focus();
            e.preventDefault();
        };
        if (!cardNumberValidator()){
            cardNumber.className = "invalid"
            cardNumber.focus()
            e.preventDefault();
        };
    }
    if (!checkBoxValidator()) {
        // if the activities has not be declared as invalid yet then create the html.
        if (activitiesDiv.className !== "activities invalid-activities") {     
            let errorHTML = document.createElement('p');
            errorHTML.textContent = checkboxError;
            errorHTML.style.color = "red"
            activitiesDiv.insertBefore(errorHTML, document.querySelector('.activities label'))
            activitiesDiv.classList.add("invalid-activities");
            e.preventDefault();
        } 
    }
    if (!emailValidator()) {
        createErrorMessage(emailValidator, email, emailError);
        email.focus();
        e.preventDefault();
    }

    if(!nameValidator()){
        createErrorMessage(nameValidator, name, nameError);
        name.focus();
        e.preventDefault();
    }
})

// Real time validation for credit card without error messages 
cardNumber.addEventListener('focusout', () => {
    cardErrorDisplay(cardNumberValidator, cardNumber);
})
cardNumber.addEventListener('input', () => {
    cardErrorDisplay(cardNumberValidator, cardNumber);
})

cvv.addEventListener('focusout', () => {
    cardErrorDisplay(cvvValidator, cvv);
})
cvv.addEventListener('input', () => {
    cardErrorDisplay(cvvValidator, cvv);
})

zip.addEventListener('focusout', () => {
    cardErrorDisplay(zipValidator, zip);
})
zip.addEventListener('input', () => {
    cardErrorDisplay(zipValidator, zip);
})




function cardErrorDisplay(validator, element) {
    // If not valid
    if (!validator()){
        element.className = "invalid"
        element.previousElementSibling.style.color = "red";
    }
    // If valid
    else {
        element.classList.remove('invalid')
        element.previousElementSibling.style.color = "black";
    }

}

// Real time validation for name and email with error messages 
name.addEventListener('input', () => {
    nameValidator();
    createErrorMessage(nameValidator, name, nameError);
})

name.addEventListener('focusout', () => {
    nameValidator();
    createErrorMessage(nameValidator, name, nameError);
})


email.addEventListener('input', () => {
    emailValidator()
    createErrorMessage(emailValidator, email, emailError);
})

email.addEventListener('focusout', () => {
    emailValidator()
    createErrorMessage(emailValidator, email, emailError);
})


function createErrorMessage(validator, element, errorMessage) {
    // If not valid
    if (!validator()) {
        // if the element has not be declared as invalid yet create new error message and put it beside label
        if (element.className !== "invalid") {     
            let errorHTML = document.createElement('p');
            errorHTML.textContent = errorMessage
            errorHTML.style.color = "red"
            element.insertAdjacentElement('beforebegin', errorHTML)
            element.classList.add("invalid");
        } 
        // if the element is still invalid but there is a change of error message
        else {
            let errorHTML = element.previousElementSibling;
            if (errorHTML.textContent !== errorMessage) {
                // change current error message to the new error
                errorHTML.textContent = errorMessage;
            }                  
        }
    } 
    //If valid
    else {
        removeP = element.previousElementSibling;
        //If there is an error message created then we need to remove it if name is valid
        if (element.className === "invalid"){
            element.classList.remove('invalid');
            element.parentElement.removeChild(removeP)
        }
    }
}


// Real time validation for activities checkboxes (at least 1 activities must be selected)
activitiesDiv.addEventListener('click', (e) => {
    if (e.target.tagName ==="INPUT") {
        //If invalid
        if (!checkBoxValidator()) {
            // if the activities has not be declared as invalid yet
            if (activitiesDiv.className !== "invalid-activities") {     
                let errorHTML = document.createElement('p');
                errorHTML.textContent = checkboxError;
                errorHTML.style.color = "red"
                activitiesDiv.insertBefore(errorHTML, document.querySelector('.activities label'))
                activitiesDiv.classList.add("invalid-activities");
            } 

        } 
        //If valid
        else {
            removeP = document.querySelector('.activities p')
            console.log(removeP)
            // If there is an error message created then we need to remove it if name is valid
            if (activitiesDiv.className === "activities invalid-activities"){
                activitiesDiv.classList.remove('invalid-activities');
                activitiesDiv.removeChild(removeP);
            }
        }
      
    }
})


function initialize() {
    jobSection();
    shirtSection();
    activitiesSection();
    paymentSection();
}



initialize();