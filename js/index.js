const api_url = 'http://localhost:3000/api/teddies/';

fetch (api_url)
    .then(res => {
        if(res.ok) {
            return res.json()
        } else {
            console.log('Error')
        }
    })
    //function to create product cards//
    .then(productData => {
        //get number of products//
        let dataLength = productData.length;
        //for each product data, create one card//
        for (let i = 0; i < dataLength; i++) {
            const products = document.getElementById('products');
            const productImage = productData[i].imageUrl;
            const productId = productData[i]._id;
            const productName = productData[i].name;
            const productPrice = '€ ' + (Number(productData[i].price/100).toFixed(2));
            const product   = '<div class="col-6"><div class="card border-light"><img class="card-img-top" src="' 
                            + productImage 
                            + '" alt=""><div class="card-body px-0"><a class="text-decoration-none text-dark stretched-link" href="/product/' 
                            + productId 
                            + '.html"><h3 id="productTitle" class="card-title h6 mb-1">'
                            + productName 
                            + '</h3></a><p id="productPrice" class="card-text">'
                            + productPrice 
                            + '</p></div></div></div>';
            products.innerHTML += product;
        }
    })