let lenseSeleted ='';

//Execute the following codes when the page is fully loaded
window.addEventListener('load', (event) => {

    // Listen to lense change
    function listenToLenseChange() {
        const lenseList = document.getElementById('lenses');
        lenseList.addEventListener('change', (e) => {
            lenseSeleted = lenseList.options[lenseList.selectedIndex].text;
            console.log(`Current lense: ${lenseSeleted}`);
        });
        console.log('Listening to lense change');
        listenToBtnClick();
    }
    
    //Listen to button click
    function listenToBtnClick(){
        let btn = document.getElementById('btnOrder');
        btn.addEventListener('click', addToCart);
        console.log('Listening to button click');
    }
    
    //Send lense and product data to local cache
    function addToCart() {
        if(lenseSeleted != '') {
            //productSaved will be an empty array if there's no items in the cart yet
            const productSaved = JSON.parse(sessionStorage.getItem('products')) || [];  
            console.log(productSaved);

            const products = [
                ...productSaved, 
                {
                name: myProducts.name,
                price: myProducts.price
            }];
            sessionStorage.setItem('products', JSON.stringify(products));
            console.log(`Products saved in sessionStorage: ${sessionStorage.getItem('products')}`);
            //Go to cart.html
            location.href = "cart.html"; 
            console.log("Button clicked!");
        } else {
            window.alert('Please select lense');
            console.log("Button clicked, user needs to select a lense to proceed.");
        }
    }
    console.log('Page is fully loaded');
    listenToLenseChange();
  });
