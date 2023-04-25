DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE departments (
  id INT NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE roles (
  role_id INT NOT NULL PRIMARY KEY,
  job_title VARCHAR(50) NOT NULL,
  department_id INT NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees (
  id INT NOT NULL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  job_title VARCHAR(100) NOT NULL,
  department_id INT NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  manager_id INT NOT NULL,
  FOREIGN KEY (department_id) REFERENCES departments(id),
  FOREIGN KEY (job_title) REFERENCES roles(job_title),
  FOREIGN KEY (manager_id) REFERENCES employees(id),
  FOREIGN KEY (salary) REFERENCES roles(salary),

);