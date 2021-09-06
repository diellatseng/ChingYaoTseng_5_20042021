const myId = localStorage.getItem('orderId');
document.getElementById('orderId').textContent = ` ${myId}`;
console.log(`Order Id received from server: ${myId}`);
localStorage.removeItem('orderId');