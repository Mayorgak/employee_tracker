const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const express = require ("express");


const connectionProperties = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Gogie000",
  database: "employee_DB",
};


// Creating Connection
const connection = mysql.createConnection(connectionProperties);


// Establishing Connection to database
connection.connect((err) => {
    if (err) throw err;
  
    // Start main menu function

    console.log("\n WELCOME TO EMPLOYEE TRACKER \n");
    mainMenu();
});


function mainMenu() {
 
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "MAIN MENU",
      choices: [
        "View all employees",
        "View all roles",
        "View all departments",
        "Add employee",
        "Add role",
        "Add department",
        "Update employee role",
        "Delete employee",
        "Delete role",
        "Delete department",
      ],
    })
    .then((answer) => {
  
      switch (answer.action) {
        case "View all employees":
          viewAllEmp();
          break;

        case "View all departments":
          viewAllDept();
          break;

        case "View all roles":
          viewAllRole();
          break;

        case "Add employee":
          addEmp();
          break;

        case "Add department":
          addDept();
          break;
        case "Add role":
          addRole();
          break;
        case "Update employee role":
          updateEmpRole();
          break;
        case "Update employee manager":
          updateEmpMngr();
          break;
      
        case "Delete employee":
          deleteEmp();
          break;
        
        case "Delete role":
          deleteRole();
          break;
        case "Delete department":
          deleteDept();
          break;
      }
    });
};


// View all employees 
function viewAllEmp() {
  
      const query = "SELECT first_name, last_name, id FROM employee";
      connection.query(query, function (
        err,
        res
      ) {
       

        console.table(res)

        mainMenu();
      });
    };


      
  

// View all roles
function viewAllRole() {
  
      const query = "SELECT * FROM role";
      connection.query(query, function (
        err,
        res
      ) {
       

        console.table(res)

        mainMenu();
      });
    };

    // View all departments
function viewAllDept() {
  
      const query = "SELECT * FROM department";
      connection.query(query, function (
        err,
        res
      ) {
       

        console.table(res)

        mainMenu();
      });
    };



// Delete  employee
function deleteEmp() {
  
      const query = "SELECT first_name, last_name, id FROM employee";
      connection.query(query, function (
        err,
        res
      ) {
          
          console.table(res);
          inquirer
            .prompt({
              name: "employeeId",
              type: "input",
              message: "What is the Id of the employee you would you like to delete?",
            })
            .then(function ({employeeId}) {
            const query = `DELETE FROM employee WHERE id="${employeeId}"`;
            console.log(query);
          connection.query(query, function (
        err,
        res
      ) {
        if(err)throw err;
        console.log("Deleted employee");
          mainMenu();
        });
    });
    });
  }


    // Add employee
function addEmp() {
  
      const query = "SELECT first_name, last_name, id FROM employee";
      connection.query(query, function (
        err,
        res
      ) {
         
          console.table(res);
          inquirer
            .prompt({
              name: "first_name",
              type: "input",
              message: "Employee's first name:",
            },
            {
              name: "last_name",
              type: "input",
              message: "Employee's last name:",
            },
            {
              name: "role_id",
              type: "list",
              message: "Employee's role:",
              choices: "manager,engineer,accountant,recuriter,sales person"
            },
            {
              name: "manager",
              type: "list",
              message: "Employee's role:",
              choices: "manager,engineer,accountant,recuriter,sales person"
            },

            )
            .then(function ({employeeId}) {
            const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id)';
            console.log(query);
          connection.query(query, function (
        err,
        res
          ){
        if(err)throw err;
        console.log("Employee added");
          mainMenu();
       });
    });
  });
}
  



