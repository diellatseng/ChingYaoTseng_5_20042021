let productName = sessionStorage.getItem('name');
let productLense = sessionStorage.getItem('lense');
let productPrice = '€ ' + (Number((sessionStorage.getItem('price'))/100).toFixed(2));
let productImageUrl = sessionStorage.getItem('imageUrl');

//Use session storage data to creat list item
function addItemToCart() {
    let productItemHtml = (`
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
    </li>`)

    document.getElementById('myCart').innerHTML += productItemHtml;
    // removeLocalStorage();
}

// function removeLocalStorage(){
//     localStorage.clear();
// }

// - Update total price
// - Update total number of items
// - Confirm order button

addItemToCart();