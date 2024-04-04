//Swirl.fire are mainly used for the alert message , I used cdn of sweetalert
//To show these alert messages
//Swirl.fire{}

class Product {
    constructor(name, description, price, user,status) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.user = user;
        this.status=status;
    }
}
// Function to determine the status of a product based on some condition
function determineStatus(name, description, price) {
    // Example condition: If price is greater than $100, consider it online; otherwise, consider it offline
    return parseFloat(price) > 100 ? "InStock" : "Out Of Stock";
}

class ProductManager {
    constructor() {
        // Initialize product list from local storage or an empty array
        this.productList = JSON.parse(localStorage.getItem('products')) || [];
    }

    displayProducts() {
        // Get reference to the product list table
        const productTable = document.getElementById('product-list');
        // Clear previous data in the table
        productTable.innerHTML = '';

        // Loop through each product in the list
        this.productList.forEach((product, index) => {
    // Determine status class based on the product's status
     // Determine status based on the product's status
     const status = product.status;
     const statusClass = status === 'InStock' ? 'status-in-stock' : 'status-out-of-stock';
     const statusDotClass = status === 'InStock' ? 'dot-green' : 'dot-red';

            // Create HTML row for each product
            const row = `<tr>
            
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
                <td>
                <span class="status-dot ${statusDotClass}"></span>
                <span class="status-text ${statusClass}">${product.status}</span>
            </td>
                <td>
                    <div class="menu">
                        <div class="dot"></div>
                        <div class="options">
                            <div class="option" onclick="productManager.openEditProductModal(${index})"><i class="fas fa-edit"></i></div>
                            <div class="option" onclick="productManager.deleteProduct(${index})"><i class="fas fa-trash-alt"></i></div>
                        </div>
                    </div>
                </td>
            </tr>`;
            // Append the row to the table
            productTable.innerHTML += row;
        });
    }

    addProduct(name, description, price, user , status) {
        // Create a new product object
        const newProduct = new Product(name, description, price, user,status);
        // Add the new product to the list
        this.productList.push(newProduct);
        // Update the product list in local storage
        localStorage.setItem('products', JSON.stringify(this.productList));
        // Display success message
        this.showSuccessMessage('Added Product');
        // Refresh the displayed products
        this.displayProducts();
        // Close the add product modal
        this.closeAddProductModal();
    }

    deleteProduct(index) {
        // Display confirmation dialog before deleting the product
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to delete this product.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it',
            width: 'fit-content'
        }).then((result) => {
            if (result.isConfirmed) {
                // Remove the product at the specified index
                this.productList.splice(index, 1);
                // Update the product list in local storage
                localStorage.setItem('products', JSON.stringify(this.productList));
                // Refresh the displayed products
                this.displayProducts();
                // Display success message
                this.showSuccessMessage('Deleted Product');
            }
        });
    }

    showSuccessMessage(message) {
        // Display success message
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 1500,
            width: 'fit-content' // Set width to fit the content
        });
    }

   

    openEditProductModal(index) {
        // Retrieve the product at the specified index
        const product = this.productList[index];

        // Check if the product exists
        if (!product) {
            console.error("Product not found");
            return;
        }

        // Fill in the fields of the edit modal with the current product data
        const editProductNameInput = document.getElementById('editProductName');
        const editProductDescriptionInput = document.getElementById('editProductDescription');
        const editProductPriceInput = document.getElementById('editProductPrice');

        // Check if input elements exist
        if (!editProductNameInput || !editProductDescriptionInput || !editProductPriceInput) {
            console.error("One or more input elements not found");
            return;
        }

        // Set values for input fields
        editProductNameInput.value = product.name || '';
        editProductDescriptionInput.value = product.description || '';
        editProductPriceInput.value = product.price || '';

        // Save the index of the product being edited
        document.getElementById('editProductIndex').value = index;

        // Show the edit modal
        const modal = document.getElementById('edit-product-modal');
        if (modal) {
            modal.style.display = 'block';
        } else {
            console.error("Edit modal not found");
        }
    }
    openAddProductModal() {
        const modal = document.getElementById('add-product-modal');
        modal.style.display = 'block';
    }
    closeAddProductModal() {
        // Hide the add product modal
        const modal = document.getElementById('add-product-modal');
        modal.style.display = 'none';
    }

    closeEditProductModal() {
        // Hide the edit product modal
        const modal = document.getElementById('edit-product-modal');
        modal.style.display = 'none';
    }

    updateProduct() {
        const editProductName = document.getElementById('editProductName').value;
        const editProductDescription = document.getElementById('editProductDescription').value;
        const editProductPrice = document.getElementById('editProductPrice').value;
        const editProductIndex = document.getElementById('editProductIndex').value;
    
        // Determine the status based on the updated price
        const updatedStatus = determineStatus(editProductName, editProductDescription, editProductPrice);
    
        // Update the product's information
        this.productList[editProductIndex].name = editProductName;
        this.productList[editProductIndex].description = editProductDescription;
        this.productList[editProductIndex].price = editProductPrice;
        this.productList[editProductIndex].status = updatedStatus;
    
        // Update the product list in local storage
        localStorage.setItem('products', JSON.stringify(this.productList));
    
        // Refresh the displayed products
        this.displayProducts();
        this.closeEditProductModal();
    
        Swal.fire(
            'Updated!',
            'Product has been updated.',
            'success'
        );
    }
    
}

// Create an instance of ProductManager
const productManager = new ProductManager();

// Call the displayProducts method when the page is loaded
window.onload = function() {
    productManager.displayProducts();
};

// Event handler for adding a product
function addProduct() {
    // Get values from input fields
    const productName = document.getElementById('productName').value.trim();
    const productDescription = document.getElementById('productDescription').value.trim();
    const productPrice = document.getElementById('productPrice').value.trim();
    const loggedInUser = localStorage.getItem("loggedInUser");
    // const status = "Online";
   // Determine the status based on some condition
   const status = determineStatus(productName, productDescription, productPrice); // Example: Call a function to determine status

    // Debugging: Check the status value
    console.log("Status:", status);
    // Check if any of the fields are empty
    if (productName === "" || productDescription === "" || productPrice === "") {
        // Display error message if any field is empty
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please fill in all fields!",
        });
        return; // Exit function if any field is empty
    }

    productManager.addProduct(productName, productDescription, productPrice, loggedInUser, status);

}

// Event handler for opening the edit product modal
function openEditProductModal(index) {
    productManager.openEditProductModal(index);
}

// Event handler for closing the edit product modal
function closeEditProductModal() {
    productManager.closeEditProductModal();
}

// Event handler for deleting a product
function deleteProduct(index) {
    productManager.deleteProduct(index);
}

// Event handler for updating a product
function updateProduct() {
    productManager.updateProduct();
}

// Event handler for logging out
function logout() {
    // Clear the logged-in user from local storage
    Swal.fire({
        title: 'Are you sure?',
        text: 'You will be logged out.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, logout',
        width: 'fit-content'
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
