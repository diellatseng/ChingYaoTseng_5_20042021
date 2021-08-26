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
        document
            .getElementById('title')
            .textContent = `Produit | ${myProducts.name} - Orinoco France`;
    
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
            .textContent += `€ ${(Number(myProducts.price/100).toFixed(2))}`;
        
        //Display product description //
        document
            .getElementById('description')
            .textContent = myProducts.description;
    
        //Display product lenses into option values //
        const lenses = myProducts.lenses;
        let lenseHtml = '<option>Choisissez votre lentille</option>'; //Adding default option to lense list
        for (let lense of lenses) {
            lenseHtml += `<option>${lense}</option>`;
        }
        document
            .getElementById('lenses')
            .innerHTML = lenseHtml;
    } catch(error) {
        window.alert(error);
        console.log(error);
    }
};

displayProducts();
