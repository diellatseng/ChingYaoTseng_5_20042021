import {dataInSessionStorage} from './utils/variables';

const productId = getProductId();
let myProducts;

//Get product id from url//
function getProductId() {
    return new URL(window.location.href).searchParams.get('id');
}

// Fetch product data from server//
const getData = async () => {
    const response = await fetch(`http://localhost:3000/api/cameras/${productId}`);
    const jsonData = await response.json();
    return jsonData;
}

// Display product information using data saved in myProducts//
const displayProducts = async() => {
    try {
        myProducts = await getData();
        //Display title according to product name //
        document.getElementById('title')
                .textContent = `Produit | ${myProducts.name} - Orinoco France`;
    
        //Display product image //
        document.getElementById("productImage")
                .innerHTML = `<img class="img-fluid" src="${myProducts.imageUrl}" alt="">`;
    
        //Display product name //                
        document.getElementById('productName')
                .textContent = myProducts.name;
        
        //Display product price //
        document.getElementById('productPrice')
                .textContent += `€ ${(Number(myProducts.price/100).toFixed(2))}`;
        
        //Display product description //
        document.getElementById('description')
                .textContent = myProducts.description;
    
        //Display product lenses into option values //
        const lenses = myProducts.lenses;
        let lenseHtml = '<option>Choisissez votre lentille</option>'; //Adding default option to lense list
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

//Execute the following after page fully loaded
let lenseSeleted = '';
let products = [];

window.addEventListener('load', () => {
    console.log('[ Page is fully loaded ]');
    
    // Listen to lense change
    const lenseList = document.getElementById('lenses');
    lenseList.addEventListener('change', (e) => {
        lenseSeleted = e.target.options[e.target.selectedIndex].text;
        console.log(`[ Lense changed: ${lenseSeleted} ]`);
    });
    console.log('...Listening to lense change');

    //Listen to "Add to cart" button
    document.getElementById('btnAddToCart').addEventListener('click', addToCart);
    console.log('...Listening to "Add to cart"');
    
    //Save lense and product data in sessionStorage
    function addToCart() {
        if(lenseSeleted == '') { //Check if lense is seleted
            window.alert('Veuillez sélectionner une autre lentille.');
            console.log("Button clicked, user needs to select a lense to proceed.");
        } else {
            console.log('...Checking data in sessionStorage');
            const productSaved = JSON.parse(sessionStorage.getItem('products')) || [];  //if productSaved not provided, default to []

            products = [
                ...productSaved, 
                {
                id: myProducts._id,
                name: myProducts.name,
                price: myProducts.price,
                imageUrl: myProducts.imageUrl,
                lense: lenseSeleted
            }];

            if (productSaved == '') { // If cart is empty, add item
                addItem();
            } else { // Check if item already exist in cart
                checkCart();
            }
        }
    }
  });

// Add item into cart
function addItem() {
    sessionStorage.setItem('products', JSON.stringify(products));
    console.log(`[ Product saved ! ]`);
    //Go to cart.html
    console.log("Button clicked!");
    location.href = "../pages/cart.html"; 
}

// Check if item has already been added to cart
function checkCart() {
    const result = dataInSessionStorage.filter((object) => checkItem(object));
    if(result == ''){ 
        addItem(); // If retruned object is not defined, add item to cart
    } else { 
        window.alert('Ce produit est déjà dans votre panier. Veuillez sélectionner une autre lentille ou rechercher un autre produit.'); // If returned object is found, alert user
    }
}

function checkItem(object) {
    return object.id === myProducts._id && object.lense === lenseSeleted; // Find an object that matches incoming product id and incoming lense at the same time, return object found
}

displayProducts();