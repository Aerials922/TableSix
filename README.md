# Real-Time Stock Tracking and Trading Website



A powerful full-stack web application designed to provide users with fast and accurate real-time U.S. stock market data, interactive charts, and a virtual trading platform. The project adopts a decoupled front-end and back-end architecture, built entirely with a JavaScript technology stack.



## 🚀 Project Overview



This project is a real-time stock information display and trading platform focused on the U.S. stock market. It retrieves real-time stock data for nearly a thousand companies by calling the Alpha Vantage financial data API, and efficiently stores this information in a MySQL database on a Seoul cloud server. The front-end interface is responsible for displaying the data clearly, using interactive charts and detailed data lists to help users intuitively understand market dynamics. The back-end service not only handles data retrieval and storage but also implements a complete set of CRUD (Create, Read, Update, Delete) data management interfaces, along with new features for user registration, login, virtual trading, and personal asset management, providing a solid foundation for the project's stability and scalability.



## ✨ User Experience (User Experience)



We are committed to providing a simple, intuitive, and efficient user experience, with the following core highlights:

- **Dynamic Data Updates**: The front-end establishes a long connection with the back-end to receive real-time data pushes, allowing users to keep up with the fast-changing market without manually refreshing the page.
- **Intuitive Data Visualization**: We use dynamic data charts to display key metrics such as each stock's price trend and trading volume, helping users quickly identify trends and patterns.
- **Convenient Company Selection**: The system includes a built-in list of nearly 1,000 popular U.S. stock companies. We have established a mapping between U.S. stock tickers and Chinese company names, allowing users to quickly find companies of interest through search or filtering.
- **Detailed Stock Information**: In addition to price charts, we also provide detailed information for each stock, including:
  - Opening price
  - Closing price
  - Highest price
  - Lowest price
  - Trading volume
- **Responsive Design**: The website interface is perfectly adapted to different screen sizes, such as desktops, tablets, and mobile phones, ensuring a consistent and high-quality user experience on any device.
- **User Account and Asset Management**: Users can register and log in to a personal account to view their stock holdings, available funds, and total asset value on the personal assets page.
- **Virtual Trading Functionality**: Users can perform stock buy and sell operations to simulate a real investment experience.
- **Profit and Loss Calculation**: The system automatically calculates and displays the profit and loss for each trade and the total portfolio, helping users evaluate their investment performance.



## 🛠️ Technical Details (Technical Details)



#### **Technology Stack**



| Category        | Technology                                                   | Description                                                  |
| --------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Frontend**    | `React.js` (or other modern front-end frameworks like Vue.js) | Responsible for building the user interface, data visualization, and user interactions. Component-based development is used to improve code reusability and maintainability. |
|                 | `Chart.js` (or other chart libraries like Echarts, Highcharts) | Used to draw dynamic, interactive charts for stock prices and trading volumes. |
|                 | `Axios`                                                      | Responsible for making HTTP requests to the back-end to get initial and historical data. |
|                 | `WebSocket` (or `Socket.IO`)                                 | Used to establish a real-time long connection from the back-end to the front-end, pushing the latest stock market data to enable dynamic updates. |
| **Backend**     | `Node.js`                                                    | The back-end runtime environment, featuring high concurrency and non-blocking I/O. |
|                 | `Express.js`                                                 | A web framework based on Node.js, used to quickly build RESTful APIs and WebSocket services. |
|                 | `Sequelize` (or other ORMs like Mongoose)                    | An Object-Relational Mapping (ORM) tool that simplifies interaction with the MySQL database, enabling the definition of data models and database operations. |
|                 | `JSON Web Tokens (JWT)`                                      | Used for user authentication and authorization to ensure API call security. |
| **Database**    | `MySQL` (deployed on a Seoul cloud server)                   | A remote relational database used for persistent storage of stock market data, company information, user account details, and transaction records. |
| **Data Source** | `Alpha Vantage`                                              | The core data source for the project, providing real-time and historical stock data. |

------



#### **System Architecture**



*<center>A simple architectural diagram, which you can replace with your own chart.</center>*

1. **Backend API Service**
   - **RESTful API**: Built with `Express.js`, providing standard HTTP interfaces. The front-end calls these interfaces on initial load to get a list of companies, historical data for a specific stock, and other basic information.
   - **CRUD Interfaces**: Implements a complete set of management functions for adding, deleting, modifying, and querying stock data in the database, and is connected to the front-end.
   - **Authentication and Authorization**: New user registration and login interfaces are added, using JWT (JSON Web Tokens) to ensure secure user sessions.
   - **Trading Service**: Adds interfaces to handle the logic for buying and selling stocks. During each transaction, it verifies the user's available funds and holdings, and updates personal assets and transaction records in the database.
2. **Frontend Application**
   - **Initialization**: When the page loads, it gets a list of all companies via the RESTful API.
   - **User Interaction**: After a user selects a company, the front-end requests detailed historical data for that company to draw the initial chart. Users can also enter buy/sell quantities to perform trades via the API with the back-end.
   - **Real-time Updates**: The front-end uses a `WebSocket` client to listen for data pushes from the server. Once new data is received, it immediately updates the price display, charts, and the real-time profit and loss for the user's personal assets on the page.
   - **US-China Mapping**: The front-end has a built-in mapping file (e.g., `mapping.json`) or gets it from the back-end, which is used to associate stock tickers (e.g., `AAPL`) with Chinese company names (e.g., `苹果公司`) for display.



## ⚙️ How to Install and Run





#### **Prerequisites**



- `Node.js` (version 16.x or higher)
- `npm` or `yarn`
- `MySQL` client



#### **Backend Setup**



1. Clone the repository:

   ```bash
   git clone [Your repository URL]
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   - Configure in the `config/mysql.js` file.
   - Add necessary environment variables to the file, such as the database connection string and the Alpha Vantage API key.

   ```js
   # MySQL connection info
   import mysql from 'mysql2/promise';
   const connection = mysql.createPool({
       host: 'IP',
       user: 'username',
       password: 'passwd',
       database: 'table_six',
   });
   export default connection;
   ```

4. Start the back-end service:

   ```bash
   npm start
   ```



#### **Frontend Setup**



1. Go to the front-end directory:

   ```bash
   cd ../web
   ```

2. Open `http://localhost:5500/web/login.html` (or your configured port) in your browser to log in and access.