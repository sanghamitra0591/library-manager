# library-manager

## Deployed URLs
- **Frontend URL**: [[https://your-frontend-url.com](https://your-frontend-url.com)](https://library-manager-q2jgejtlh-sanghamitras-projects-43b1eaaf.vercel.app/)
- **Backend URL**: [[https://your-backend-url.com](https://your-backend-url.com)](https://library-server-rtxl.onrender.com)


## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Deployed URLs](#deployed-urls)
- [Installation](#installation)
- [Usage](#usage)
- [Sample Login Credentials](#sample-login-credentials)
- [Contributing](#contributing)
- [License](#license)

## Introduction
This project is a library management system designed to streamline the process of managing books and user requests. It features a user-friendly interface for both the frontend and backend, allowing different user roles to perform specific actions.

## Features

### User Roles
- **SuperAdmin**
  - Register, login, and logout
  - Add, update, and delete admin accounts
  - View all admin accounts
  - View, update, delete, filter, sort, and search for books

- **Admin**
  - Register, login, and logout
  - Add, view, update quantity, and delete books within their own category
  - View user book requests
  - Accept or decline book requests

- **User**
  - Register, login, and logout
  - View, sort, filter, and search for available books
  - View their own book requests (pending, accepted, declined)
  - Request book returns
  - Return books with a penalty of ₹50 per day if the expected return date is exceeded

## Technologies Used
- Frontend: [React](https://reactjs.org/)
- Backend: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/)
- Database: [MongoDB](https://www.mongodb.com/)
- Authentication: [JWT](https://jwt.io/)
- Styling: [Bootstrap](https://getbootstrap.com/)
  
  
## Sample Login Credentials
- **You can use the following credentials to test the different roles:

    SuperAdmin
        Username: superadmin@bookheaven.com
        Password: Superadmin@1

    Admin
        Username: admin1@bookheaven.com
        Password: Admin@123

    User
        Username: user1@gmail.com
        Password: User@123


## Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/yourusername/project-name.git](https://github.com/sanghamitra0591/library-manager.git)
   cd library-manager

## Install dependencies:

- **For the backend:

    bash

    cd backend
    npm install

- **For the frontend:

    bash

    cd frontend
    npm install

- **Set up environment variables (create a .env file):

    For the backend, include database connection details and secret keys.

## Start the application:

   - ** For the backend:

    bash

cd backend
npm start

- **For the frontend:

bash

        cd frontend
        npm start

Usage

    Access the frontend by navigating to http://localhost:3000 (or the appropriate port).
    Use the respective roles to test different functionalities:
        SuperAdmin can manage admins and books.
        Admin can manage books in their category and handle user requests.
        Users can browse books and manage their requests.

## Contributing

- **We welcome contributions! Please follow these steps:

    Fork the repository.
    Create a new branch (git checkout -b feature/YourFeature).
    Make your changes and commit them (git commit -m 'Add new feature').
    Push to the branch (git push origin feature/YourFeature).
    Open a pull request.

License

This project is licensed under the MIT License. See the LICENSE file for details.


Feel free to replace the placeholders for the deployed URLs with the actual URLs for your project!

