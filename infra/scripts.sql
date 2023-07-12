SELECT * FROM users;
SELECT * FROM addresses;
SELECT * FROM products;

INSERT INTO users (
    id, 
    name, 
    profession, 
    birthDate, 
    documentNumber, 
    email, 
    password, 
    phone, 
    income, 
    createdAt, 
    updatedAt
)
VALUES (
    'f33f3ede-10d3-4943-a9ce-a6c316053be4', 
    'Ivirson Daltro', 
    'Front-End Dev', 
    '2000-10-15T00:00:00.000Z', 
    '01234567890', 
    'ivirson@email.com', 
    '1234', 
    '71984785478', 
    1000, 
    '20230-07-11T12:00:00.000Z', 
    '20230-07-11T12:00:00.000Z'
);

INSERT INTO addresses (
    id, 
    zipCode, 
    street, 
    number, 
    complement, 
    neighborhood, 
    city, 
    state, 
    userId, 
    createdAt, 
    updatedAt
)
VALUES (
    'e9e7e71a-213b-461e-a647-71bed25178e8', 
    '42800049', 
    'Rua Costa Pinto', 
    254, 
    'Box 12', 
    'Centro', 
    'Camaçari', 
    'BA', 
    'f33f3ede-10d3-4943-a9ce-a6c316053be4', 
    '20230-07-11T12:00:00.000Z', 
    '20230-07-11T12:00:00.000Z'
);

-- DELETE FROM `Users` WHERE `id` = 'f33f3ede-10d3-4943-a9ce-a6c316053be4'
-- DELETE FROM `Addresses` WHERE `userId` = 'f33f3ede-10d3-4943-a9ce-a6c316053be4'

-- DROP TABLE users;
-- DROP TABLE addresses;
-- DROP TABLE products;
-- DROP TABLE Tags;