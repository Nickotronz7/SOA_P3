const {getConnection} = require("../database/connection");

// Function to query all the bills from the database
const getBills = async (request, response) => {
    try {
        // Get the connection
        const connection = await getConnection();
        // Make the SELECT query
        const [result] = await connection.query("SELECT creation_date, amount, description, employee_name, department FROM EMPLOYEE_BILLS");
        // Send the result
        response.json(result);
    } catch (error) {
        response.status(500);
        response.send(error);
    }
};

// Function to add a new bill to the database
const addBill = async (request, response) => {
    try {
        // Destructure the body parameters from the request
        const {creation_date, amount, description, employee_name, department} = request.body;
        // Get the request
        const connection = await getConnection();
        // Create a new object to be sended in the query
        const bill = {
            creation_date,
            amount,
            description,
            employee_name,
            department
        };
        // Make the INSERT
        await connection.query("INSERT INTO EMPLOYEE_BILLS SET ?", bill);
        // Send a message to the requester
        response.json({message: "New bill added"});
    } catch (error) {
        response.status(500);
        response.send(error);
    }
};

// Function to query all the bills by month, the total month amount and the top 3 departments (more bills)
const getMonthBills = async (request, response) => {
    try {
        // Create a new date object
        const date = new Date();
        // Get the month number
        const monthNumber = date.getMonth() + 1;
        // Get the connection
        const connection = await getConnection();
        // Make a query to fetch the employees by month number
        const [monthBills] = await connection.query('SELECT * FROM EMPLOYEE_BILLS WHERE MONTH(creation_date) = ?',[monthNumber]);
        // Make a query to get the most bills spent departments
        const [topDepartments] = await connection.query('SELECT department, SUM(amount) AS total_department FROM EMPLOYEE_BILLS GROUP BY department ORDER BY total_department DESC LIMIT 3');

        // Sum the total amount of the month
        let monthTotal = 0;
        monthBills.map((bill) => {
            monthTotal += bill.amount;
        });

        // Prepare a JSON object to be sent
        response.json({
            bills: monthBills,
            total: monthTotal,
            top3Departments: topDepartments
        });
    } catch (error) {
        response.status(500);
        response.send(error);
    }
};


module.exports = {
    getBills,
    addBill,
    getMonthBills
};