const dataInSessionStorage = JSON.parse(sessionStorage.getItem('products')); // Get data saved in sessionStorage
let cartElement;

//If sessionStorage is empty, display an empty cart, else display items into cart.
if (dataInSessionStorage == null || dataInSessionStorage == '') {
    displayEmptyCart();
} else {
    cartElement = addToCart();

    //Use session storage data to generate html
    function addToCart() {
        //Total sum of items added into cart, this will always be displayed at the end of the list.
        let html = `
            <li class="list-group-item d-flex justify-content-between order-last">
                <p class="mb-0">Total (EUR)</p>
                <p id="sum" class="mb-0"></p>
            </li>`;
        
        //Generating list item html from data stored in sessionStorage
        for (i = 0; i < dataInSessionStorage.length; i++) {
            html += `
            <li class="list-group-item border-top">
                <div class="row py-2">
                    <div class="col-4 col-md-3">
                        <img class="img-fluid" src="${dataInSessionStorage[i].imageUrl}" alt="">
                    </div>
                    <div class="col-8 col-md-9">
                        <h3 class="name h5 mb-0">${dataInSessionStorage[i].name}</h3>
                        <small class="text-break text-muted">Lense chosen: ${dataInSessionStorage[i].lense}</small>
                        <p class="price mt-2">€ ${(Number(dataInSessionStorage[i].price/100).toFixed(2))}</p>
                    </div>
                    <div class="d-inline text-end">
                        <button type="button" class="btn btn-danger">supprimer</button>
                    </div>
                </div>
            </li>`;
        }
        console.log('Cart list html ready.')
        return html;
    }

    //Execute the following codes when the page is fully loaded (cart list html fully generated)
    window.addEventListener('load', () => {
        function displayCart(){
            document.getElementById('myCart').innerHTML = cartElement;
            console.log('Cart list displayed.')
        }
        displayCart();
        listenToRemoveButton();
        updateSum();
        updateTotalNumberOfItems()
    });
}

//Display an empty cart when sessionStorage is empty
function displayEmptyCart() {
    cartElement= ` 
    <li class="list-group-item text-center">
    <p class="mb-0 py-4 text-muted">Oups ! Vous n'avez aucun article dans votre panier.</p>
    <p id="sum" class="mb-0"></p>
    </li>`;
    document.getElementById('myCart').innerHTML = cartElement; //Insert html into DOM
    document.getElementById('totalNumberOfItems').textContent = 0; //Inser "0" into "Panier()"
    console.log('Empty cart displayed.');

    disableConfirmButton();
}

//Disable confirm button when cart is empty
function disableConfirmButton() {
    document.getElementById('btnConfirmOrder').classList.add('disabled') //disable confirm order button
    console.log('Confirm button disabled');
}

//Update sum whenever cart item is added/removed
function updateSum() {
    const sum = dataInSessionStorage.reduce((total, item) => {
        return total + item.price;
      }, 0);
    document.getElementById('sum').innerHTML = `<strong>€ ${(Number(sum/100).toFixed(2))}</strong>`;
    console.log('Sum updated.');
}
        
//Display total number of items that are added to cart
function updateTotalNumberOfItems() {
    document.getElementById('totalNumberOfItems').textContent = dataInSessionStorage.length;
    console.log('Total number of items updated.')
}

//Listening to remove button
function listenToRemoveButton() {
    const btnRemove = document.getElementsByClassName('btn-danger');
    for(i = 0; i < btnRemove.length; i++) {
        let btn = btnRemove[i];
        btn.addEventListener('click', removeItem);
    }
    console.log('Listening to remove button...');
}