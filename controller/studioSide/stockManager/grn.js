const asyncHandler = require("express-async-handler");
const db = require("../../../config/db.config");
const grn = db.grns;

exports.createGrn = asyncHandler(async (req, res) => {
  try {
    //extract data from the request body
    const {
      itemName,
      amount,
      category,
      supplierName,
      quantity,
      discount,
      subtotal,
      date,
      description
    } = req.body;

    // create new grn in database
    const newGrn = await grn.create({
      
      itemName,
      amount,
      category,
      supplierName,
      quantity,
      discount,
      subtotal,
      date,
      description
    });

    res.status(201).json({
      success: true,
      message: "GRN item created successfully",
      grn: newGrn,
    });
  } catch (error) {
    console.log("Error creating GRN: ", error); 
    res.status(500).json({
      success: false,
      message: "Failed to create GRN",
      error: error.message,
    });
  }
});

exports.getGrn = asyncHandler(async (req, res) => {
  try {
    //extract the grn id from the request parameter
    const { id } = req.params;

    //find grn by grn id
    const foundGrn = await grn.findOne({ where: { id } });

    // if grn found,return
    if (foundGrn) {
      res.status(200).json({
        success: true,
        message: "GRN founded",
        grn: foundGrn,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Stock item not found",
      });
    }
  } catch (error) {
    console.log("Error fetching grn: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch grn",
      error: error.message,
    });
  }
});

exports.getGrnList = asyncHandler(async (req, res) => {
  try {
    const grnList = await grn.findAll();

    // if grn found,return
    if (grnList) {
      res.status(200).json({
        success: true,
        message: "GRN founded",
        grnList,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Stock item not found",
      });
    }
  } catch (error) {
    console.log("Error fetching grn: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch grn",
      
    });
  }
});

exports.updateGrn = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    //extract data from req body
    const {
      
      itemName,
      amount,
      category,
      supplierName,
      quantity,
      discount,
      subtotal,
      date,
      description
    } = req.body;

    let existingGrn = await grn.findOne({ where: { id } });

    if (existingGrn) {
      await grn.update(
        {
      
          itemName,
          amount,
          category,
          supplierName,
          quantity,
          discount,
          subtotal,
          date,
          description
        },    
        { where: { id } }
      );

      existingGrn = await grn.findOne({ where: { id } });

      res.status(200).json({
        success: true,
        message: "Grn Updated successfully",
        grn: existingGrn,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Grn not found",
      });
    }
  } catch (error) {
    console.log("Error updating grn", error);
    res.status(500).json({
      success: false,
      message: "Failed to update stock item",
    });
  }
});

exports.deleteGrn = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    //find the stock item by id
    const existingGrn = await grn.findOne({ where: { id } });

    if (existingGrn) {
      await grn.destroy({ where: { id } });

      res.status(200).json({
        success: true,
        message: " Grn deleted successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Grn not found",
      });
    }
  } catch (error) {
    console.log("Error deleting Grn:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Grn",
    });
  }
});
