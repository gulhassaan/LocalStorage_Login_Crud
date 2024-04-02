// product_management.js
var loggedInUser = localStorage.getItem("loggedInUser"); // Retrieve logged-in username

// Retrieve products from local storage and display them
// script.js

function displayProducts() {
    var productList = JSON.parse(localStorage.getItem('products')) || [];
    var productTable = document.getElementById('product-list');
    productTable.innerHTML = ''; // Clear previous data

    // Add heading row
    var headingRow = `<div class="product-row">
        <div class="product-column"><strong>Name</strong></div>
        <div class="product-column"><strong>Description</strong></div>
        <div class="product-column"><strong>Price</strong></div>
        <div class="product-column"><strong>Actions</strong></div>
    </div>`;
    productTable.innerHTML += headingRow;

    productList.forEach(function(product, index) {
        var row = `<div class="product-row">
            <div class="product-column">${product.name}</div>
            <div class="product-column">${product.description}</div>
            <div class="product-column">${product.price}</div>
            <div id="edit_delete">
            <button id="edit_button" onclick="openEditProductModal(${index})"><i class="fas fa-edit"></i></button>
            <button onclick="deleteProduct(${index})"><i class="fas fa-trash-alt"></i></button>
        </div>
        </div>`;

        productTable.innerHTML += row;
    });
}

// Call the displayProducts function when the page is loaded
window.onload = function() {
    displayProducts();
};



// Add a new product
function addProduct() {
    var productName = document.getElementById('productName').value;
    var productDescription = document.getElementById('productDescription').value;
    var productPrice = document.getElementById('productPrice').value;
    var loggedInUser = localStorage.getItem("loggedInUser"); // Retrieve logged-in username

    var newProduct = {
        name: productName,
        description: productDescription,
        price: productPrice,
        
        user: loggedInUser // Include logged-in username in product data
    };

    var productList = JSON.parse(localStorage.getItem('products')) || [];
    productList.push(newProduct);
    localStorage.setItem('products', JSON.stringify(productList));

    displayProducts();
    closeAddProductModal();
}

// Delete a product
function deleteProduct(index) {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to delete this product.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it'
    }).then((result) => {
        if (result.isConfirmed) {
            var productList = JSON.parse(localStorage.getItem('products')) || [];
            productList.splice(index, 1);
            localStorage.setItem('products', JSON.stringify(productList));
            displayProducts();
            Swal.fire(
                'Deleted!',
                'Product has been deleted.',
                'success'
            );
        }
    });
}


// Open Add Product Modal
function openAddProductModal() {
    var modal = document.getElementById('add-product-modal');
    modal.style.display = 'block';
}

// Close Add Product Modal
function closeAddProductModal() {
    var modal = document.getElementById('add-product-modal');
    modal.style.display = 'none';
}

// Open Edit Product Modal
// Open Edit Product Modal
function openEditProductModal(index) {
    var productList = JSON.parse(localStorage.getItem('products')) || [];
    var product = productList[index];

    if (!product) {
        console.error("Product not found");
        return;
    }

    // Fill in the fields of the edit modal with the current product data
    var editProductNameInput = document.getElementById('editProductName');
    var editProductDescriptionInput = document.getElementById('editProductDescription');
    var editProductPriceInput = document.getElementById('editProductPrice');

    if (!editProductNameInput || !editProductDescriptionInput || !editProductPriceInput) {
        console.error("One or more input elements not found");
        return;
    }

    editProductNameInput.value = product.name || '';
    editProductDescriptionInput.value = product.description || '';
    editProductPriceInput.value = product.price || '';

    // Save the index of the product being edited
    document.getElementById('editProductIndex').value = index;

    // Show the edit modal
    var modal = document.getElementById('edit-product-modal');
    if (modal) {
        modal.style.display = 'block';
    } else {
        console.error("Edit modal not found");
    }
}

// Update Product
function updateProduct() {
    var editProductName = document.getElementById('editProductName').value;
    var editProductDescription = document.getElementById('editProductDescription').value;
    var editProductPrice = document.getElementById('editProductPrice').value;
    var editProductIndex = document.getElementById('editProductIndex').value;

    var productList = JSON.parse(localStorage.getItem('products')) || [];
    var editedProduct = {
        name: editProductName,
        description: editProductDescription,
        price: editProductPrice
    };

    productList[editProductIndex] = editedProduct;
    localStorage.setItem('products', JSON.stringify(productList));

    displayProducts();
    closeEditProductModal();
}


// Close Edit Product Modal
function closeEditProductModal() {
    var modal = document.getElementById('edit-product-modal');
    modal.style.display = 'none';
}

// Save Edited Product
function saveEditedProduct() {
    var index = document.getElementById('editProductIndex').value;
    var productName = document.getElementById('editProductName').value;
    var productDescription = document.getElementById('editProductDescription').value;
    var productPrice = document.getElementById('editProductPrice').value;

    var productList = JSON.parse(localStorage.getItem('products')) || [];
    var editedProduct = {
        name: productName,
        description: productDescription,
        price: productPrice
    };

    productList[index] = editedProduct;
    localStorage.setItem('products', JSON.stringify(productList));
    displayProducts();
    closeEditProductModal();
}

// Initial function call to display products when the page loads
displayProducts();


// Add this function to your product_management.js file


function logout() {
    // Clear the logged-in user from local storage
    Swal.fire({
        title: 'Are you sure?',
        text: 'You will be logged out.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, logout'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("loggedInUser");
            Swal.fire({
                title: 'Success!',
                text: 'Logged Out Successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = "login.html";
            });
        }
    });
}
