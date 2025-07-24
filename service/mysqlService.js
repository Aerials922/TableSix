import connection from "../config/mysql";

// Initialize the database and create tables if they do not exist
const initializeDatabase = async () => {
    try {
        await connection.query(`
            CREATE DATABASE IF NOT EXISTS table_six
        `);
        await connection.query(`
            USE table_six
        `);
        
        console.log("Database initialized successfully.");
    } catch (error) {
        console.error("Error initializing database:", error);
    }
}

const createTables = async () => {
    try {
        await connection.query(`
            CREATE TABLE IF NOT EXISTS c_pricedata(
	        id int auto_increment primary key,
            volume BIGINT,
            open decimal(20,8) not null,
            close decimal(20,8) not null,
            high  decimal(20,8) not null,
            low  decimal(20,8) not null,
            timestamp datetime
            )   
        `);
        console.log("c_pricedata table created successfully.");
        await connection.query(`
            CREATE TABLE IF NOT EXISTS amzn_pricedata(
	        id int auto_increment primary key,
            volume BIGINT,
            open decimal(20,8) not null,
            close decimal(20,8) not null,
            high  decimal(20,8) not null,
            low  decimal(20,8) not null,
            timestamp datetime
            )   
        `);
        console.log("amzn_pricedata table created successfully.");
        await connection.query(`
            CREATE TABLE IF NOT EXISTS tsla_pricedata(
            id int auto_increment primary key,
            volume BIGINT,
            open decimal(20,8) not null,
            close decimal(20,8) not null,
            high  decimal(20,8) not null,
            low  decimal(20,8) not null,
            timestamp datetime
            )   
        `);
        console.log("tsla_pricedata table created successfully.");
        await connection.query(`
            CREATE TABLE IF NOT EXISTS fb_pricedata(
            id int auto_increment primary key,
            volume BIGINT,
            open decimal(20,8) not null,
            close decimal(20,8) not null,
            high  decimal(20,8) not null,
            low  decimal(20,8) not null,
            timestamp datetime
            )   
        `);
        console.log("fb_pricedata table created successfully.");
        await connection.query(`
            CREATE TABLE IF NOT EXISTS aapl_pricedata(
            id int auto_increment primary key,
            volume BIGINT,
            open decimal(20,8) not null,
            close decimal(20,8) not null,
            high  decimal(20,8) not null,
            low  decimal(20,8) not null,
            timestamp datetime
            )   
        `);
        console.log("aapl_pricedata table created successfully.");
    }catch (error) {
        console.error("Error creating tables:", error);
    }
}