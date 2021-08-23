# Getir_Records
To create a RESTful API with a single endpoint that fetches the data in the provided MongoDB collection and return the results in the requested format.

# How to use the API

 * **URL**

   `https://node-assignment-records.herokuapp.com/assignment/api/v1.0/record/getAll`

* **Method:**
  
   `POST`

* **Data Params**

  ```
    startDate, endDate, minCount, maxCount
  ```
   **Required:**
 
   `startDate=[Date]`
   `endDate=[Date]`
   `minCount=[Integer]`
   `maxCount=[Integer]`
   
* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
     ``` 
    {  
       code:[Integer],  // 0
       msg:[String],    // Success
       records:[ Array of {"key":[String], "createdAt":[String],"totalCount":[Integer]}]        // Retrived records or record if any
    }
    ```

* **Error Response:**

  * **Code:** 404 RESOURCE NOT FOUND <br />
    **Content:** 
    ```
    {
     "code": -1,
     "msg": "The requested data was not found!"
    }
    
    ```

  OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:**
      ```
      {
          "code": -1,
          "msg": [
              {
                  "msg": "Invalid value",
                  "param": "maxCount",
                  "location": "body"
              }
          ]
      }
     ```
     
   OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**
      ```
      {
      "code": -1,
      "msg": "Unexptected error! Please try after some time!",
      }
     ```

* **Sample Call:**

  ```
  curl --header "Content-Type: application/json" \ 
       --request POST \
       --data '{"startDate":"2016-01-26","endDate": "2018-02-02","minCount":2700,"maxCount":5000}' \
        https://node-assignment-records.herokuapp.com/assignment/api/v1.0/record/getAll
  ```
  Response
  
  ```
  {
    "code": 0,
    "msg": "Success",
    "records": [
        {
            "key": "udZfCkvB",
            "createdAt": "2016-05-15T00:36:34.126Z",
            "totalCount": 2701
        },
        {
            "key": "vZZOIiPi",
            "createdAt": "2016-03-02T09:30:26.664Z",
            "totalCount": 2701
        }
    ]
   }
  
  ```
  
# Running the API 

```
git init https://github.com/rhtrai2/assignment_getir.git 
git clone
npm i
npm start
```
The API will run on the localhost with port 51505


# Running the API
```
npm start
```
# Testing the API
```
jest --watchAll
```
# Deploying the API

The API can be deployed on any platform like Heroku or AWS and make sure to set the `dbUrl` in /env  folder accordingly.

# Author
rhtrai2


