import {dataInSessionStorage, apiUrl} from './utils/variables';

const productId = new URL(window.location.href).searchParams.get('id');                     // Get product id from url, so that we can display product information accordingly
const getData = async () => {                                                               // Fetch product data from server
    const response = await fetch(`${apiUrl}${productId}`);
    const jsonData = await response.json();
    return jsonData;
};

let myProducts;
const displayProducts = async() => {                                                        // Display product information using data saved in myProducts
    try {
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
        let lenseHtml = '<option>Choisissez votre lentille</option>'; 
        for (let lense of lenses) {
            lenseHtml += `<option>${lense}</option>`;
        }
        document.getElementById('lenses')
                .innerHTML = lenseHtml;
    } catch(error) {
        window.alert(error);
        console.log(error);
    }
};

let lenseSeleted = '';
let products = [];
window.addEventListener('load', () => {                                                     // Execute the following after page fully loaded
    const lenseList = document.getElementById('lenses');                                    // Listen to lense change
    lenseList.addEventListener('change', (e) => {
        lenseSeleted = e.target.options[e.target.selectedIndex].text;
        console.log(`Lense changed: ${lenseSeleted}`);
    });
    document.getElementById('btnAddToCart').addEventListener('click', addToCart);           // Listen to "Add to cart" button

    function addToCart() {                                                                  // Save lense and product data in sessionStorage
        if(lenseSeleted == '') {                                                            // Check if lense is seleted
            window.alert('Veuillez sélectionner une autre lentille.');
        } else {
            console.log('...Checking data in sessionStorage');
            const productSaved = JSON.parse(sessionStorage.getItem('products')) || [];      // if productSaved not provided, default to []

            products = [
                ...productSaved, 
                {
                id: myProducts._id,
                name: myProducts.name,
                price: myProducts.price,
                imageUrl: myProducts.imageUrl,
                lense: lenseSeleted
            }];

            if (productSaved == '') {                                                       // If cart is empty, add item
                addItem();
            } else {                                                                        // Else, check if this item has already been added to cart
                const result = dataInSessionStorage.filter((object) => {
                    return object.id === myProducts._id && object.lense === lenseSeleted;   // Find an object that matches incoming product id and incoming lense at the same time, return object found
                });
                if(result == '') {                                                          // If retruned object is not defined, add item to cart
                    addItem(); 
                } else {                                                                    // If returned object is found, alert user
                    window.alert('Ce produit est déjà dans votre panier. Veuillez sélectionner une autre lentille ou rechercher un autre produit.'); 
                }
            }
        }
    }
});

function addItem() {                                                                        // Add item into cart
    sessionStorage.setItem('products', JSON.stringify(products));
    console.log('Product saved !');
    location.href = "../pages/cart.html";                                                   // Go to cart.html after product is saved in sessionStorage
}

displayProducts();