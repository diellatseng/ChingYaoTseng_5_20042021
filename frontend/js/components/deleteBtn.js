let btnDelete = document.getElementsByClassName('btn-danger');

//Listening to delete button
function listenToDeleteButton() {
    for(i = 0; i < btnDelete.length; i++) {
        let btn = btnDelete[i];
        btn.addEventListener('click', removeItem);
        console.log(`Event listener added to delete button ${i+1}`);
    }
    console.log('Listening to delete button click...');
}

function removeItem(event) {
    const btnClicked = event.target;
    const productElement = btnClicked.parentElement.previousElementSibling;
    //Get name of item
    const name = productElement.getElementsByClassName('name')[0].textContent;
    //Find position of this item in string 'dataInSessionStorage'
    const positionOfItemClicked = dataInSessionStorage.map(x => x.name).indexOf(name);
    //Remove this item from string 'dataInSessionStorage'
    dataInSessionStorage.splice(positionOfItemClicked, 1);
    //Update sessionStorage after removing this item
    sessionStorage.setItem('products', JSON.stringify(dataInSessionStorage));
    //Remove element from DOM
    btnDelete[0].parentElement.parentElement.parentElement.remove();

    updateSum();
    updateTotalNumberOfItems();
    checkIfCartIsEmpty();
}

//Disable confirm button if user deleted the last item in cart
function checkIfCartIsEmpty(){
    if(dataInSessionStorage.length == 0){
        disableConfirmButton();
        console.log('Deleted last item');
    } else {
        console.log('Item removed.');
    }
}