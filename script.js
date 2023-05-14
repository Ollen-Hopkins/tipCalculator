// TODO: Handle user input of initial bill value
// TODO: Handle user selection of the gratuity, both default and custom values
// TODO: Handle user input of number of people to split the bill between
// TODO: Handle calculation of tip per person and total bill per person
// TODO: Handle resetting the calculator
// TODO: Handle appropriate styling for gratuities
// -> If a pre-set gratuity is selected, it should appear active.
// -> If no a pre-set gratuity is selected, or the user is providing a custom tip,
//    the buttons should NOT have appear active
// TODO: Handle appropriate styling for reset btn
// -> If there has been no value calculated, the reset btn should not work
// -> If the tips have been calculated, the reset btn should work


// !! Figma File Link :: https://www.figma.com/file/QcBtJ2rFIPtAcCb0bxmHea/tip-calculator-app?type=design&node-id=0-1&t=vneSsg9Qw4qG6emq-0


// Note: The elements needed have been queried for you here
// ** Query elements
const bill = document.getElementById('bill');
const gratuityBtns = document.querySelectorAll('.gratuity');
const customGratuity = document.getElementById('custom-gratuity');
const people = document.getElementById('people');
const splitTip = document.getElementById('split-tip');
const splitTotal = document.getElementById('split-total');
const resetBtn = document.getElementById('reset');

// ** Your work goes below here
// -> Handle calculation of tip per person and total Amount
function calculateSplit(){
  const billValue = bill.value;
  const numPeople = people.value;
  let gratuity = 0;

  //
  gratuityBtns.forEach(btn => {
    if(btn.classList.contains('active')){
      gratuity = btn.value / 10;
    }
  });

  if(customGratuity.value){
    gratuity = customGratuity.value / 10;
  }

  const tipAmount = billValue * gratuity;
  const totalAmount = parseFloat(billValue) + tipAmount;
  const splitTipAmount = tipAmount / numPeople;
  const splitTotalAmount = totalAmount / numPeople;

  splitTip.innerHTML = '$ ' + splitTipAmount.toFixed(2);
  splitTotal.innerHTML = '$ ' + splitTotalAmount.toFixed(2);

}



function handleUserInput(){
  if(!isNaN(bill.value) && validateNumPeople()){
    calculateSplit();
  }
  else {
    splitTip.innerHTML = '$ 0.00';
    splitTotal.innerHTML = '$ 0.00';
  }
  
}

function validateNumPeople(){
  const numPeople = people.value;
  if(numPeople >= 1 && !Number.isInteger(Number(numPeople))){
    return true;
  }
  else{
    return false;
  }
}

// Add event listeners to all relevant elements
bill.addEventListener('input', handleUserInput);
  
gratuityBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    resetGratuties();
    btn.classList.add('active');
    handleUserInput();
  });
});


customGratuity.addEventListener('input', () => {
  resetGratuities();
  handleUserInput();
});

people.addEventListener('input', handleUserInput);
  resetBtn.addEventListener('click', () => {
  document.querySelectorAll('input').forEach(i => (i.value = ''));
  resetGratuties();
  handleUserInput();
});

function resetGratuties(){
  gratuityBtns.forEach(btn => btn.classList.remove('active'));
  customGratuity.value = '';
}