INSERT INTO departments (dept_name)
VALUES ('Sales'), ('Marketing'), ('Finance'), ('Human Resources');

INSERT INTO roles (title, department_id, salary)
VALUES ('Sales Manager', 1, 70000.00),
       ('Sales Representative', 1, 50000.00),
       ('Marketing Manager', 2, 65000.00),
       ('Marketing Coordinator', 2, 45000.00),
       ('Finance Manager', 3, 80000.00),
       ('Finance Analyst', 3, 60000.00),
       ('HR Manager', 4, 75000.00),
       ('HR Assistant', 4, 40000.00);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),
       ('Jane', 'Smith', 2, 1),
       ('Michael', 'Johnson', 2, 1),
       ('Emily', 'Williams', 4, 3),
       ('David', 'Brown', 5, 3),
       ('Amy', 'Taylor', 7, 6);
