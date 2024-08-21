// Mahsulotlar ro'yxatini URL orqali olish
const apiUrl = 'https://raw.githubusercontent.com/diyor011/apibest/master/api.json';

async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return [];
    }
}

function renderProducts(products, filter) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    const filteredProducts = filter ? products.filter(p => p.desc1 === filter) : products;

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.pic}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.fulldesc}</p>
            <p class="price">$${product.price}</p>
        `;
        productList.appendChild(productCard);
    });
}

document.getElementById('filter').addEventListener('change', async (event) => {
    const filter = event.target.value;
    const products = await fetchProducts();
    renderProducts(products, filter);
});

// Initial render
(async function() {
    const products = await fetchProducts();
    renderProducts(products);
})();
