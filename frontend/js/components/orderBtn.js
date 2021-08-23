let lenseSeleted ='';

//Execute the following parts when the page is fully loaded
window.addEventListener('load', (event) => {

    // Listen to lense change
    function listenToLenseChange() {
        const lenseList = document.getElementById('lenses');
        lenseList.addEventListener('change', (e) => {
            lenseSeleted = lenseList.options[lenseList.selectedIndex].text;
            console.log('Current lense: ' + lenseSeleted);
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
            localStorage.setItem('name', myProducts.name);
            localStorage.setItem('price', myProducts.price);
            localStorage.setItem('lense', lenseSeleted);
            location.href = "cart.html"; //Go to cart.html
            console.log("Button clicked!");
        } else {
            window.alert('Please select lense');
            console.log("Button clicked, user needs to select a lense to proceed.");
        }
    }

    console.log('Page is fully loaded');
    listenToLenseChange();
  });
