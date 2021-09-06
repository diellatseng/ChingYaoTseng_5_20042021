import {dataInlocalStorage} from './variables';

export function updateSum() {                                           //Update sum whenever cart item is added/removed
    const sum = dataInlocalStorage.reduce((total, item) => {
        return total + item.price;
      }, 0);
    document.getElementById('sum').innerHTML = `<strong>€ ${(Number(sum/100).toFixed(2))}</strong>`;
    console.log('Sum updated.');
}

export function updateNumberOfItems() {                            //Update total number of items whenever cart item is added/removed
    document.getElementById('numberOfItems').textContent = dataInlocalStorage.length;
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
    const positionOfItemClicked = dataInlocalStorage.map(x => x.name).indexOf(name);  //Find position of this item in 'dataInlocalStorage'
    dataInlocalStorage.splice(positionOfItemClicked, 1);                              //Remove this item from string 'dataInlocalStorage'
    localStorage.setItem('products', JSON.stringify(dataInlocalStorage));           //Update localStorage after removing this item
    productElement.parentElement.parentElement.remove();                                //Remove element from DOM
    if(dataInlocalStorage.length == 0) disableConfirmButton();                        //Disable confirm button if the last item in cart is removed

    updateSum();
    updateNumberOfItems();
}