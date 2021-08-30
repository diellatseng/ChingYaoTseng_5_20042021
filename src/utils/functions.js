import {dataInSessionStorage} from './variables';

//Update sum whenever cart item is added/removed
export function updateSum() {
    const sum = dataInSessionStorage.reduce((total, item) => {
        return total + item.price;
      }, 0);
    document.getElementById('sum').innerHTML = `<strong>€ ${(Number(sum/100).toFixed(2))}</strong>`;
    console.log('Sum updated.');
}
        
//Display total number of items that are added to cart
export function updateTotalNumberOfItems() {
    document.getElementById('totalNumberOfItems').textContent = dataInSessionStorage.length;
    console.log('Total number of items updated.')
}