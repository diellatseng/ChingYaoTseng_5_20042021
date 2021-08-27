const myForm = document.getElementById('myForm');
let orderId;

//Listening to confirm order button
myForm.addEventListener('submit', function(e) {
    e.preventDefault(); //Prevent default action when button is clicked 
    getData();
});

// Send request to API and get response from server
const getData = async () => {
    //Take user inputs in form and convert them into an array of objects
    const contact = Array.from(document.querySelectorAll('#myForm input')).reduce((acc, input) => ({
        ...acc, [input.id]:input.value})
        , []);
    console.log('Contact data get.');
    
    //Take id of each product and combine them into a string
    const products = dataInSessionStorage.reduce((products, product)=> {
        products.push(product.id);
        return products;  // is return causing jumping out of codes? 
    }, []);
    console.log('Product IDs get.');
    
    //Conbine contact and products into an array of objects
    const request = {contact, products};
    console.log('Sending request...')
    const response = await fetch('http://localhost:3000/api/cameras/order', {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    });
    const jsonData = await response.json();
    orderId = jsonData.orderId;
    console.log(`Request sent successful. Server response: Order ID ${orderId}`);
    
    // Remove current sessionStorage (products)
    sessionStorage.removeItem('products');
    console.log(`sessionStorage: "products" removed.`);
    
    // Save order Id into sessionStorage
    sessionStorage.setItem('orderId', orderId);
    console.log(`sessionStorage: "orderId" added.`);

    // Redirect to Thank You page
    console.log('Redirecting to Thank You page.')
    location.href = "../../frontend/thankYou.html"; 
}