
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const connection = require('./config/connection');

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the Employee tracker database.');
});

// Function to start the application
function questions() {
  inquirer
    .prompt({
      name: 'choices',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update a role',
        'Exit'
      ]
    })
    .then((answer) => {
      if (answer.choices === 'View all departments') {
        viewDepartments();
      } else if (answer.choices === 'View all roles') {
        viewRoles();
      } else if (answer.choices === 'View all employees') {
        viewEmployees();
      } else if (answer.choices === 'Add a department') {
        addDepartment();
      } else if (answer.choices === 'Add a role') {
        addRole();
      } else if (answer.choices === 'Add an employee') {
        addEmployee();
      } else if (answer.choices === 'Update a role') {
        updateRole();
      } else if (answer.choices === 'Exit') {
        console.log('Goodbye!');
        connection.end();
      }
    });
    

// Function to view all departments
function viewDepartments() {
  connection.query('SELECT * FROM departments', (err, res) => {
    if (err) throw err;
    consoleTable(res);
    questions();
  });
}

// Function to view all roles
function viewRoles() {
  connection.query('SELECT * FROM roles', (err, res) => {
    if (err) throw err;
    consoleTable(res);
    questions();
  });
}

// Function to view all employees
function viewEmployees() {
  connection.query('SELECT * FROM employees', (err, res) => {
    if (err) throw err;
    consoleTable(res);
    questions();
  });
};

   

