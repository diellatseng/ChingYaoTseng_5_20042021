// - Confirm order button
// - Remove SessionStorage
const myForm = document.getElementById('myForm');

myForm.addEventListener('submit', function (e) {
    e.preventDefault;
    const data = Array.from(document.querySelectorAll('#myForm input'));
    
    console.log(data);

})
