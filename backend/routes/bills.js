const { Router } = require('express');
const router = Router();
const { getBills, addBill, getMonthBills } = require("../controllers/bills");

// Define the routes METHODS
router.get("/all", getBills);
router.post("/new", addBill);
router.get("/month", getMonthBills);

// Export the router
module.exports = router;