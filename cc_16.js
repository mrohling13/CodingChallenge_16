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

