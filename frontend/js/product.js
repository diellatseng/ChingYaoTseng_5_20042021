let productId = getProductId();


//Get product id from url//
function getProductId() {
    return new URL(window.location.href).searchParams.get('id');
}



// function getProductData(productId) {
//     return fetch(`${apiUrl}/api/teddies/${productId}`)
//       .catch((error) => {
//         console.log(error)
//       })
//       .then((httpBodyResponse) => httpBodyResponse.json())
//       .then((productData) => productData)
//   }