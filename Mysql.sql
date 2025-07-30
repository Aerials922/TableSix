CREATE DATABASE table_six;
USE table_six;
-- call: http://localhost:3000/tab_six/stock/external?ticker=${ticker} to create stocks table.

-- create user table.
CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    cash DECIMAL(15, 2) DEFAULT 0.00
);  

-- create position table.
CREATE TABLE IF NOT EXISTS positions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    ticker VARCHAR(10) NOT NULL,
    amount INT NOT NULL,
    price DECIMAL(15, 2) NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    CONSTRAINT unique_user_ticker UNIQUE (user_id, ticker)
);

-- Forign key constraints.
