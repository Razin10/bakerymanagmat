// HTML elements
const customerNameInput = document.getElementById('customerName');
const orderItemsInput = document.getElementById('orderItems');
const quantityInput = document.getElementById('quantity');
const orderDateInput = document.getElementById('orderDate');
const orderForm = document.getElementById('orderForm');
const orderList = document.getElementById('orderList');
const searchOrderIDInput = document.getElementById('searchOrderID');

// Order data
let orders = [];

// Function to generate order ID
function generateOrderID() {
  // Implement a unique ID generation algorithm
  return 'ORDER-' + Math.random().toString(36).substr(2, 9);
}

// Function to add a new order
function addOrder() {
  const orderID = generateOrderID();
  const order = {
    id: orderID,
    customerName: customerNameInput.value,
    orderItems: orderItemsInput.value,
    quantity: quantityInput.value,
    orderDate: orderDateInput.value
  };

  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));

  // Update the order list display
  displayOrders();

   // Clear input fields
   customerNameInput.value = '';
   orderItemsInput.value = '';
   quantityInput.value = '';
   orderDateInput.value = '';
}

// Function to display orders
function displayOrders() {
  orderList.innerHTML = '';

  orders.forEach(order => {
    const li = document.createElement('li');
    li.textContent = `${order.id}: ${order.customerName} - ${order.orderItems}`;
    orderList.appendChild(li);
  });
}

// Function to handle order updates (implement later)


// Function to search for orders by order ID
function searchOrder() {
  const searchTerm = searchOrderIDInput.value.toUpperCase();
  orderList.innerHTML = ''; // প্রতিবার সার্চে তালিকা পরিষ্কার করা

  let found = false;
  orders.forEach(order => {
    const orderID = order.id.toUpperCase();
    if (orderID.includes(searchTerm)) {
      found = true;
      const li = document.createElement('li');
      li.textContent = `${order.id}: ${order.customerName} - ${order.orderItems}`;
      orderList.appendChild(li);
    }
  });

  if (!found) {
    const li = document.createElement('li');
    li.textContent = "Order not found";
    orderList.appendChild(li);
  }
}


// Event listeners
orderForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addOrder();
});

// Load existing orders from local storage
const storedOrders = localStorage.getItem('orders');
if (storedOrders) {
  orders = JSON.parse(storedOrders);
  displayOrders();
}



function exportToText() {
  const orderList = document.getElementById('orderList');
  const orderItems = orderList.querySelectorAll('li');
  let textData = '';

  orderItems.forEach(item => {
    textData += item.textContent + '\n';
  });

  // make a blob of the order
  const blob = new Blob([textData], { type: 'text/plain' });

  // make a download link
  const link = document.createElement('a');
  link.download = 'orders.txt';
  link.href = URL.createObjectURL(blob);
  link.click();
}

// Function to delete all orders from local storage
function deleteAllOrders() {
  localStorage.removeItem('orders');
  orders = [];
  displayOrders();
}

// Add a button to delete all orders
const deleteAllButton = document.createElement('button');
deleteAllButton.textContent = 'Delete All Orders';
deleteAllButton.addEventListener('click', deleteAllOrders);
orderList.appendChild(deleteAllButton);