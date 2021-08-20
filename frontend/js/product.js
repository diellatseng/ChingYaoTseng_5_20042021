let productId = getProductId();

//Get product id from url//
function getProductId() {
    return new URL(window.location.href).searchParams.get('id');
}

// Fetch product data from server//
const getData = async () => {
    let response = await fetch('http://localhost:3000/api/cameras/' + productId);
    let jsonData = await response.json();
    return jsonData;
}

// Use data fetched from server //
const useData = async () => {
    let productData = await getData().then(jsonData => {
        return jsonData;
    })
    
    //Display title according to product name //
    document
        .getElementById('title')
        .textContent = 'Produit | ' + productData.name + ' - Orinoco France';

        //Display product image //
    document
        .getElementById("productImage")
        .innerHTML = `<img class="img-fluid" src="${productData.imageUrl}" alt="">`

    //Display product name //                
    document
        .getElementById('productName')
        .textContent = productData.name;
    
    //Display product price //
    document
        .getElementById('productPrice')
        .textContent += '€ ' + (Number(productData.price/100).toFixed(2));
    
    //Display product description //
    document
        .getElementById('description')
        .textContent = productData.description;

    //Display product lenses into option values //
    let lenses = productData.lenses;
    let lenseHtml ='<option selected>Choisissez votre lentille</option>';
    for (let lense of lenses) {
        lenseHtml += '<option>' + lense + '</option>';
    }
    document
        .getElementById('lenses')
        .innerHTML = lenseHtml;
    
    //Button "commander" should post data to "panier" page //
};

useData();
