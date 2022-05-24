const productsDal = require('../dal/products-dal');
const pushLogic = require('./push-logic')

async function getAllProducts() {
    let products = await productsDal.getAllProducts();
    return products;
}

async function addProduct(product) {
    validateProduct(product);
    let newProductId = await productsDal.addProduct(product);
    product.id = newProductId;
    let vacationJson = JSON.stringify(product);
    pushLogic.broadcast("add-or-edit-vacation",vacationJson);
    return newProductId;
  }
  
  async function editVacation(vacation) {
    validateProduct(vacation);
    let newVacationId = await productsDal.editVacation(vacation);
    // vacation.id = newVacationId;
    let vacationJson = JSON.stringify(vacation);
    pushLogic.broadcast("add-or-edit-vacation",vacationJson);
    return newVacationId;
}

async function deleteVacation(id) {
    await productsDal.deleteVacation(id);
    pushLogic.broadcast("delete-vacation",id);
}

const validateProduct = (vacation) => {
    if (vacation.name == "") {
      throw new Error("Name cannot be empty.");
    }

    if (vacation.name.length > 20) {
      throw new Error("Name is limited to 20 charecters.");
    }
    
    if (vacation.description == "") {
      throw new Error("Please describe the vacation.");
    }

    if (vacation.description.length > 1500) {
      throw new Error("Description is limited to 1500 charecters.");
    }
    
    if (vacation.price == 0) {
        throw new Error("Please enter a price.");
    }
    
    let format = /[^0-9]/g;
    if (format.test(vacation.price)) {
        throw new Error("Invalid price");
    }

    if (vacation.imgURL == "") {
      throw new Error("Please enter image URL.");
    }

    if (vacation.imgURL.length > 350) {
      throw new Error("Image URL is limited to 350 charecters.");
    }

    if (vacation.startDate == "") {
      throw new Error("Please enter a start date.");
    }
    
    if (vacation.endDate == "") {
      throw new Error("Invalid end date.");
    }
    
    if (vacation.startDate > vacation.endDate) {
      throw new Error("End value must be later the start date."); 
    }
  }

module.exports = {
    getAllVacations: getAllProducts,
    addVacation: addProduct,
    editVacation,
    deleteVacation
}