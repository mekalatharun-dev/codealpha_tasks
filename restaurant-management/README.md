\# 🍽️ Restaurant Management System Backend



A RESTful backend API for managing restaurant operations such as menu items, categories, tables, reservations, orders, inventory, authentication, and reports.



Built as part of the \*\*CodeAlpha Backend Development Internship – September 2026\*\*.



\---



\## 🚀 Tech Stack



\* \*\*Node.js\*\*

\* \*\*Express.js\*\*

\* \*\*PostgreSQL\*\*

\* \*\*Prisma ORM\*\*

\* \*\*JWT Authentication\*\*

\* \*\*bcryptjs\*\* for password hashing

\* \*\*Zod\*\* for request validation

\* \*\*Postman\*\* for API testing



\---



\## ✨ Features



\### 🔐 Authentication



\* User registration

\* User login

\* JWT-based authentication

\* Role-based authorization

\* Password hashing using bcrypt



\### 🍔 Menu Management



\* Create menu items

\* View all menu items

\* View menu item by ID

\* Update menu items

\* Delete menu items

\* Category management

\* Menu availability tracking



\### 🪑 Table Management



\* Create restaurant tables

\* View tables

\* View table by ID

\* Update table details

\* Track table status:



&#x20; \* `AVAILABLE`

&#x20; \* `OCCUPIED`

&#x20; \* `RESERVED`



\### 📅 Reservations



\* Create reservations

\* View reservations

\* View reservation by ID

\* Update reservation status

\* Table capacity validation

\* Duplicate reservation protection



\### 🧾 Order Management



\* Create orders

\* View orders

\* View order by ID

\* Update order status

\* Automatic order total calculation

\* Menu availability validation

\* Transaction-based order processing



\### 📦 Inventory Management



\* Create inventory items

\* View inventory

\* View inventory item by ID

\* Update inventory

\* Minimum stock tracking

\* Automatic inventory deduction when orders are placed



\### 🥘 Ingredient Management



\* Map menu items to inventory ingredients

\* Define required ingredient quantities

\* Check ingredient requirements for menu items



\### 📊 Reports



\* Low-stock inventory report

\* Daily sales report

\* ADMIN-only reporting endpoints



\### 🛡️ Validation \& Error Handling



\* Zod request validation

\* Centralized error handling

\* Proper HTTP status codes

\* Authentication middleware

\* Authorization middleware



\---



\## 🗂️ Project Structure



```text

restaurant-management/

│

├── prisma/

│   └── schema.prisma

│

├── postman/

│   └── collections/

│

├── src/

│   ├── controllers/

│   ├── middleware/

│   ├── routes/

│   ├── utils/

│   ├── app.js

│   └── server.js

│

├── .env.example

├── .gitignore

├── package.json

├── package-lock.json

├── prisma.config.ts

└── README.md

```



\---



\## ⚙️ Installation



\### 1. Clone the repository



```bash

git clone https://github.com/melakatharun/CodeAlpha\_RestaurantManagementSystem.git

cd CodeAlpha\_RestaurantManagementSystem

```



\### 2. Install dependencies



```bash

npm install

```



\### 3. Configure environment variables



Create a `.env` file in the project root:



```env

DATABASE\_URL=your\_postgresql\_connection\_string

JWT\_SECRET=your\_jwt\_secret

PORT=5000

```



> \*\*Important:\*\* Never commit your `.env` file or database credentials to GitHub.



\### 4. Set up PostgreSQL



Make sure PostgreSQL is installed and running.



Then apply the Prisma schema:



```bash

npx prisma db push

```



Generate the Prisma Client:



```bash

npx prisma generate

```



\### 5. Start the development server



```bash

npm run dev

```



The API will run at:



```text

http://localhost:5000

```



\---



\## 📌 API Endpoints



\### Authentication



| Method | Endpoint             | Access |

| ------ | -------------------- | ------ |

| POST   | `/api/auth/register` | Public |

| POST   | `/api/auth/login`    | Public |



\### Menu



| Method | Endpoint        | Access        |

| ------ | --------------- | ------------- |

| GET    | `/api/menu`     | Public        |

| GET    | `/api/menu/:id` | Public        |

| POST   | `/api/menu`     | STAFF / ADMIN |

| PUT    | `/api/menu/:id` | STAFF / ADMIN |

| DELETE | `/api/menu/:id` | ADMIN         |



\### Categories



| Method | Endpoint          | Access        |

| ------ | ----------------- | ------------- |

| GET    | `/api/categories` | Public        |

| POST   | `/api/categories` | STAFF / ADMIN |



\### Tables



| Method | Endpoint          | Access        |

| ------ | ----------------- | ------------- |

| GET    | `/api/tables`     | Public        |

| GET    | `/api/tables/:id` | Public        |

| POST   | `/api/tables`     | STAFF / ADMIN |

| PUT    | `/api/tables/:id` | STAFF / ADMIN |



\### Reservations



| Method | Endpoint                | Access        |

| ------ | ----------------------- | ------------- |

| POST   | `/api/reservations`     | STAFF / ADMIN |

| GET    | `/api/reservations`     | STAFF / ADMIN |

| GET    | `/api/reservations/:id` | STAFF / ADMIN |

| PUT    | `/api/reservations/:id` | STAFF / ADMIN |



\### Inventory



| Method | Endpoint             | Access        |

| ------ | -------------------- | ------------- |

| POST   | `/api/inventory`     | STAFF / ADMIN |

| GET    | `/api/inventory`     | STAFF / ADMIN |

| GET    | `/api/inventory/:id` | STAFF / ADMIN |

| PUT    | `/api/inventory/:id` | STAFF / ADMIN |



\### Ingredients



| Method | Endpoint                            | Access        |

| ------ | ----------------------------------- | ------------- |

| POST   | `/api/ingredients`                  | STAFF / ADMIN |

| GET    | `/api/ingredients/menu/:menuItemId` | Public        |



\### Orders



| Method | Endpoint                 | Access        |

| ------ | ------------------------ | ------------- |

| POST   | `/api/orders`            | STAFF / ADMIN |

| GET    | `/api/orders`            | STAFF / ADMIN |

| GET    | `/api/orders/:id`        | STAFF / ADMIN |

| PUT    | `/api/orders/:id/status` | STAFF / ADMIN |



\### Reports



| Method | Endpoint                   | Access |

| ------ | -------------------------- | ------ |

| GET    | `/api/reports/low-stock`   | ADMIN  |

| GET    | `/api/reports/daily-sales` | ADMIN  |



\---



\## 🔄 Order Processing Flow



When an order is placed:



1\. Validate the request.

2\. Verify menu items exist and are available.

3\. Calculate the order total.

4\. Determine required ingredients.

5\. Check available inventory.

6\. Create the order.

7\. Create order items.

8\. Automatically deduct inventory.

9\. Commit the database transaction.



If there is insufficient inventory or another transaction error, the operation is rolled back.



\---



\## 🧪 API Testing



The project includes a \*\*Postman collection\*\* for testing the major API endpoints.



The collection is available inside:



```text

postman/collections/

```



\### Recommended testing flow



1\. Register a user.

2\. Login and obtain the JWT token.

3\. Use the token for protected endpoints.

4\. Create categories and menu items.

5\. Create restaurant tables.

6\. Add inventory and ingredients.

7\. Create reservations.

8\. Place orders.

9\. Verify automatic inventory deduction.

10\. Test reporting endpoints using an ADMIN account.



\---



\## 🔒 Security



\* Passwords are hashed using bcrypt.

\* Protected endpoints require JWT authentication.

\* Role-based access control is implemented.

\* Environment secrets are excluded from Git.

\* Request bodies are validated using Zod.

\* Sensitive credentials are not stored in the repository.



\---



\## 🗄️ Database



The application uses \*\*PostgreSQL\*\* with \*\*Prisma ORM\*\*.



The database schema is maintained in:



```text

prisma/schema.prisma

```



The database manages entities related to:



\* Users

\* Categories

\* Menu Items

\* Tables

\* Reservations

\* Orders

\* Order Items

\* Inventory

\* Ingredients



\---



\## 🎯 Project Objective



The objective of this project is to build a backend system that demonstrates practical implementation of:



\* RESTful APIs

\* Database design

\* Authentication

\* Authorization

\* Request validation

\* Transaction management

\* Inventory automation

\* Business logic

\* Error handling

\* API testing



\---



\## 👨‍💻 Project



\*\*Restaurant Management System Backend\*\*



Developed using \*\*Node.js, Express.js, PostgreSQL, and Prisma\*\*.



\### Internship



\*\*CodeAlpha Backend Development Internship\*\*



\*\*September 2026\*\*



