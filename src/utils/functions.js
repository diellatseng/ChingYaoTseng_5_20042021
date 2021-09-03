import {dataInSessionStorage} from './variables';

export function updateSum() {                                           //Update sum whenever cart item is added/removed
    const sum = dataInSessionStorage.reduce((total, item) => {
        return total + item.price;
      }, 0);
    document.getElementById('sum').innerHTML = `<strong>€ ${(Number(sum/100).toFixed(2))}</strong>`;
    console.log('Sum updated.');
}

export function updateNumberOfItems() {                            //Update total number of items whenever cart item is added/removed
    document.getElementById('totalNumberOfItems').textContent = dataInSessionStorage.length;
    console.log('Total number of items updated.')
}

export function disableConfirmButton() {                                //Disable confirm button when cart is empty
    document.getElementById('btnConfirmOrder').classList.add('disabled') 
    console.log('Confirm button disabled');
}

export function removeItem(event) {
    const btnClicked = event.target;
    const productElement = btnClicked.parentElement.previousElementSibling;
    const name = productElement.getElementsByClassName('name')[0].textContent;          //Get name of item
    const positionOfItemClicked = dataInSessionStorage.map(x => x.name).indexOf(name);  //Find position of this item in 'dataInSessionStorage'
    dataInSessionStorage.splice(positionOfItemClicked, 1);                              //Remove this item from string 'dataInSessionStorage'
    sessionStorage.setItem('products', JSON.stringify(dataInSessionStorage));           //Update sessionStorage after removing this item
    productElement.parentElement.parentElement.remove();                                //Remove element from DOM
    if(dataInSessionStorage.length == 0) disableConfirmButton();                        //Disable confirm button if the last item in cart is removed

    updateSum();
    updateNumberOfItems();
}