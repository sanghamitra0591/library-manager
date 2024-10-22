# library-manager

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
- Frontend: [React](https://reactjs.org/), [Vue.js](https://vuejs.org/), [Angular](https://angular.io/)
- Backend: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/)
- Database: [MongoDB](https://www.mongodb.com/), [MySQL](https://www.mysql.com/)
- Authentication: [JWT](https://jwt.io/), [OAuth](https://oauth.net/)
- Styling: [Bootstrap](https://getbootstrap.com/)

## Deployed URLs
- **Frontend URL**: [https://your-frontend-url.com](https://your-frontend-url.com)
- **Backend URL**: [https://your-backend-url.com](https://your-backend-url.com)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/project-name.git
   cd project-name
