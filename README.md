# Basic API for store

## Dependencies
- Bcryptjs : A library for encrypting passwords. It's commonly used to securely store passwords in databases.
- Cors : Middleware for Express that enables cross-origin resource sharing. It's useful for controlling resource access policies from a browser.
- Dotenv : A library that loads environment variables from a .env file into the development environment. It's useful for storing sensitive information or environment-specific configurations.
- Express : A Node.js web framework that simplifies building web applications and APIs. It provides a robust set of features for handling HTTP requests.
- Helmet : Express middleware that helps protect web applications by setting various security-related HTTP headers, such as ***X-XSS-Protection*** and ***Strict-Transport-Security***.
- Jsonwebtoken : An implementation of JSON Web Tokens (JWT) for Node.js. It's used for authenticating requests between different parts of a web application or service.
- Morgan : HTTP request logging middleware for Express. It logs information about incoming requests, such as the URL, HTTP method, and status code.
- Nodemon : A development tool that monitors changes to files in a Node.js project and automatically restarts the application when changes are detected. It's useful for speeding up the development process.
- Sequelize : An Object-Relational Mapping (ORM) for Node.js. It allows interacting with relational databases using objects instead of directly writing SQL statements, making data manipulation easier.
- Pg-hstore : A package that assists in serializing and deserializing data between JavaScript and the hstore format of PostgreSQL. It's useful when working with PostgreSQL databases and needing to manipulate data in this specific format.