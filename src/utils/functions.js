import {dataInSessionStorage} from './variables';

export function updateSum() {                                           //Update sum whenever cart item is added/removed
    const sum = dataInSessionStorage.reduce((total, item) => {
        return total + item.price;
      }, 0);
    document.getElementById('sum').innerHTML = `<strong>€ ${(Number(sum/100).toFixed(2))}</strong>`;
    console.log('Sum updated.');
}

export function updateTotalNumberOfItems() {                            //Update total number of items whenever cart item is added/removed
    document.getElementById('totalNumberOfItems').textContent = dataInSessionStorage.length;
    console.log('Total number of items updated.')
}

export function disableConfirmButton() {                                //Disable confirm button when cart is empty
    document.getElementById('btnConfirmOrder').classList.add('disabled') 
    console.log('Confirm button disabled');
}