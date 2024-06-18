const express = require('express');
const { createCategory, getCategory, getCategoryList, updateCategory, deleteCategory, searchCategory } = require('../../../controller/studioSide/stockManager/category');
const { getStockItem, getStockItemList, updateStockItem, createStockItem, deleteStockItem } = require('../../../controller/studioSide/stockManager/stockItem');
const { getSupplier, getSupplierList, updateSupplier, createSupplier, deleteSupplier } = require('../../../controller/studioSide/stockManager/suppliers');
const { getGrn, getGrnList, updateGrn, createGrn, deleteGrn } = require('../../../controller/studioSide/stockManager/grn');
const { getPayment, getPaymentDetails, createPayment, deletePayment } = require("../../../controller/studioSide/stockManager/payment");
const { getReturnStockItem, getReturnItemList, createReturnItem, deleteReturnItem, updateReturnItem } = require("../../../controller/studioSide/stockManager/returnStockItem");
const router = express.Router();

// Stock item
router.post("/stockItem", createStockItem); // create stock item
router.get("/stockItem", getStockItemList); // get stock item list
router.get("/stockItem/:id", getStockItem); // get stock item 
router.put("/stockItem/:id", updateStockItem); // update stock item
router.delete("/stockItem/:id", deleteStockItem); // delete stock item

// GRN
router.get("/grn", getGrnList); // get grn list
router.get("/grn/:id", getGrn); // get grn 
router.put("/grn/:id", updateGrn); // update grn 
router.post("/grn", createGrn); // create grn
router.delete("/grn/:id", deleteGrn); // delete grn

// Category
router.get("/categoryList", getCategoryList); // get category list 
router.get("/category/:categoryId", getCategory); // get category 
router.put("/category/:id", updateCategory); // update category item
router.post("/category", createCategory); // create category
router.delete("/category/:id", deleteCategory); // delete category

// Supplier
router.get("/supplierList", getSupplierList); // get supplier list
router.get("/supplier/:id", getSupplier); // get  supplier
router.put("/supplier/:id", updateSupplier); // update  supplier
router.post("/supplier", createSupplier); // create supplier
router.delete("/supplier/:supplierId", deleteSupplier); // delete supplier

// Payment 
router.get("/payment", getPayment); // get payment list
router.get("/payment/:id", getPaymentDetails); // get payment detail
router.post("/payment", createPayment); // create payment  
router.delete("/payment/:id", deletePayment); // delete payment

// Return Stock item
router.get("/returnStockItem/:id", getReturnStockItem); 
router.get("/returnStockItem", getReturnItemList); // get return stock item list
router.put("/returnStockItem/:id", updateReturnItem); // update  return stock item
router.post("/returnStockItem", createReturnItem); // create return stock item
router.delete("/returnStockItem/:id", deleteReturnItem); // delete return stock item
  
module.exports = router; 
    