import {apiUrl, dataInlocalStorage} from './utils/variables';
import {updateSum, updateNumberOfItems, disableConfirmButton, removeItem} from './utils/functions';

let cartElement;
if (dataInlocalStorage == null || dataInlocalStorage == '') {               // If localStorage(cart) is empty, display an empty cart:
    cartElement = ` 
    <li class="list-group-item text-center">
    <p class="mb-0 py-4 text-muted">Oups ! Vous n'avez aucun article dans votre panier.</p>
    <p id="sum" class="mb-0"></p>
    </li>`;
    document.getElementById('myCart').innerHTML = cartElement;              // Insert empty cart html into DOM
    document.getElementById('numberOfItems').textContent = 0;               // Insert "0" into "Panier()"
    console.log('Empty cart displayed.');

    disableConfirmButton();
} else {                                                                    // Else generate cart item html:
    cartElement = () => {                                                   // Summary Html- this block of html should always be displayed at the end of the list
        let html = `
            <li class="list-group-item d-flex justify-content-between order-last">
                <p class="mb-0">Total (EUR)</p>
                <p id="sum" class="mb-0"></p>
            </li>`;
        for (let i = 0; i < dataInlocalStorage.length; i++) {               // List item html - generating from data stored in localStorage
            html += `
            <li class="list-group-item border-top">
                <div class="row py-2">
                    <div class="col-4 col-md-3">
                        <img class="img-fluid" src="${dataInlocalStorage[i].imageUrl}" alt="">
                    </div>
                    <div class="col-8 col-md-9">
                        <h3 class="name h5 mb-0">${dataInlocalStorage[i].name}</h3>
                        <small class="text-break text-muted">Lentille choisie: ${dataInlocalStorage[i].lens}</small>
                        <p class="price mt-2">€ ${(Number(dataInlocalStorage[i].price/100).toFixed(2))}</p>
                    </div>
                    <div class="d-inline text-end">
                        <button type="button" class="btn btn-danger">supprimer</button>
                    </div>
                </div>
            </li>`;
        }
        return html;
    };

    window.addEventListener('load', () => {                                 // Execute the following codes when the page is fully loaded (cart list html fully generated)
        document.getElementById('myCart').innerHTML = cartElement();        // Display cart using html codes generated by cartElement
        const btnRemove = document.getElementsByClassName('btn-danger');    // Listening to remove button(s)
        for(let i = 0; i < btnRemove.length; i++) {
            let btn = btnRemove[i];
            btn.addEventListener('click', (event) => removeItem(event));
        }
        updateSum();
        updateNumberOfItems()
    });
}

const myForm = document.getElementById('myForm');
myForm.addEventListener('submit', function(e) {                             // Listening to confirm order button
    e.preventDefault();                                                     // Prevent default action when button is clicked 
    getData();
});

const getData = async () => {                                               // Send request to API and get response from server
    const contact = Array.from(document.querySelectorAll('#myForm input')).reduce((acc, input) => ({    //Take user inputs in form and convert them into an array of objects
        ...acc, [input.id]:input.value})
        , []);
    console.log('Contact data get.');
    const products = dataInlocalStorage.reduce((products, product)=> {      // Take id of each product and combine them into a string
        products.push(product.id);
        return products;
    }, []);
    console.log('Product IDs get.');
    const request = {contact, products};                                    // Conbine contact and products into an array of objects
    console.log('Sending request...')
    const response = await fetch(`${apiUrl}order`, {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    });
    const jsonData = await response.json();
    localStorage.removeItem('products');                                    // Remove current localStorage (products)
    localStorage.setItem('orderId', jsonData.orderId);                      // Save order Id into localStorage
    location.href = "confirmation.html";                                    // Redirect to Thank You page
}