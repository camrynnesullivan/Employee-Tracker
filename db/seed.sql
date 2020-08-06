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