
const inquirer = require('inquirer');
const cTable = require('console.table');
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
    .then(async (answer) => {
      if (answer.choices === 'View all departments') {
        await viewDepartments();
      } else if (answer.choices === 'View all roles') {
        await viewRoles();
      } else if (answer.choices === 'View all employees') {
        await viewEmployees();
      } else if (answer.choices === 'Add a department') {
        await addDepartment();
      } else if (answer.choices === 'Add a role') {
        await addRole();
      } else if (answer.choices === 'Add an employee') {
        await addEmployee();
      } else if (answer.choices === 'Update a role') {
        await updateRole();
      } else if (answer.choices === 'Exit') {
        console.log('Goodbye!');
        connection.end();
      }
    })
  };
    

// Function to view all departments
function viewDepartments() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM departments', (err, res) => {
      if (err) reject(err);
      cTable(res);
      resolve();
    });
  });
}

// Function to view all roles
function viewDepartments() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM roles', (err, res) => {
      if (err) reject(err);
      cTable(res);
      resolve();
    });
  });
}

// Function to view all employees
function viewEmployees() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM employees', (err, res) => {
      if (err) reject(err);
      cTable(res);
      resolve();
    });
  });
}




function addDepartment() {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt({
        name: 'department',
        type: 'input',
        message: 'Enter the name of the department:',
      })
      .then((answer) => {
        connection.query(
          'INSERT INTO departments (dept_name) VALUES (?)',
          [answer.department],
          (err, res) => {
            if (err) reject(err);
            console.log('Department added successfully!');
            resolve();
          }
        );
      });
  });
}

// Function to add a role
function addRole() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM departments', (err, departments) => {
      if (err) reject(err);
      inquirer
        .prompt([
          {
            name: 'title',
            type: 'input',
            message: 'Enter the title of the role:',
          },
          {
            name: 'salary',
            type: 'input',
            message: 'Enter the salary for the role:',
          },
          {
            name: 'department',
            type: 'list',
            message: 'Select the department for the role:',
            choices: departments.map((department) => department.name),
          },
        ])
        .then((answer) => {
          const department = departments.find(
            (department) => department.name === answer.department
          );
          connection.query(
            'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)',
            [answer.title, answer.salary, department.id],
            (err, res) => {
              if (err) reject(err);
              console.log('Role added successfully!');
              resolve();
            }
          );
        });
    });
  });
}

function addEmployee() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM roles', (err, roles) => {
      if (err) reject(err);
      connection.query('SELECT * FROM employees', (err, employees) => {
        if (err) reject(err);
        inquirer
          .prompt([
            {
              name: 'first_name',
              type: 'input',
              message: "Enter the employee's first name:",
            },
            {
              name: 'last_name',
              type: 'input',
              message: "Enter the employee's last name:",
            },
            {
              name: 'role',
              type: 'list',
              message: "Select the employee's role:",
              choices: roles.map((role) => role.title),
            },
            {
              name: 'manager',
              type: 'list',
              message: "Select the employee's manager:",
              choices: ['None'].concat(
                employees.map(
                  (employee) => `${employee.first_name} ${employee.last_name}`
                )
              ),
            },
          ])
          .then((answer) => {
            const role = roles.find((role) => role.title === answer.role);
            const managerName = answer.manager.split(' ');
            const manager = employees.find(
              (employee) =>
                employee.first_name === managerName[0] &&
                employee.last_name === managerName[1]
            );

            connection.query(
              'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
              [answer.first_name, answer.last_name, role.id, manager ? manager.id : null],
              (err, res) => {
                if (err) reject(err);
                console.log('Employee added successfully!');
                resolve();
              }
            );
          });
      });
    });
  });
}

// Function to update an employee's role
function updateRole() {
  connection.query('SELECT * FROM employees', (err, employees) => {
    if (err) throw err;
    connection.query('SELECT * FROM roles', (err, roles) => {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: 'employee',
            type: 'list',
            message: "Select the employee to update their role:",
            choices: employees.map((employee) => `${employee.first_name} ${employee.last_name}`),
          },
          {
            name: 'role',
            type: 'list',
            message: "Select the employee's new role:",
            choices: roles.map((role) => role.title),
          },
        ])
        .then((answer) => {
          const employeeName = answer.employee.split(' ');
          const employee = employees.find(
            (employee) =>
              employee.first_name === employeeName[0] &&
              employee.last_name === employeeName[1]
          );
          const role = roles.find((role) => role.title === answer.role);

          connection.query(
            'UPDATE employees SET role_id = ? WHERE id = ?',
            [role.id, employee.id],
            (err, res) => {
              if (err) throw err;
              console.log('Employee role updated successfully!');
              questions();
            }
          );
        });
    });
  });
}

questions();


