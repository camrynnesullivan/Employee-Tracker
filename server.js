//dependecies
//my sql
const mysql = require("mysql");
//inquirer
const inquirer = require("inquirer");
//console.table
const conTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "abundance26$",
  database: "employee_DB",
});
//connect prompt here:
connection.connect(function (err) {
  if (err) throw err;
  console.log("Welcome to the Employee Tracker");
  //start prompt
  start();
});

//Disply Commands for App
// Commands
function start() {
  inquirer
    .prompt([
      {
        name: "userAction",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View all the roles...",
          "View all the departments...",
          "View all the employees...",
          "View all employees by role...",
          "View all employees by department...",
          "View all employees by manager...",
          "Add an employee",
          "Add a role",
          "Add a department",
          "Update employee role",
          "Remove employee",
          "Remove role",
          "Remove department",
        ],
      },
    ])

    .then((userAnswer) => {
      switch (userAnswer.userAction) {
        case "View all the roles...":
          viewAllRoles();
          break;
        case "View all the departments...":
          viewAllDepartments();
          break;
        case "View all the employees...":
          viewAllEmployees();
          break;
        case "View all employees by role...":
          viewAllEmployeesByRole();
          break;
        case "View all employees by department...":
          viewAllEmployeesByDepartment();
          break;
        case "View all employees by manager...":
          viewAllEmployeesByManager();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Update employee role":
          updateEmployeeRole();
          break;
        case "Remove employee":
          removeEmployee();
          break;
        case "Remove role":
          removeRole();
          break;
        case "Remove department":
          removeDepartment();
          break;
        default:
          connection.end();
      }
    });

  function viewAllRoles() {
    connection.query("SELECT * FROM roles", function (err, res) {
      if (err) throw err;
      console.table(res);
    });
    start();
  }

  function viewAllDepartments() {
    connection.query("SELECT * FROM department", function (err, res) {
      if (err) throw err;
      console.table(res);
    });
    start();
  }

  function viewAllEmployees() {
    connection.query("SELECT * FROM employee", function (err, res) {
      if (err) throw err;
      console.table(res);
    });
    start();
  }

  function viewAllEmployeesByRole() {}
}

// * Add departments, roles, employees (addprompt)
//switch case
// * View departments, roles, employees
// * Update employee roles
//four deparatments - four functions
