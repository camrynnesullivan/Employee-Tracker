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
          "Add an employee",
          "Add a role",
          "Add a department",
          "Update employee role",
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
        default:
          connection.end();
      }
    });

  //VIEW ALL ROLES================================================================
  function viewAllRoles() {
    connection.query("SELECT * FROM roles", function (err, res) {
      if (err) throw err;
      console.table(res);
    });
    start();
  }
  // VIEW ALL DEPARTMENTS========================================================
  function viewAllDepartments() {
    connection.query("SELECT * FROM department", function (err, res) {
      if (err) throw err;
      console.table(res);
    });
    start();
  }

  //VIEW ALL EMPLOYEES ============================================================
  function viewAllEmployees() {
    connection.query("SELECT * FROM employee", function (err, res) {
      if (err) throw err;
      console.table(res);
    });
    start();
  }

  //ADD EMPLOYEE========================================================================
  function addEmployee() {
    // Questions being asked for the user
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the first name of the employee?",
          name: "firstName",
        },
        {
          type: "input",
          message: "What is the last name of the employee?",
          name: "lastName",
        },
        {
          type: "input",
          message: "What is the employees role id number?",
          name: "roleID",
        },
        {
          type: "input",
          message: "What is the manager id number?",
          name: "managerID",
        },
      ])
      .then(function (answer) {
        // query implementation

        let query = `INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES ('${answer.firstName}', '${answer.lastName}', ${answer.roleID}, ${answer.managerID})`;

        if (answer.managerID === "") {
          query = `INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES ('${answer.firstName}', '${answer.lastName}', ${answer.roleID}, null)`;
        }
        connection.query(query, function (err, res) {
          if (err) throw err;
          console.table(res);
          start();
        });
      });
  }

  //ADD ROLE===================================================================
  function addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the role?",
          name: "roleName",
        },
        {
          type: "input",
          message: "What is the salary for the role?",
          name: "salaryTotal",
        },
        {
          type: "input",
          message: "In which department should we place this role?",
          name: "departmentID",
        },
      ])
      .then(function (answer) {
        connection.query(
          "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
          [answer.roleName, answer.salaryTotal, answer.departmentID],
          function (err, res) {
            if (err) throw err;
            console.table(res);
            start();
          }
        );
      });
  }

  //ADD DEPARTMENT==============================================================
  function addDepartment() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the department you would like to add?",
          name: "departmentName",
        },
      ])
      .then((answer) => {
        connection.query(
          "INSERT INTO department (name) VALUES (?)",
          [answer.departmentName],
          function (err, res) {
            if (err) throw err;
            console.table(res);
            start();
          }
        );
      });
  }
}
//UPDATE EMPLOYEE ROLE=================================================================
