DROP DATABASE IF EXISTS employee_DB;

CREATE DATABASE employee_DB;

USE employee_DB;

-- Create Department Table --
CREATE TABLE department (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR (45) UNIQUE NOT NULL,
      PRIMARY KEY (id)
);

-- Create Roles Table --
CREATE TABLE roles (
      id INT UNIQUE NOT NULL AUTO_INCREMENT,
      title VARCHAR (45) NULL,
      salary DECIMAL (10, 2) NULL,
      department_id INT NOT NULL,
      PRIMARY KEY (id),
      FOREIGN KEY (department_id) REFERENCES department (id)
);

-- Create Employee Table --
CREATE TABLE employee (
      id INT UNIQUE NOT NULL AUTO_INCREMENT,
      first_name VARCHAR (45) NULL,
      last_name VARCHAR (45) NULL,
      roles_id INT NOT NULL,
      manager_id INT NULL,
      PRIMARY KEY (id),
      FOREIGN KEY (roles_id) REFERENCES roles (id),
      FOREIGN KEY (manager_id) REFERENCES employee (id)
);

INSERT INTO
      department (name)
VALUES
      ('Sales'),
      ('Engineering'),
      ('HR');

INSERT INTO
      roles (title, salary, department_id)
VALUES
      ('Sales Lead', 110000, 1),
      ('Sales Person', 70000, 1),
      ('Senior Engineer', 160000, 2),
      ('Software Engineer', 100000, 2),
      ('Senior HR', 90000, 3),
      ('HR Correspondent', 80000, 3);

INSERT INTO
      employee (first_name, last_name, roles_id, manager_id)
VALUES
      ('Lillian', 'Dickinson', 1, null),
      ('Sonia', 'Simon', 2, null),
      ('Griffin', 'Burns', 1, 1),
      ('Joseph', 'Wolf-Lyons', 2, 1),
      ('Conor', 'Doyle', 2, null),
      ('Katharine', 'Spilker', 3, 3);

SELECT
      *
FROM
      department;

SELECT
      *
FROM
      roles;

SELECT
      *
FROM
      employee
      INNER JOIN roles ON roles.id = employee.roles_id;