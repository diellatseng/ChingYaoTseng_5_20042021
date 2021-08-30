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

const myForm = document.getElementById('myForm');
let orderId;

//Listening to confirm order button
myForm.addEventListener('submit', function(e) {
    e.preventDefault(); //Prevent default action when button is clicked 
    getData();
});

// Send request to API and get response from server
const getData = async () => {
    //Take user inputs in form and convert them into an array of objects
    const contact = Array.from(document.querySelectorAll('#myForm input')).reduce((acc, input) => ({
        ...acc, [input.id]:input.value})
        , []);
    console.log('Contact data get.');
    
    //Take id of each product and combine them into a string
    const products = dataInSessionStorage.reduce((products, product)=> {
        products.push(product.id);
        return products;  // is return causing jumping out of codes? 
    }, []);
    console.log('Product IDs get.');
    
    //Conbine contact and products into an array of objects
    const request = {contact, products};
    console.log('Sending request...')
    const response = await fetch('http://localhost:3000/api/cameras/order', {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    });
    const jsonData = await response.json();
    orderId = jsonData.orderId;
    console.log(`Request sent successful. Server response: Order ID ${orderId}`);
    
    // Remove current sessionStorage (products)
    sessionStorage.removeItem('products');
    console.log(`sessionStorage: "products" removed.`);
    
    // Save order Id into sessionStorage
    sessionStorage.setItem('orderId', orderId);
    console.log(`sessionStorage: "orderId" added.`);

    // Redirect to Thank You page
    console.log('Redirecting to Thank You page.')
    location.href = "thankyou.html"; 
}

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