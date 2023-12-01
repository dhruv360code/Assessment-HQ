# Node.js Backend Challenge Solution

## Project Overview

Welcome to my solution for the Node.js Backend Challenge. This project covers several essential features, demonstrating a robust and scalable Node.js backend with MongoDB as the database. Below are the key components and features:


# Project Features

## **1. JWT Authentication and Verification**

- **Description:** Implements JWT (JSON Web Token) authentication and verification for user login and logout.
- **Details:**
  - User authentication generates a JWT token that is securely stored in MongoDB.
  - Logout involves token removal from the database.
  - JWT verification ensures the authenticity of users.

## **2. Middleware Implementation**

- **Description:** Utilizes middleware for enhanced functionality and request handling.
- **Details:**
  - Middleware functions are applied to handle authentication, logging, and other aspects.
  - Enhances code modularity and maintainability.

## **3. Optimized Comment Retrieval with MongoDB Indexing**

- **Description:** Accelerates comment retrieval for a post through MongoDB indexing.
- **Details:**
  - Indexing is applied to the postID field in MongoDB for fast and efficient comment retrieval.
  - Improves the performance of retrieving comments associated with a specific post.

## **4. Modular Code Structure with Common MongoDB Query Functions**

- **Description:** Ensures modularity and code reusability through common MongoDB query functions.
- **Details:**
  - Common functions are created for MongoDB CRUD operations to avoid code redundancy.
  - Promotes a modular and maintainable codebase.
  ``` javascript
  const update = async (model, data) => {
   try {
      // Attempt to find and update a document or insert a new one if not found
      const updatedData = await mongoose.models[model].findOneAndUpdate(
        data.find,       // MongoDB query to find the document
        data.update,     // Data to update or insert
        { upsert: true, new: true }  // Options: upsert ensures insertion if document not found, new returns the updated document
      );
      // Return the updated data with no errors
      return [null, updatedData];
    } catch (error) {
      // If an error occurs during the update or insertion, return the error
      return [error, null];
    }
  };
  ```
## **5. Error Handling**
   - Implements efficient error handling by returning errors in a __consistent format__.
   - Follows the convention of handling errors first in functions.
   - This code structure follows a common pattern for error handling in Node.js, using a try-catch block. If an error occurs during the MongoDB operation, it is caught in the catch block, and a tuple __[error, null]__ is returned. If the operation is successful, the updated data is returned with __[null, updatedData]__

``` javascript
    const [error, result] = await updateDocument(model, { find: {...}, update: {...} });
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Updated Document:', result);
    }
```
## **6. Joi Validation**
   - Joi validation is seamlessly integrated into the API endpoints where necessary, ensuring that input data is validated before further processing. This helps __prevent           malformed or unexpected data from causing issues in the system__.
     
Explore the detailed API documentation for each endpoint. You can also test the APIs using the [Postman Collection](https://api.postman.com/collections/22671468-eb1545b5-b2d4-4af6-97cf-98ef4b7f0854?access_key=PMAT-01HGKCT5K7HT2KFKM1XMW9JV03).
     
## Getting Started

Follow these steps to set up and run the project locally:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/Assessment-HQ.git
   cd Assessment-HQ
   ```
2. **Add .env file with**
   ```bash
   PORT = 3000
   JWT_SECRET = "******"
   mongoUrl = "__________"
  
3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Run the Application**
   ```bash
   npm start
   ```

Explore the detailed API documentation for each endpoint. You can also test the APIs using the [Postman Collection](https://api.postman.com/collections/22671468-eb1545b5-b2d4-4af6-97cf-98ef4b7f0854?access_key=PMAT-01HGKCT5K7HT2KFKM1XMW9JV03).
