import {dataInlocalStorage} from './variables';

export function updateSum() {                                                                   // Update sum whenever cart item is added/removed
    const sum = dataInlocalStorage.reduce((total, item) => {
        return total + item.price;
      }, 0);
    document.getElementById('sum').innerHTML = `<strong>€ ${(Number(sum/100).toFixed(2))}</strong>`;
}

export function updateNumberOfItems() {                                                         // Update total number of items whenever cart item is added/removed
        document.getElementById('numberOfItems').textContent = dataInlocalStorage.length;
}

export function updateCartNotif() {                                                             // Update total number of items whenever cart item is added/removed
    if(dataInlocalStorage == null || dataInlocalStorage == ""){
        document.getElementById('cartNotif').style.display = "none";
    } else {
        document.getElementById('cartNotifNum').textContent = dataInlocalStorage.length;
        document.getElementById('cartNotif').style.display = "block";
    }
}

export function disableConfirmButton() {                                                        // Disable confirm button when cart is empty
    document.getElementById('btnConfirmOrder').classList.add('disabled') 
}

export function removeItem(event) {
    const btnClicked = event.target;
    const productElement = btnClicked.parentElement.previousElementSibling;
    const name = productElement.getElementsByClassName('name')[0].textContent;                  // Get name of item
    const lens = productElement.getElementsByClassName('lens')[0].textContent;                  // Get lens of item
    const found = dataInlocalStorage.find((item) => {                                           // Find an object in the array that has both item's name and lens
        return item.name === name && item.lens === lens;
    });
    const positionOfItemClicked = dataInlocalStorage.indexOf(found);                            // Find position of this item in 'dataInlocalStorage'
    dataInlocalStorage.splice(positionOfItemClicked, 1);                                        // Remove this item from string 'dataInlocalStorage'
    localStorage.setItem('products', JSON.stringify(dataInlocalStorage));                       // Update localStorage after removing this item
    productElement.parentElement.parentElement.remove();                                        // Remove element from DOM
    if(dataInlocalStorage.length == 0) disableConfirmButton();                                  // Disable confirm button if the last item in cart is removed

    updateSum();
    updateNumberOfItems();
    updateCartNotif();
}