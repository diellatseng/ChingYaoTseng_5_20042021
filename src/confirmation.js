const myId = localStorage.getItem('orderId');
document.getElementById('orderId').textContent = ` ${myId}`;    // Display order id
console.log(`Order Id received from server: ${myId}`);
localStorage.removeItem('orderId');