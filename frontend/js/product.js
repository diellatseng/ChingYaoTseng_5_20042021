let productId = getProductId();
let myProducts = [];
let lenseSeleted ='';

//Get product id from url//
function getProductId() {
    return new URL(window.location.href).searchParams.get('id');
}

// Fetch product data from server//
const getData = async () => {
    let response = await fetch('http://localhost:3000/api/cameras/' + productId);
    let jsonData = await response.json();
    return myProducts = jsonData;
}

// Display product information using data saved in myProducts//
const displayProducts = async() => {
    await getData();
    //Display title according to product name //
    document
        .getElementById('title')
        .textContent = 'Produit | ' + myProducts.name + ' - Orinoco France';

    //Display product image //
    document
        .getElementById("productImage")
        .innerHTML = `<img class="img-fluid" src="${myProducts.imageUrl}" alt="">`;

    //Display product name //                
    document
        .getElementById('productName')
        .textContent = myProducts.name;
    
    //Display product price //
    document
        .getElementById('productPrice')
        .textContent += '€ ' + (Number(myProducts.price/100).toFixed(2));
    
    //Display product description //
    document
        .getElementById('description')
        .textContent = myProducts.description;

    //Display product lenses into option values //
    let lenses = myProducts.lenses;
    let lenseHtml ='<option>Choisissez votre lentille</option>';
    for (let lense of lenses) {
        lenseHtml += '<option>' + lense + '</option>';
    }
    document
        .getElementById('lenses')
        .innerHTML = lenseHtml;
};

//
//BELOW ARE NOT WAITING FOR FUNCTIONS NEEDED TO EXECUTE FIRST
//
// Listen to lense change
function listenToLenseChange() {
    const lenseList = document.getElementById('lenses');
    lenseList.addEventListener('change', (e) => {
        lenseSeleted = lenseList.options[lenseList.selectedIndex].text;
    });
    
    console.log('listening to lense change', lenseSeleted);
    return listenToBtnClick();
}

//Listen to Btn click
function listenToBtnClick(){
    let btn = document.getElementById('btnOrder');
    console.log('hi');
    // btn.addEventListener('click', addToCart);
}

function addToCart(){
    console.log("Button clicked!");
};

// function addToCart() {
//     if(lenseSeleted != '') {
//         localStorage.setItem('name', myProducts.name);
//         localStorage.setItem('price', myProducts.price);
//         localStorage.setItem('lense', lenseSeleted);
//     } else {
//         window.alert('Please select lense');
//     }
// }

    // const element = document.getElementById("fruits");

    // const checkValue = element.options[element.selectedIndex].value;
    // const checkText = element.options[element.selectedIndex].text;

    // element.addEventListener("change", (e) => {
    //   const value = e.target.value;
    //   const text = element.options[element.selectedIndex].text;

    //   if (value) {
    //     document.getElementById("pick").textContent = `Value Selected: ${value}`;
    //   } else {
    //     document.getElementById("pick").textContent = "";
    //   }
    // });


    
    //Button "commander" should post data to "panier" page //
    //Add event listiner to button

    
        //Send lense and product data to local cache
        //Get lense data
        //listen to option change

//Go to cart.html

displayProducts();
