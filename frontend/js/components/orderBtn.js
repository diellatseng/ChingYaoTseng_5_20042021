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
            sessionStorage.setItem('name', myProducts.name);
            sessionStorage.setItem('price', myProducts.price);
            sessionStorage.setItem('lense', lenseSeleted);
            sessionStorage.setItem('imageUrl', myProducts.imageUrl);
            countBtnClicks();
            location.href = "cart.html"; //Go to cart.html
            console.log("Button clicked!");
        } else {
            window.alert('Please select lense');
            console.log("Button clicked, user needs to select a lense to proceed.");
        }
    }

    //Count button clicks
    function countBtnClicks() {
        if (sessionStorage.getItem('clicks') == '') {
            let i = 0;
            i++;
            sessionStorage.setItem('clicks', i);
        } else {
            let i = sessionStorage.getItem('clicks');
            i++;
            sessionStorage.setItem('clicks', i);
        }
    }

    console.log('Page is fully loaded');
    listenToLenseChange();
  });
