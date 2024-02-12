Below is the corrected version of the README with improved grammar and clarity:

---

# Parking System

This parking system is designed for ZipPark, a multi-level parking building in the metro.

## Installation

To install the parking system, you need to use npm, the package manager for JavaScript. If you don't have npm installed, you can get it from [here](https://www.npmjs.com/).

```bash
npm install
```

You also need to create a MongoDB Atlas account and set up a database. You can create an account [here](https://www.mongodb.com/cloud/atlas/register) and set up the `.env` file at the root directory:

```
DATABASE_URL='mongodb+srv://<username>:<password>@<clusterName>/?retryWrites=true&w=majority'
```

## Usage

### Swagger API Documentation 
localhost:5000/docs


### Create Parking Areas

First, create parking areas where 2 or 4-wheeled cars can park. Specify the parking building's levels, capacity, and current occupancy.

```javascript
curl --location 'localhost:5000/api/v1/car-parking/create-parking-area' \
--header 'Content-Type: application/json' \
--data '{
    "parkingAreas": [
        {
            "level": 1,
            "vacant": 60,
            "occupied": 0,
            "pwdSlots": [
                1,
                10,
                11,
                17,
                26,
                28,
                30,
                23
            ]
        }
    ]
}'
```

**Success Response**
```json
{
    "status": 200,
    "data": [
        {
            "level": 1,
            "vacant": 60,
            "occupied": 0,
            "pwdSlots": [
                1,
                10,
                11,
                17,
                26,
                28,
                30,
                23
            ],
            "_id": "65c9454462f675747cdc2f69",
            "__v": 0,
            "createdAt": "2024-02-11T22:08:04.945Z",
            "updatedAt": "2024-02-11T22:08:04.945Z"
        }
    ]
}
```

### Process Parking Car

Process a parking slot. The vehicleType expected values are "4W" or "2W".

``` 
curl --location 'localhost:5000/api/v1/car-parking/process' \
--header 'Content-Type: application/json' \
--data '{
    "vehicleType": "4W"
}'
```

**Success Response**
```json
{
    "status": 200,
    "data": {
        "floor": 1,
        "referenceNo": "24021206026476"
    }
}
```

### Create Parking Payment Invoice

Create a payment invoice specifying the parked hours of the car, payment amount, and payment method.

``` 
curl --location 'localhost:5000/api/v1/car-parking/create-payment' \
--header 'Content-Type: application/json' \
--header 'Access-Control-Allow-Origin: *' \
--data '{
    "referenceNo": "24021206026476",
    "paymentType": "Cash"
}'
```

**Success Response**
```json
{
    "status": 200,
    "data": {
        "paymentMode": "Cash",
        "amountToPay": 60,
        "referenceNo": "24021206026476",
        "parkedHours": 1,
        "vehicleDescription": "4 wheels"
    }
}
```

### Process Payment Invoice

Process the created parking payment invoice.

```
curl --location 'localhost:5000/api/v1/car-parking/process-payment' \
--header 'Content-Type: application/json' \
--header 'Access-Control-Allow-Origin: *' \
--data '{
    "paymentMode": "Cash",
    "amountToPay": "60",
    "referenceNo": "24021206026476",
    "parkedHours": "1"
}'
```

**Success Response**
```json
{
    "status": 200,
    "data": {
        "status": 200,
        "message": "Paid"
    }
}
```

### Get Parking Details

Get the parking details of a specific record by using the referenceNo 

```
curl --location 'localhost:5000/api/v1/car-parking/details?referenceNumber=24021206026476' \
--header 'Content-Type: application/json' \
--header 'Access-Control-Allow-Origin: *' \
--data ''
```

**Success Response**
```json
{
    "status": 200,
    "data": [
        {
            "_id": "24021206026476",
            "startTime": "2024-02-11T22:05:00.147Z",
            "vehicleType": "4W",
            "isPaid": true,
            "amountToPay": 60,
            "parkingReferenceNo": "24021206026476",
            "paymentReferenceNo": "240212060232-24021206026476",
            "paymentType": "Cash",
            "parkingLevel": 1,
            "createdAt": "2024-02-

11T22:08:13.646Z",
            "updatedAt": "2024-02-11T22:13:27.328Z",
            "__v": 0,
            "parkedHours": "2000-12-31T16:00:00.000Z"
        }
    ]
}
```

Get all parking details with the status is unpaid or ongoing.

```
curl --location 'localhost:5000/api/v1/car-parking/details' \
--header 'Content-Type: application/json' \
--header 'Access-Control-Allow-Origin: *' \
--data ''
```

**Success Response**
```json
{
    "status": 200,
    "data": [
        {
            "_id": "24021206024299",
            "startTime": "2024-02-11T22:05:00.147Z",
            "vehicleType": "4W",
            "isPaid": false,
            "amountToPay": 0,
            "parkingReferenceNo": "24021206024299",
            "paymentReferenceNo": null,
            "paymentType": "Cash",
            "parkingLevel": 1,
            "createdAt": "2024-02-11T22:05:35.429Z",
            "updatedAt": "2024-02-11T22:05:35.429Z",
            "__v": 0
        },
        {
            "_id": "24021206021686",
            "startTime": "2024-02-11T22:05:00.147Z",
            "vehicleType": "4W",
            "isPaid": false,
            "amountToPay": 0,
            "parkingReferenceNo": "24021206021686",
            "paymentReferenceNo": null,
            "paymentType": "Cash",
            "parkingLevel": 1,
            "createdAt": "2024-02-11T22:06:36.162Z",
            "updatedAt": "2024-02-11T22:06:36.162Z",
            "__v": 0
        }
    ]
}
```

### Add New Parking Entrance/Exit

To add more entrances or exits:

```
curl --location 'localhost:5000/api/v1/car-parking/create-access' \
--header 'Content-Type: application/json' \
--header 'Access-Control-Allow-Origin: *' \
--data '{
    "accessType": "entrance",
    "accessName": "E3",
    "located": 1
}'
```

```
curl --location 'localhost:5000/api/v1/car-parking/create-access' \
--header 'Content-Type: application/json' \
--header 'Access-Control-Allow-Origin: *' \
--data '{
    "accessType": "exit",
    "accessName": "E2",
    "located": 1
}'
```

**Success Response**
```
{
    "status": 200,
    "data": "success"
}
```

### Database Schema
## Building Access Collection

The `BuildingAccess` collection stores information about access points within a building, including entrances and exits.

### Schema

- **accessType**: String
  - Description: Specifies the type of access point.
  - Constraints:
    - Enumerated values: 'entrance', 'exit'
    - Required: Yes

- **accessName**: String
  - Description: Represents the name or identifier of the access point.
  - Constraints:
    - Required: Yes

- **located**: Number
  - Description: Indicates the location or floor number of the access point within the building.
  - Constraints:
    - Required: Yes

- **createdAt**: Date
  - Description: Represents the timestamp when the document was created.
  - Automatically generated by the system.

- **updatedAt**: Date
  - Description: Represents the timestamp when the document was last updated.
  - Automatically generated by the system.

### Example Document

```json
{
  "_id": "ObjectId",
  "accessType": "entrance",
  "accessName": "Main Entrance",
  "located": 1,
  "createdAt": "2022-02-12T12:00:00.000Z",
  "updatedAt": "2022-02-12T12:00:00.000Z"
}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.