const myForm = document.getElementById('myForm');
let orderId;

//When confirm order button clicked, execute the following:
myForm.addEventListener('submit', function (e) {
    e.preventDefault; //Prevent page redirecting

    //Take user inputs and convert them into an array of objects
    const contact = Array.from(document.querySelectorAll('#myForm input')).reduce((acc, input) => ({
        ...acc, [input.id]:input.value})
        , []);
    
    //Take id of each product and combine them into a string
    const products = dataInSessionStorage.reduce((products, product)=> {
        products.push(product.id);
            return products;            
        }, []);
    
    //Conbine contact and products into an array of objects
    const request = {contact, products};

    // Send request to API and get response from server
    const getData = async () => {
        const response = await fetch('http://localhost:3000/api/cameras/order', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });
        const jsonData = await response.json();
        orderId = jsonData.orderId;
        console.log(orderId);
    }
    // Remove current sessionStorage (products)
    // Save order Id into sessionStorage
    // Redirect to next page
    getData();
})

