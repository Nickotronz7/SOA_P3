require("dotenv").config({ path: "../.env" });
const mysql = require('mysql2/promise');
const { DBPORT, HOST, DATABASE, USER, PASSWORD } = process.env;

// Create a new connection to MySQL database instance using the ENV variables
const connection = mysql.createConnection({
    host: HOST,
    database: DATABASE,
    user: USER,
    password: PASSWORD,
    port: DBPORT
});

// Create a function to return the connection
// Because the connection is needed to make queries
const getConnection = () => {
    return connection;
}

// Function to initialize the data base with an empty table if neccessary
const initializeDB = async () => {
    try {
        const connection = await getConnection();
        connection.query("CREATE TABLE IF NOT EXISTS EMPLOYEE_BILLS(id int NOT NULL PRIMARY KEY AUTO_INCREMENT, creation_date DATE, amount DOUBLE, description VARCHAR(255), employee_name VARCHAR(255), department VARCHAR(255))");
        console.log("Data Base initialized with a table...");
    } catch (error) {
        console.log(error);
    }
};

// Excecute the init function
initializeDB();

// Export the connection to MySQL Data Base
module.exports = {
    getConnection
}
