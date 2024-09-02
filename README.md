# Deep Space Store

![deep-space-store](https://github.com/user-attachments/assets/561c3aad-6e25-45bc-87b5-1baad573df77)

## Project Description

Deep Space Store is an application that emulates an e-commerce platform. This project was developed using Vue.js for the frontend and `json-server` to simulate a backend. It includes features like user registration, login, adding products to the cart, and completing purchases with different payment methods.

## Technologies Used

- **Frontend:** Vue.js, Vuetify
- **Backend:** json-server
- **State Management:** Vuex
- **Testing:** Cypress, Mocha
- **Containers:** Docker
- **Others:** Axios, ESLint

## Main Features

- User registration and authentication
- Adding and removing products in the cart
- Completing a purchase with order confirmation
- Different payment methods, including Pix, Boleto, and Credit Card

## Demo Video

https://github.com/user-attachments/assets/a3070bfe-70b0-4cec-b09d-59f8480baa6c

## How to Run the Project

### Prerequisites

- **Node.js** (version 14 or higher)
- **Docker** (optional, to run the application in containers)

### Steps to Run the Project Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Fernando9200/deep-space-store.git
   cd deep-space-store
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Start the JSON server:**
   
   In one terminal tab, run:
   ```bash
   npm run mock-server
   ```

4. **Start the Vue development server:**

   In another terminal tab, run:
   ```bash
   npm run serve
   ```

5. **Access the application:**  
   Open your browser and go to `http://localhost:8080`

6. **To facilitate testing the application, you can use the test account below:**

- **Email:** `testaccount@hotmail.com`
- **Password:** `123456`
   
   If you prefer, you can register your own account, which will be saved in `db.json`

## Running with Docker  

If you prefer, you can run the application using Docker.

**Build and run the application:**

```bash
docker-compose up --build
```

## Testing

The project uses Cypress for end-to-end testing and Mocha for unit testing. Below are the instructions to run each set of tests.

1. **Ensure the application is running**

2. **Run the Cypress tests:**

   ```bash
   npx cypress run
   ```
3. **Run the unit tests:**

   ```bash
   npm test
   ```

4. **To run the unit tests inside the container:**

   ```bash
   docker exec -it deep-space-store npm run test
   ```

## Contact
For questions or support, please contact `fernando91.sosa@hotmail.com`
