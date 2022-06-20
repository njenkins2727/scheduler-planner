//when i visit this page 
function startClock(){
    setInterval(function(){

        const now = moment().format("DD-MM-YYYY HH:mm:ss");

        $("#currentDay").text(now)
    }, 1000);
}
function creatTimeBlock(hour){

const row = $("<div>");

const currentHour = Number(moment().format("H"));

//past - hour < current hour 
const isPast = hour < currentHour;

// present - current hour === hour 
const isPresent = hour === currentHour;

//future - hour > current hour 
const isFuture = hour> currentHour;

let rowClass = 'row';

if (isPast) {
    rowClass = rowClass + ' past';
}
if (isPresent) {
    rowClass = rowClass + ' present';
}
if (isFuture) {
    rowClass = rowClass + ' future';
}

row.attr('class', rowClass);

const timeCol = $("<div>");
timeCol.attr('class', 'time-col cold-2');

timeCol.text(hour + ":00");

const textareaCol = $("<div>");
textareaCol.attr('class', 'textarea-col col-8');

const textarea = $('<textarea rows ="3">')
textareaCol.append(textarea);

  // with existing details from local storage 
const existingNotes = localStorage.getItem(hour);
textarea.val(existingNotes);

const buttonCol = $("<div>");
buttonCol.attr ('class', 'button-col col-2'); 

const saveBtn = $('<button class="btn btn-primary save-button">');
saveBtn.text('Save');

// remove button (To be continued...)
// const removeBtn = $('<button class="btn btn-primary remove-button">');
// removeBtn.text('Remove');

buttonCol.append(saveBtn);
// buttonCol.append(removeBtn); 

row.append(timeCol, textareaCol, buttonCol);

return row;
}


//see a clock in the header
$(function(){
 startClock();
 const timeBlockContainer= $('.container');


//I should see 9am - 5pm timeblock 
  for (let hour = 9; hour < 18; hour++) {
      
    const timeblock = creatTimeBlock(hour);

    timeBlockContainer.append(timeblock);
  }
})


//when I click on save button of specific timeblock 
$(document).on('click', '.save-button', function(event){

const buttonClicked = $(event.target);

const textarea = buttonClicked.parent().prev().children();

const timeCol = buttonClicked.parent().prev().prev();

const time = timeCol.text();

const hour = time.slice(0, -3)


 // grab the user input 
const userInput = textarea.val();


//key = hour of timeblock 


 //save to local storage 
 localStorage.setItem(hour, userInput);
});

  //remove button (To be continued...)
//   $(document).on('click', '.remove-button', function(event){


//   localStorage.clear(hour);
// })