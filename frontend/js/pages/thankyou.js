const myId = sessionStorage.getItem('OrderId');
document
.getElementById('orderId')
.textContent = ` ${myId}`;
