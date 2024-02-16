# Smartphone Management Dashboard Client

[![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)]() [![](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)]() [![](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)]()

This is `Smartphone Management System` for a warehouse. The main purpose of the application is to maintain `C-CREATE R-READ U-UPDATE D-DELETE` for products. User can sell a product, and track sales history based on `daily`, `weekly`, `monthly` and `yearly`. Implement `authentication` and `authorization` using jwt token. The application is authorized using role based routing. There are 3 types of user roles such as `Super admin`, `Branch manager`, and `Seller`. The entire application's state managed by `redux-toolkit` and data fetching with caching using `redux-toolkit-query`.

Server Github:

```bash
https://github.com/Porgramming-Hero-web-course/l2b2-full-stack-a5-server-side-Adnan-Sarkar
```

Youtube video

```bash
https://youtu.be/vbY0cyaSNu4?si=dvzBIbOoga2vEKSD
```

or

[Click to see in youtube](https://youtu.be/vbY0cyaSNu4?si=dvzBIbOoga2vEKSD)

## Table of Contents

- [Key Features](#key-features)
- [Technology Used](#technology-used)
- [Live Link](#live-link)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation locally](#installation-locally)
  - [Running the Application](#running-the-application)
- [Application Overview](#application-overview)

## Key Features

Role Based Routing:

1. **Super Admin**

   - Inventory page
   - Create product page
   - Duplicate product page
   - Update product page
   - Delete product page
   - Sales history page
   - Create user page
   - User list page

2. **Branch Manager**

   - Inventory page
   - Create product page
   - Duplicate product page
   - Update product page

3. **Seller**

   - Inventory page

Functionality:

1. **Products:**

   - Create new products.
   - Sell products with a minimum quantity of 1.
   - Generate and provide a downloadable PDF invoice automatically upon the successful sale of a product.
   - Update existing product details.
   - Delete single/multiple products at a time.
   - Duplicate any product and edit to create a new product.

2. **Sales:**
   - View daily sales history.
   - View weekly sales history.
   - View monthly sales history.
   - View yearly sales history.

## Technology Used

- **React Router**
- **Redux Toolkit**
- **Redux Persist**
- **Ant Design**
- **React Hot Toast**
- **React Hook Form**
- **Day.js**
- **JWT Decode**
- **jspdf**
- **Dev Tools**
  - **TypeScript**
  - **ESLint**

### Live Link

```bash
https://course-review-with-auth-by-adnan-sarkar.vercel.app/
```

## Getting Started

These instructions will help you set up and run the application on your local machine.

### Prerequisites

- Node.js and npm installed on your machine.

### Installation locally

1. Clone the repository:

```bash
https://github.com/Porgramming-Hero-web-course/l2b2-full-stack-a5-client-side-Adnan-Sarkar.git
```

2. Navigate to the project directory:

```bash
cd smartphone-management-dashboard-client
```

3. Install dependencies:

```bash
npm install
```

### Running the Application

```bash
npm run dev
```

## Application Overview

1. Login and Registration page.
   ![Login and Registration page](./application-overview-images/Login-Registration.png)

2. Inventory page.
   ![Inventory page](./application-overview-images/Inventory-page.png)

3. Create new product page.
   ![Create new product page](./application-overview-images/CreateProductPage.png)

4. Duplicate and create new product page.
   ![Duplicate and create new product page](<./application-overview-images/DuplicateProductPage%20(1).png>)

5. Update products page.
   ![Update products page](./application-overview-images/UpdateProductPage.png)

6. Delete products page.
   ![Delete products page](./application-overview-images/DeleteProductsPage.png)

7. Daily sales history.
   ![Daily sales history](./application-overview-images/SalesHistoryDaily.png)

8. Weekly sales history.
   ![Weekly sales history](./application-overview-images/SalesHistoryWeekly.png)

9. Monthly sales history.
   ![Monthly sales history](./application-overview-images/SalesHistoryMonthly.png)

10. Yearly sales history.
    ![Yearly sales history](./application-overview-images/SalesHistoryYearly.png)

<br><br>

Thank you for exploring the `Smartphone Management Dashboard Client` application! Feel free to provide feedback, report issues.

## 📢 Social Links

- [![](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/adnan-sarkar-8b54341a0/)
- [![](https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white)](https://twitter.com/AdnanSarkar14)
- [![](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/adnansarkaraduvai/)
- [![](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/_a_d_u_v_a_i_/)
- [![](https://img.shields.io/badge/Hashnode-2962FF?style=for-the-badge&logo=hashnode&logoColor=white)](https://adnansarkar.hashnode.dev/)
