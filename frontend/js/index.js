const apiUrl = 'http://localhost:3000/api/cameras/';
const myProducts = { 
    productList: [],
};
let myProductsLength = 0;

//Get all product data from server, put string into myProducts//
const getProductData = async () => {
    const response = await fetch(apiUrl);
    const jsonProductData = await response.json();
    myProducts.productList = jsonProductData;
}

//Get length of products list (number of products)//
const getNumberOfProducts = async () => {
    await getProductData();
    myProductsLength = myProducts.productList.length;
}

// for each product in myProducts, create one card//
const createCards = async() => {
    await getNumberOfProducts();
    let myProductData = myProducts.productList;
    for (let i = 0; i < myProductsLength; i++) {
        const divProducts = document.getElementById('divProducts');
        const productImage = myProductData[i].imageUrl;
        const productId = myProductData[i]._id;
        const productName = myProductData[i].name;
        const productPrice = '€ ' + (Number(myProductData[i].price/100).toFixed(2));
        const product   = '<li class="col-6"><div class="card border-light"><img class="card-img-top" src="' 
                        + productImage 
                        + '" alt=""><div class="card-body px-0"><a class="text-decoration-none text-dark stretched-link" href="product.html?id=' 
                        + productId 
                        + '"><h3 id="productTitle" class="card-title h6 mb-1">'
                        + productName 
                        + '</h3></a><p id="productPrice" class="card-text">'
                        + productPrice 
                        + '</p></div></div></li>';
        divProducts.innerHTML += product;
    }
}

createCards();
