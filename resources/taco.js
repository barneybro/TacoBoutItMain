// Menu Items
const appetizers = [
    { name: 'Onion Rings', price: 8 },
    { name: 'Mozzarella Sticks', price: 6 },
    { name: 'Spinach & Artichoke Dip', price: 5.50 },
    { name: 'Empanadas', price: 3.45 },
    { name: 'Quesadilla Bites', price: 4.45 },
];

const tacos = [
    { name: 'Taco Salad', price: 8 },
    { name: 'Taco Supreme', price: 10 },
    { name: 'Soft Taco', price: 4.55 },
    { name: 'Vegan Taco', price: 8.50 },
    { name: 'Fish Taco', price: 1.30 },
    { name: 'Tacos From Outer-Space', price: 6.80 },
];

const entrees = [
    { name: 'Salmon Ravioli', price: 12 },
    { name: 'Chicken Chicken Chicken What Combo Are you Pickin\'', price: 15 },
    { name: 'Enchiladas', price: 10.30 },
    { name: 'Chimichanga', price: 18.25 },
    { name: 'TacoBoutIT Bread Bowl', price: 11.50 },
];

const desserts = [
    { name: 'Salmon Dessert', price: 7.99 },
    { name: 'Chocolate Surprise', price: 5.85 },
    { name: 'Churro', price: 1.50 },
    { name: 'Fried Iced Cream', price: 5.35 },
    { name: 'Choco Taco', price: 5.00 },
    { name: 'Tres Leches Cake', price: 6.90 },
];

const drinks = [
    { name: 'Soda', price: 2 },
    { name: 'Iced Tea', price: 3 },
    { name: 'Raspberry Lemonade', price: 2.50 },
    { name: 'Horchata', price: 4.95 },
    { name: 'Mexican Coke', price: 4.00 },
    { name: 'Corona Lite', price: 1.50 },
    { name: 'Water', price: 0.00 },
];

// Global array to store cart items
const cartItems = [];

document.addEventListener('DOMContentLoaded', function () {
    // Function to generate the menu based on category
    function generateMenu(category, containerId, categoryName) {
        const menuContainer = document.getElementById(containerId);

        // Add an H2 element for the category
        const categoryHeading = document.createElement('h2');
        categoryHeading.textContent = categoryName;
        categoryHeading.classList.add('category');
        menuContainer.appendChild(categoryHeading);

        // Generate menu items for the category
        category.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.classList.add('item-container');

            menuItem.innerHTML = `
                <ul class="menu-block">
                    <li class="menu-item">
                        <span>${item.name}</span>
                        <span>$${item.price.toFixed(2)}<button class="pushable-add"><span class="front-add"> + </span></button></span> 
                    </li>
                </ul>
            `;

            menuItem.querySelector('.pushable-add').addEventListener('click', () => addToCart(item.name, item.price));
            menuContainer.appendChild(menuItem);
        });
    }

    // Function to add an item to the cart
    function addToCart(name, price) {
        const cartItemIndex = cartItems.findIndex(item => item.name === name);

        if (cartItemIndex !== -1) {
            // If the item is already in the cart, increment quantity
            cartItems[cartItemIndex].quantity++;
        } else {
            // If the item is not in the cart, add a new item
            cartItems.push({ name, price, quantity: 1 });
        }

        // Update total value
        updateTotalValue();

        // Update cart display
        displayCartItems();
    }

    // Function to list the total value of items in the cart
    function updateTotalValue() {
        const totalValueElement = document.getElementById('total-value');

        let totalValue = 0;

        // Calculate total value by iterating through cart items
        cartItems.forEach(item => {
            totalValue += item.price * item.quantity;
        });

        // Round the total value to two decimal places
        totalValue = parseFloat(totalValue.toFixed(2));

        // Update the HTML element displaying total value
        totalValueElement.textContent = totalValue.toFixed(2);
    }

    // Function to display cart items
    function displayCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');

        // Clear the existing content
        cartItemsContainer.innerHTML = '';

        // Iterate through cart items and create HTML elements
        cartItems.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;

            // Add a button to remove the item from the cart
            const removeButton = document.createElement('button');
            removeButton.textContent = 'x';
            removeButton.addEventListener('click', () => removeCartItem(item));

            cartItem.appendChild(removeButton);
            cartItemsContainer.appendChild(cartItem);
        });
    }

    // Function to remove an item from the cart
    function removeCartItem(item) {
        // Set the quantity to zero
        item.quantity = 0;

        // Update total value
        updateTotalValue();

        // Update cart display
        displayCartItems();
    }

    // Generate the menu for each category
    generateMenu(appetizers, 'menu', 'Appetizers');
    generateMenu(tacos, 'menu', 'Tacos');
    generateMenu(entrees, 'menu', 'Entrees');
    generateMenu(desserts, 'menu', 'Desserts');
    generateMenu(drinks, 'menu', 'Drinks');
});

function addItem() {
    const category = document.getElementById('category').value;
    const itemName = document.getElementById('itemName').value;
    const itemPrice = parseFloat(document.getElementById('itemPrice').value);

    if (category && itemName && !isNaN(itemPrice)) {
        const categoryArray = getCategoryArray(category);
        const result = findItem(categoryArray, itemName, itemPrice);

        if (result.found) {
            if (result.differentPrice) {
                // Removes the existing item with a different price and changes the price to the new value
                categoryArray.splice(result.index, 1);
                addNewItem(category, itemName, itemPrice);
            } else {
                // Item added is identical to an existing item.
                alert('Error. This item already exists.');
            }
        } else {
            // Add a new item to the selected category
            addNewItem(category, itemName, itemPrice);
        }

        updateMenu();
    }

    // Resets the input values to default after adding an item
    document.getElementById('itemName').value = '';
    document.getElementById('itemPrice').value = '';
}

function addNewItem(category, itemName, itemPrice) {
    const categoryArray = getCategoryArray(category);
    const newItem = { name: itemName, price: itemPrice };
    categoryArray.push(newItem);
}

function getCategoryArray(category) {
    category = category.toLowerCase().trim()

    switch (category) {
        case 'appetizers':
            return appetizers;
        case 'tacos':
            return tacos;
        case 'entrees':
            return entrees;
        case 'desserts':
            return desserts;
        case 'drinks':
            return drinks;
        default:
            return [];
    }
}

// Function to remove an item from a category
function removeItem(category, index) {
    const categoryArray = getCategoryArray(category);
    categoryArray.splice(index, 1);
    updateMenu();
}

function updateMenu() {
    const menuContainer = document.getElementById('menuContainer');
    menuContainer.innerHTML = '';

    // Array of categories
    const categories = [appetizers, tacos, entrees, desserts, drinks];

    categories.forEach((categoryArray, categoryIndex) => {
        const categoryContainer = document.createElement('div');
        categoryContainer.className = 'menu-category';

        const categoryHeader = document.createElement('h3');
        categoryHeader.className = 'category-header';
        categoryHeader.textContent = getCategoryName(categoryIndex);
        categoryContainer.appendChild(categoryHeader);

        const categoryItemsContainer = document.createElement('div');
        categoryItemsContainer.className = 'category-items';

        categoryArray.forEach((item, index) => {
            const menuItemElement = document.createElement('div');
            menuItemElement.className = 'menu-item-manager';
            menuItemElement.innerHTML = `
                <div class="item-name">${item.name}</div>
                <div class="dotted-line"></div>
                <div class="price">$${item.price.toFixed(2)}</div>
                <span class="delete-icon" onclick="removeItem('${getCategoryName(categoryIndex)}', ${index})">&#10006;</span>
            `;
            categoryItemsContainer.appendChild(menuItemElement);
        });

        categoryContainer.appendChild(categoryItemsContainer);
        menuContainer.appendChild(categoryContainer);
    });
}

function findItem(category, itemName, itemPrice) {
    const index = category.findIndex(item => item.name === itemName);
    const found = index !== -1;
    const differentPrice = found && category[index].price !== itemPrice;
    return { index, found, differentPrice };
}

// Function to get category name based on index
function getCategoryName(index) {
    const categoryNames = ['Appetizers', 'Tacos', 'Entrees', 'Desserts', 'Drinks'];
    return categoryNames[index];
}




// Initial update
updateMenu();

        

// Function to generate HTML content for the receipt
function generateReceiptContent() {
    const receiptContent = document.getElementById('receiptContent');
    receiptContent.innerHTML = '';

    cartItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
        receiptContent.appendChild(itemDiv);
    });

    // Calculate and display total
    const totalValue = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    document.getElementById('receiptTotal').textContent = totalValue.toFixed(2);
}

function openCartPopup1() {
    const overlay = document.getElementById('overlay');
    const cartPopup1 = document.getElementById('cartPopup1');

    overlay.style.display = 'block';
    cartPopup1.style.display = 'block';
}

function closeCartPopup1() {
    const overlay = document.getElementById('overlay');
    const cartPopup1 = document.getElementById('cartPopup1');

    overlay.style.display = 'none';
    cartPopup1.style.display = 'none';
}

function openReceiptPopup() {
    const overlay = document.getElementById('overlay');
    const receiptPopup = document.getElementById('receiptPopup');

    overlay.style.display = 'block';
    receiptPopup.style.display = 'block';

    // Generate and display receipt content
    generateReceiptContent();
}

function closeReceiptPopup() {
    const overlay = document.getElementById('overlay');
    const receiptPopup = document.getElementById('receiptPopup');

    overlay.style.display = 'none';
    receiptPopup.style.display = 'none';
}

function openCardPaymentPopup() {
    const overlay = document.getElementById('overlay');
    const cardPaymentPopup = document.getElementById('cardPaymentPopup');

    overlay.style.display = 'block';
    cardPaymentPopup.style.display = 'block';
}

function closeCardPaymentPopup() {
    const overlay = document.getElementById('overlay');
    const cardPaymentPopup = document.getElementById('cardPaymentPopup');

    overlay.style.display = 'none';
    cardPaymentPopup.style.display = 'none';
}

// Function to handle payment selection
function selectPayment(paymentType) {
    if (paymentType === 'Card') {
        openCardPaymentPopup();
        closeCartPopup1();
    } else if (paymentType === 'PayAtStore') {
        openReceiptPopup();
        closeCartPopup1();
    }
}
function processCardPayment() {
    const cardHolderName = document.getElementById('cardHolderName').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const expirationDate = document.getElementById('expirationDate').value;

 
    closeCardPaymentPopup();
    openReceiptPopup();
}







const login = [
    {
        "username": "admin",
        "password": "admin"
    },
];

