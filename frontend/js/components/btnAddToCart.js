let lenseSeleted ='';
let products = [];

//Execute the following codes when the page is fully loaded
window.addEventListener('load', (event) => {

    // Listen to lense change
    function listenToLenseChange() {
        const lenseList = document.getElementById('lenses');
        lenseList.addEventListener('change', (e) => {
            lenseSeleted = lenseList.options[lenseList.selectedIndex].text;
            console.log(`[ Current lense: ${lenseSeleted} ]`);
        });
        console.log('...Listening to lense change');
        listenToBtnClick();
    }
    
    //Listen to button click
    function listenToBtnClick(){
        document.getElementById('btnAddToCart').addEventListener('click', addToCart);
        console.log('...Listening to button click');
    }
    
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
            };
        }
    }
    console.log('[ Page is fully loaded ]');
    listenToLenseChange();
  });

// Add item into cart
function addItem() {
    sessionStorage.setItem('products', JSON.stringify(products));
    console.log(`[ Product saved ! ]`);
    //Go to cart.html
    console.log("Button clicked!");
    location.href = "cart.html"; 
}

// Check if item has already been added to cart
function checkCart() {
    const dataInSessionStorage = JSON.parse(sessionStorage.getItem('products')); // Get data saved in sessionStorage
    const result = dataInSessionStorage.filter(checkItem = (object) => { // Filter array dataInSessionStorage
        return object.id === myProducts._id && object.lense === lenseSeleted; // Find an object that matches incoming product id and incoming lense at the same time, return object found
    });
    if(result == ''){ 
        addItem(); // If retruned object is not defined, add item to cart
    } else { 
        window.alert('Ce produit est déjà dans votre panier. Veuillez sélectionner une autre lentille ou rechercher un autre produit.'); // If returned object is found, alert user
    }
}