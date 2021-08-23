let itemsInCart = '';
let newProductItem = '';

//Check number of items already in the cart
let numberOfItems = document.getElementsByClassName('list-group-item').length - 1;
console.log('Number of items added into cart: ' + numberOfItems);
saveItemsAddedToCart();

//New entry
function saveItemsAddedToCart() {
    itemsInCart = document.getElementById('myCart').innerHTML;
    let clicks = sessionStorage.getItem('clicks');
    sessionStorage.setItem(`itemsAdded${clicks}`, itemsInCart)
    newItemHtml();
}

//Use session storage data to creat list item
function newItemHtml() {
    let productName = sessionStorage.getItem('name');
    let productLense = sessionStorage.getItem('lense');
    let productPrice = '€ ' + (Number((sessionStorage.getItem('price'))/100).toFixed(2));
    let productImageUrl = sessionStorage.getItem('imageUrl');
    newProductItem = `
    <li class="list-group-item">
        <div class="row py-2">
            <div class="col-4 col-md-3">
                <img class="img-fluid" src="${productImageUrl}" alt="">
            </div>
            <div class="col-8 col-md-9">
                <h3 class="h5 mb-0">${productName}</h3>
                <small class="text-break text-muted">Lense chosen: ${productLense}</small>
                <p class="mt-2">${productPrice}</p>
            </div>
            <div class="d-inline text-end">
                <button type="button" class="btn btn-danger">delete</button>
            </div>
        </div>
    </li>`;
    getItemsAlreadyInCart();
}

function getItemsAlreadyInCart(){
    let clicks = sessionStorage.getItem('clicks');
    for(let i = 0; i < clicks; i++) {
        let itemAlreadyInCart = sessionStorage.getItem(`itemsAdded${i + 1}`);
        itemsInCart += itemAlreadyInCart;
        console.log('i: ' + i);
        console.log('clicks: ' + clicks);
        console.log('itemAlreadyInCart: ' + itemAlreadyInCart);
    }
    addNewItemToCart();
}

function addNewItemToCart() {
    console.log('New Item' + newProductItem);
    let renewedCart = itemsInCart + newProductItem;
    document.getElementById('myCart').innerHtml = renewedCart;
    console.log('renewedCart: ' + renewedCart);
    console.log('Item added to cart');
}
// function removeLocalStorage(){
//     localStorage.clear();
// }

// - Update total price
// - Confirm order button

//Display total number of items in the cart
listedItem = document.getElementsByClassName('list-group-item').length - 1;
console.log('Number Of Items (updated): ' + listedItem);
document.getElementById('numberOfItems').textContent = listedItem;

