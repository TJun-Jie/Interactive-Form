when javascript is off , all elements will not be hidden
set autofocus name

select form and store it as form
select .title and store it as jobRole
add textarea into html and give it an id of other title and placeholder "your job role"  and hide the display  
add event listener "change" to jobRole 
when jobrole value is "other", on the display.

select design option and store it as designooption
select coloroption and store it as coloroption
Hide all other color options and add  Please select a theme first
add change event listener to design option 
once theme is selected, change the color options to show those that corresponds to the theme

create html for total cost of activites 
hide the html
select activities and store it as activities
create a timingtaken array
add change or click event listener to activities 
whenever the option is clicked 
check if it is checked or unchecked 
if checked
    see if html is hidden or not
    if hidden
        unhide it.
        store totalcost variable
        add cost of activity to totalcost
        display it
    else
        add cost of activity to total cost
        display it
    add the timing of that option to the timingtaken array
    loop through all activities
        check if their timings is inside the timingtaken array
            if inside, then disable that checkbox of that activty
            if not inside, add it to the timing taken array

            

else if not checked
    remove the timing of that option from the timing taken array
        loop through all activities
        check if their timings is inside the timingtaken array
            if not inside, then enable the checkbox of that activity
    
        

select payment and store it in a variable payment
disable select payment method
set default option to be credit card 
display credit card div and hide bitcoin and paypal

add change event listener to payment
when user selects another payment option,
display that payment options and hide the rest
