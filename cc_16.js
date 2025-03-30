// product data

const productUrl = 'https://www.course-api.com/javascript-store-products';

// pricing for products

const CUSTOM_PRICES = {
    "high-back bench": 99.99,
    "albany table": 79.99,
    "accent chair": 50.00,
    "wooden table": 59.99,
    "dining table": 150
};

// Task 2: Fetch Products with .then()

function fetchProductsThen() {
    fetch(productUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(products => {
        console.log('Products with custom prices:');
        products.slice(0, 5).forEach(product => {
            const productName = product.fields.name.toLowerCase();
            const displayPrice = CUSTOM_PRICES[productName] || (product.fields.price / 100).toFixed(2);
            console.log(`${product.fields.name}: $${displayPrice}`);
        });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

// Task 3: Fetch Products with async/await

async function fetchProductsAsync() {
    try {
        const response = await fetch(productUrl);
        const products = await response.json();
        displayProducts(products);
    } catch(error) {
        handleError(error);
    }
}

// Task 4: Display the Products

function displayProducts(products) {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';
    
    // Display only the first 5 products with your custom prices
    products.slice(0, 5).forEach(product => {
        const productName = product.fields.name.toLowerCase();
        const apiPrice = (product.fields.price / 100).toFixed(2);
        const displayPrice = CUSTOM_PRICES[productName] || apiPrice;
        const isCustomPrice = CUSTOM_PRICES.hasOwnProperty(productName);

        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        // Product Image
        const imgDiv = document.createElement('div');
        imgDiv.className = 'product-image';
        const img = document.createElement('img');
        img.src = product.fields.image[0].thumbnails.small.url;
        img.alt = product.fields.name;
        img.width = 215;
        img.height = 215;
        imgDiv.appendChild(img);
        
        // Product Name
        const nameElement = document.createElement('h3');
        nameElement.className = 'product-header';
        nameElement.textContent = product.fields.name;
        
        // Product Price
        const priceElement = document.createElement('div');
        priceElement.className = 'product-price';
        priceElement.innerHTML = `$${displayPrice}`;
        
        // Add all elements to the card
        productCard.append(nameElement, priceElement, imgDiv);
        productContainer.appendChild(productCard);
    });
}

// Task 5: Reusable Error Handler

function handleError(error) {
    console.error("An error occurred: ", error);
    const container = document.getElementById('product-container');
    container.innerHTML = `
        <div class="error-message">
            Failed to load products. Please try again later.
            <small>${error.message}</small>
        </div>
    `;
}

// Task 6: Call Your Fetch Functions

fetchProductsThen();
fetchProductsAsync();