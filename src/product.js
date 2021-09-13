import {dataInlocalStorage, apiUrl} from './utils/variables';
import {updateCartNotif} from '../src/utils/functions';
import {Toast} from 'bootstrap';

const productId = new URL(location.href).searchParams.get('id');                     // Get product id from url, so that we can display product information accordingly
const getData = async () => {
    try {
        const response = await fetch(`${apiUrl}${productId}`);
        if (response.status === 200) {
            const jsonData = await response.json();
            return jsonData;
        } else {
            location.href = "../index.html"
        }
    } catch(error) {
        window.alert(error);
    }
}; 

let myProducts;
const displayProducts = async() => {                                                        // Display product information using data saved in myProducts
    myProducts = await getData();
    document.getElementById('title')        
            .textContent = `Produit | ${myProducts.name} - Orinoco France`;             // Display title according to product name 
    document.getElementById("productImage") 
            .innerHTML = `<img class="img-fluid" src="${myProducts.imageUrl}" alt="">`; // Display product image 
    document.getElementById('productName')   
            .textContent = myProducts.name;                                             // Display product name 
    document.getElementById('productPrice') 
            .textContent += `€ ${(Number(myProducts.price/100).toFixed(2))}`;           // Display product price
    document.getElementById('description')  
            .textContent = myProducts.description;                                      // Display product description 
    const lenses = myProducts.lenses;                                                   // Display product lenses into option values 
    let lensHtml = '<option>Choisissez votre lentille</option>'; 
    for (let lens of lenses) {
        lensHtml += `<option>${lens}</option>`;
    }
    document.getElementById('lenses')
            .innerHTML = lensHtml;
};

let lensSeleted = '';
let products = [];

window.addEventListener('load', () => {                                                     // Execute the following after page fully loaded
    const lensList = document.getElementById('lenses');                                     // Listen to lens change
    lensList.addEventListener('change', (e) => {
        lensSeleted = e.target.options[e.target.selectedIndex].text;
        console.log(lensSeleted);
    });
    document.getElementById('btnAddToCart').addEventListener('click', addToCart);           // Listen to "Add to cart" button

    function addToCart() {                                                                  // Save lens and product data in localStorage
        if(lensSeleted == '' || lensSeleted === "Choisissez votre lentille") {                                                             // Check if lens is seleted
            window.alert('Veuillez sélectionner une autre lentille.');
        } else {
            const productSaved = JSON.parse(localStorage.getItem('products')) || [];        // if productSaved not provided, default to []

            products = [
                ...productSaved, 
                {
                id: myProducts._id,
                name: myProducts.name,
                price: myProducts.price,
                imageUrl: myProducts.imageUrl,
                lens: lensSeleted
            }];

            if (productSaved == '') {                                                       // If cart is empty, add item
                addItem();
            } else {                                                                        // Else, check if this item has already been added to cart
                const result = dataInlocalStorage.filter((object) => (
                    object.id === myProducts._id && object.lens === lensSeleted             // Find an object that matches incoming product id and incoming lens at the same time, return object found
                ));
                if(result == '') {                                                          // If retruned object is not defined, add item to cart
                    addItem(); 
                } else {                                                                    // If returned object is found, alert user
                    window.alert('Ce produit est déjà dans votre panier. Veuillez sélectionner une autre lentille ou rechercher un autre produit.'); 
                }
            }
        }
    }

    const btnContinue = document.getElementById('btnContinue');                              // When button "Continuer mes achats" in toast alert is clicked, reload page
    btnContinue.addEventListener ('click', () => {
        location.reload();
    })
    const btnCart = document.getElementById('btnCart');                                      // When button "Voir mon panier" in toast alert is clicked, redirect to cart.html
    btnCart.addEventListener ('click', () => {
        location.href = "cart.html";
    })

});


function addItem() {                                                                        // Add item into cart
    localStorage.setItem('products', JSON.stringify(products));
   
    const toast = document.querySelector('.toast');
    const myToast = new Toast(toast);

    document.getElementById('btnAddToCart').classList.add('disabled');
    document.getElementById('lenses').disabled = true;
    myToast.show();
}

displayProducts();
updateCartNotif();