import {apiUrl} from '../src/utils/variables';

const getData = async () => {                           // Get product data from server, store string into myProducts
    let response = await fetch(apiUrl);
    let jsonData = await response.json();
    return jsonData;
}

const displayProducts = async() => {                    // For each product in myProducts, create one card
    try {
        const myProducts = await getData();
        const divProducts   = document.getElementById('divProducts');
        for (let product of myProducts) {
            const productPrice  = `€ ${(Number(product.price/100).toFixed(2))}`;
            const productHtml   = `
            <li class="col-6">
                <div class="card border-light">
                    <img class="card-img-top" src="${product.imageUrl}" alt="">
                    <div class="card-body px-0">
                        <a class="text-decoration-none text-dark stretched-link" href="./pages/product.html?id=${product._id}">
                            <h3 id="productTitle" class="card-title h6 mb-1">
                                ${product.name}
                            </h3>
                        </a>
                        <p id="productPrice" class="card-text">
                            ${productPrice}
                        </p>
                    </div>
                </div>
            </li>`
            divProducts.innerHTML += productHtml;
        }
    } catch(error) {
        window.alert(error);
        console.log(error);
    }
}

displayProducts();