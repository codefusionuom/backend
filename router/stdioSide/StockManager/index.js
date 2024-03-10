const express =require('express');
const { getGrnList } = require('../../../controller/studioSide/stockManager/grn');
const {createCategory,getCategory,getCategoryList,updateCategory,deleteCategory,searchCategory} = require('../../../controller/studioSide/stockManager/category');
const {getStockItem,getStockItemList,updateStockItem,createStockItem,deleteStockItem}= require('../../../controller/studioSide/stockManager/stockItem')
const {getSupplier,getSupplierList,updateSupplier,createSupplier,deleteSupplier} = require('../../../controller/studioSide/stockManager/suppliers')
const router = express.Router();



//Stock item
router.post("/stockItem",createStockItem );//create stock item
router.get("/stockItem",getStockItemList);//get stock item list
router.get("/stockItem/:itemId",getStockItem);//get stock item 
router.put("/stockItem/:id", updateStockItem);//update stock item
router.delete("/stockItem/:id",deleteStockItem );//delete stock item
router.get("/stockItem/?search/:id", );// search stock item

//GRN
// router.get("/grn/:page",getGrnList);//get grn list
// router.get("/grn/:id",getGrn);//get grn 
// router.put("/grn/:id",updateGrn );//update grn 
// router.post("/grn",createGrn );//create grn
// router.delete("/grn/:id",deleteGrn );//delete grn
// router.get("/grn/?search", );// search grn item

//Category
router.get("/categoryList",getCategoryList);//get category list
router.get("/category/:categoryId",getCategory);//get category 
router.put("/category/:id",updateCategory );//update category item
router.post("/category",createCategory );//create category
router.delete("/category/:id",deleteCategory );//delete category
router.get("/category/?search",searchCategory );// search category

// //payment
// router.get("/payment",getPaymentDetail )//get payment list
// router.get("payment/:id", getPayment)//get payment detail
// router.post("/payment", createPayment);//create payment
// router.get("/payment/?search", );// search payment


// //Return Stock item
// router.get("/returnStockItem/:page",getReturnStockItem);//get return stock item list
// router.put("/returnStockItem/:id",getReturnItemList );//update  return stock item
// router.post("/returnStockItem",updateReturnItem );//create return stock item
// router.delete("/returnStockItem/:id",createReturnItem );//delete return stock item
// router.get("/returnStockItem/?search/:id",deleteReturnItem );// search  return stock item

//supplier
router.get("/supplierList",getSupplierList);//get supplier list
router.get("/supplier/:supplierId",getSupplier );//get  supplier
router.put("/supplier/:id",updateSupplier );//update  supplier
router.post("/supplier", createSupplier);//create supplier
router.delete("/supplier/:id",deleteSupplier );//delete supplier
router.get("/supplier/?search/:id", );// search supplier

module.exports =router ;