// main.js

// Cargar productos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
});

// Obtener productos del local storage
function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

// Guardar productos en el local storage
function setProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Generar un ID único para cada producto
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Agregar un nuevo producto
function addProduct() {
    const name = document.getElementById('productName').value;
    const quantity = document.getElementById('productQuantity').value;
    const description = document.getElementById('productDescription').value;
    const category = document.getElementById('productCategory').value;

    // Verificar que todos los campos estén llenos
    if (!name || !quantity || !description || !category) {
        showMessage('Por favor, complete todos los campos', 'error');
        return;
    }

    const id = generateId();
    const products = getProducts();
    products.push({ id, name, quantity, description, category });
    setProducts(products);
    displayProducts();
    showMessage('Producto agregado', 'success');
}

// Modificar un producto existente
function updateProduct() {
    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value;
    const quantity = document.getElementById('productQuantity').value;
    const description = document.getElementById('productDescription').value;
    const category = document.getElementById('productCategory').value;

    // Verificar que todos los campos estén llenos
    if (!id || !name || !quantity || !description || !category) {
        showMessage('Por favor, complete todos los campos', 'error');
        return;
    }

    let products = getProducts();
    products = products.map(product => product.id === id ? { id, name, quantity, description, category } : product);
    setProducts(products);
    displayProducts();
    showMessage('Producto modificado', 'success');
}

// Borrar un producto
function deleteProduct() {
    const id = document.getElementById('productId').value;

    // Verificar que el ID esté lleno
    if (!id) {
        showMessage('Por favor, seleccione un producto para borrar', 'error');
        return;
    }

    let products = getProducts();
    products = products.filter(product => product.id !== id);
    setProducts(products);
    displayProducts();
    showMessage('Producto borrado', 'success');
}

// Mostrar productos en la lista
function displayProducts() {
    const products = getProducts();
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - ${product.quantity} - ${product.description} - ${product.category}`;
        li.setAttribute('data-id', product.id);
        li.onclick = () => loadProduct(product.id);
        productList.appendChild(li);
    });
}

// Cargar producto en el formulario para modificar o borrar
function loadProduct(id) {
    const products = getProducts();
    const product = products.find(product => product.id === id);
    if (product) {
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productQuantity').value = product.quantity;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productCategory').value = product.category;
    }
}

// Mostrar mensaje de acción
function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.style.color = type === 'error' ? 'red' : 'green';
    setTimeout(() => messageDiv.textContent = '', 3000);
}