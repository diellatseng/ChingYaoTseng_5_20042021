let btnRemove = document.getElementsByClassName('btn-danger');

function removeItem(event) {
    const btnClicked = event.target;
    const productElement = btnClicked.parentElement.previousElementSibling;
    const name = productElement.getElementsByClassName('name')[0].textContent; //Get name of item
    const positionOfItemClicked = dataInSessionStorage.map(x => x.name).indexOf(name); //Find position of this item in 'dataInSessionStorage'
    dataInSessionStorage.splice(positionOfItemClicked, 1); //Remove this item from string 'dataInSessionStorage'
    sessionStorage.setItem('products', JSON.stringify(dataInSessionStorage)); //Update sessionStorage after removing this item
    productElement.parentElement.parentElement.remove(); //Remove element from DOM
    if(dataInSessionStorage.length == 0) disableConfirmButton(); //Disable confirm button if the last item in cart is removed

    updateSum();
    updateTotalNumberOfItems();
}