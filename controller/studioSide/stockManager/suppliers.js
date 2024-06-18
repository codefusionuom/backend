const asyncHandler = require("express-async-handler");
const db = require("../../../config/db.config");
const supplierModel = require("../../../model/stockManager/supplier.model");
const supplier = db.suppliers;

exports.createSupplier = asyncHandler(async (req, res) => {
  try {
    const {
      supplierName,

      contactNo,
      email,
      address,
    } = req.body;

    const newSupplier = await supplier.create({
      supplierName,

      contactNo,
      email,
      address,
    });

    res.status(201).json({
      success: true,
      message: "Supplier created successfully",
      supplier: newSupplier,
    });
  } catch (error) {
    console.error("Error creating supplier:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create supplier",
    });
  }
});

exports.getSupplier = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    // Find supplier by supplierId
    const foundSupplier = await supplier.findOne({ where: { id } });

    // If found return
    if (foundSupplier) {
      res.status(200).json({
        success: true,
        message: "Supplier Found",
        supplier: foundSupplier,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Supplier Not Found",
      });
    }
  } catch (error) {
    console.log("Error fetching supplier:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch supplier",
    });
  }
});

exports.getSupplierList = asyncHandler(async (req, res) => {
  try {
    const suppliers = await supplier.findAll();

    if (suppliers) {
      res.status(200).json({
        success: true,
        message: " Suppliers are found",
        suppliers,
      });
    } else {
      res.status(404).json({
        success: false,
        message: " No suppliers found ",
      });
    }
  } catch (error) {
    console.log("Error Fetching suppliers", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch suppliers",
    });
  }
});

exports.updateSupplier = asyncHandler(async (req, res) => {
  try {
    //get supplierId from the request parameter
    const { id } = req.params;

    //extract updated supplier data from the request body
    const {
      supplierName,

      contactNo,
      status,
    } = req.body;

    //find the supplier by id
    // let existingSupplier = await supplier.findOne({ where: { id }})

    console.log(supplierId);
    //if the supplier is found, update its attributes
    if (supplierId) {
      existingSupplier = await supplier.update(
        {
          supplierName,

          contactNo,
          status,
        },
        { where: { id } }
      );

      //fetch updated supplier from the database
      // existingSupplier = await supplier.findOne({ where: { id }})

      res.status(200).json({
        success: true, 
        message: "Supplier updated successfully",
        supplier: existingSupplier, 
      });
    }
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update category",
    });
  }
});

exports.deleteSupplier = asyncHandler(async (req, res) => {
  try {
    //get supplier id from the request parameters
    const { supplierId } = req.params;

    //find the supplier by id
    const existingSupplier = await supplier.findOne({ where: { supplierId } });

    //if the supplier exists, delete it
    if (existingSupplier) {
      await supplier.destroy({ where: { supplierId } });
      res.status(200).json({
        success: true,
        message: "Supplier deleted successfully",
      });
    } else {
      //if the category is not found
      res.status(404).json({
        success: false,
        message: "supplier not found",
      });
    }
  } catch (error) {
    console.log("Error deleting supplier", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete supplier",
    });
  }
});
