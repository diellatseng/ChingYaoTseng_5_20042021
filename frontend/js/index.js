const apiUrl = 'http://localhost:3000/api/cameras/';
let myProducts = [];

//Get product data from server, store string into myProducts//
const getProductData = async () => {
    let response = await fetch(apiUrl);
    let jsonData = await response.json();
    myProducts = jsonData;
}

// For each product in myProducts, create one card//
const createProductCards = async() => {
    await getProductData();
    for (product of myProducts) {
        const divProducts   = document.getElementById('divProducts');
        const productPrice  = '€ ' + (Number(product.price/100).toFixed(2));
        const productHtml   = '<li class="col-6"><div class="card border-light"><img class="card-img-top" src="' 
                            + product.imageUrl
                            + '" alt=""><div class="card-body px-0"><a class="text-decoration-none text-dark stretched-link" href="/frontend/product.html?id=' 
                            + product._id
                            + '"><h3 id="productTitle" class="card-title h6 mb-1">'
                            + product.name
                            + '</h3></a><p id="productPrice" class="card-text">'
                            + productPrice 
                            + '</p></div></div></li>';
        divProducts.innerHTML += productHtml;
    }
}

createProductCards();
