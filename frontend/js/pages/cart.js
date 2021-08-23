let itemsInCart = '';
let newProductItem = '';

// //Check number of items already in the cart
// let numberOfItems = document.getElementsByClassName('list-group-item').length - 1;
// console.log('Number of items added into cart: ' + numberOfItems);
// saveItemsAddedToCart();

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

function addNewItemToCart() {
    console.log('New Item' + newProductItem);
    let renewedCart = itemsInCart + newProductItem;
    document.getElementById('myCart').innerHtml = renewedCart;
    console.log('renewedCart: ' + renewedCart);
    console.log('Item added to cart');
}

// - Display total number of items in the cart
// - Update total price
// - Confirm order button
// - Remove SessionStorage

// function removeLocalStorage(){
//     localStorage.clear();
// }
