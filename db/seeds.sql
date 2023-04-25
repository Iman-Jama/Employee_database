INSERT INTO departments (id, name)
VALUES
  (1, 'Sales'),
  (2, 'Engineering'),
  (3, 'Marketing'),
  (4, 'Finance');

INSERT INTO roles (role_id, job_title, department_id, salary)
VALUES
  (1, 'Sales Representative', 1, 50000.00),
  (2, 'Sales Manager', 1, 80000.00),
  (3, 'Software Engineer', 2, 75000.00),
  (4, 'Senior Software Engineer', 2, 100000.00),
  (5, 'Marketing Coordinator', 3, 45000.00),
  (6, 'Marketing Manager', 3, 70000.00),
  (7, 'Financial Analyst', 4, 60000.00),
  (8, 'Finance Manager', 4, 90000.00);

INSERT INTO employees (id, first_name, last_name, job_title, department_id, salary, manager_id)
VALUES
  (1, 'John', 'Doe', 1, 1, 50000.00, 2),
  (2, 'Jane', 'Doe', 2, 1, 80000.00, NULL),
  (3, 'Bob', 'Smith', 3, 2, 75000.00, 4),
  (4, 'Alice', 'Johnson', 4, 2, 100000.00, 4),
  (5, 'Mike', 'Williams', 5, 3, 45000.00, 6),
  (6, 'Julie', 'Davis', 6, 3, 70000.00, NULL),
  (7, 'David', 'Lee', 7, 4, 60000.00, 8),
  (8, 'Karen', 'Wong', 8, 4, 90000.00, NULL);
