const productsDal = require('../dal/products-dal');
const pushLogic = require('./push-logic')

async function getAllProducts() {
    let products = await productsDal.getAllProducts();
    return products;
}

async function getAllProductsFromCategory(categoryId) {
    let products = await productsDal.getAllProductsFromCategory(categoryId);
    return products;
}

async function searchProduct(searchString) {
    let products = await productsDal.searchProduct(searchString);
    return products;
}

async function addProduct(product) {
    validateProduct(product);
    let newProductId = await productsDal.addProduct(product);
    product.id = newProductId;
    // let productJson = JSON.stringify(product);
    // pushLogic.broadcast("add-or-edit-vacation",productJson);
    return newProductId;
  }
  
  async function editProduct(product) {
    validateProduct(product);
    await productsDal.editProduct(product);
    // vacation.id = newVacationId;
    // let vacationJson = JSON.stringify(product);
    // pushLogic.broadcast("add-or-edit-vacation",vacationJson);
    // return newVacationId;
}

async function deleteProduct(id) {
    await productsDal.deleteProduct(id);
    // pushLogic.broadcast("delete-vacation",id);
}

const validateProduct = (product) => {
    if (product.name == "") {
      throw new Error("Name can not be empty.");
    }

    if (product.categoryId == "") {
      throw new Error("Select a category.");
    }

    if (product.name.length > 20) {
      throw new Error("Name is limited to 20 charecters.");
    }
    
    if (product.price <= 0) {
        throw new Error("Invalid price.");
    }
    
    if (product.imgUrl == "") {
      throw new Error("Please enter image URL.");
    }

    if (product.imgUrl.length > 350) {
      throw new Error("Image URL is limited to 350 charecters.");
    }
  }

module.exports = {
    getAllProducts,
    getAllProductsFromCategory,
    searchProduct,
    addProduct,
    editProduct,
    deleteProduct
}