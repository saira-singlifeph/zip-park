

# Parking System

This parking system is designed for ZipPark, a multi-level parking building in the metro.

## Installation

```markdown
# Installation Guide

To install the parking system, follow the steps below:

## 1. Install npm

Make sure you have npm installed, which is the package manager for JavaScript. If you don't have npm installed, you can download and install it from [here](https://www.npmjs.com/).

## 2. Node.js Version

Ensure that your Node.js version is >18 and higher.

## 3. Install Dependencies

Run the following command in your terminal to install the required dependencies:

```bash
npm install
```

## 4. MongoDB Atlas Setup

- Create a MongoDB Atlas account [here](https://www.mongodb.com/cloud/atlas/register).
- Set up a MongoDB database.
- Create a `.env` file at the root directory of your project.
- Add the following line to the `.env` file, replacing `<username>`, `<password>`, and `<clusterName>` with your MongoDB Atlas credentials:

```plaintext
DATABASE_URL='mongodb+srv://<username>:<password>@<clusterName>/?retryWrites=true&w=majority'
```

## 5. Populate Configurations Table

After setting up the database, open your terminal, ensure you are in the root directory of your project, and run the following command to populate the configurations table for pricing:

```bash
nodemon mongodb/index.js --importData
```

## 6. Postman Collection

You can use the Postman collection for API Testing [here](https://github.com/saira-singlifeph/zip-park/blob/main/Zip%20Parking%20System.postman_collection.json).


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

## Database Schema

![screenshot](https://github.com/saira-singlifeph/zip-park/blob/main/diagrams/Screen%20Shot%202024-02-12%20at%209.56.13%20AM.png)

### Building Access Collection

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

---

## Configurations Collection

The `Configurations` collection stores parking rate configurations for different vehicle types.

### Schema

- **_id**: String
  - Description: Unique identifier for each configuration document.
  - Constraints:
    - Required: Yes

- **vehicleType**: String
  - Description: Type of vehicle for which the configuration applies.
  - Constraints:
    - Required: Yes

- **flatRate**: Number
  - Description: Flat rate charged for parking, regardless of the duration.
  - Constraints:
    - Required: Yes

- **flatHour**: Number
  - Description: Duration (in hours) covered by the flat rate.
  - Constraints:
    - Required: Yes

- **succeedingRate**: Number
  - Description: Rate charged for each succeeding hour after the flat rate duration.
  - Constraints:
    - Required: Yes

- **succeedingHour**: Number
  - Description: Duration (in hours) after which the succeeding rate applies.
  - Constraints:
    - Required: Yes

### Example Document

```json
{
  "_id": "1",
  "vehicleType": "Car",
  "flatRate": 5,
  "flatHour": 2,
  "succeedingRate": 2,
  "succeedingHour": 1
}
```


---

## Parking Area Collection

The `ParkingArea` collection stores information about parking areas within the parking system.

### Schema

- **level**: Number
  - Description: Specifies the level or floor of the parking area.
  - Constraints:
    - Required: Yes

- **available**: Number
  - Description: Total number of available parking slots in the area.
  - Constraints:
    - Required: Yes

- **vacant**: Number
  - Description: Number of vacant parking slots in the area.
  - Constraints:
    - Required: Yes

- **occupied**: Number
  - Description: Number of occupied parking slots in the area.
  - Constraints:
    - Required: Yes

- **pwdSlots**: Array
  - Description: List of parking slots designated for persons with disabilities (PWDs).
  - Constraints:
    - Required: Yes

- **createdAt**: Date
  - Description: Timestamp indicating when the document was created.
  - Automatically generated by the system.

- **updatedAt**: Date
  - Description: Timestamp indicating when the document was last updated.
  - Automatically generated by the system.

### Example Document

```json
{
  "level": 1,
  "available": 100,
  "vacant": 80,
  "occupied": 20,
  "pwdSlots": [1, 5, 10],
  "createdAt": "2022-02-12T12:00:00.000Z",
  "updatedAt": "2022-02-12T12:00:00.000Z"
}
```

---

## Parking Details Collection

The `ParkingDetails` collection stores information about parked vehicles in the parking system.

### Schema

- **_id**: String
  - Description: Unique identifier for the parking record.
  - Constraints:
    - Required: Yes

- **startTime**: Date
  - Description: Timestamp indicating when the vehicle was parked.
  - Constraints:
    - Required: Yes
    - Default: Current timestamp (Date.now())

- **parkedHours**: Date
  - Description: Duration for which the vehicle has been parked.
  - Constraints:
    - Required: No

- **vehicleType**: String
  - Description: Type of the parked vehicle.
  - Constraints:
    - Enumerated values: '2W', '4W'
    - Required: Yes

- **isPaid**: Boolean
  - Description: Indicates whether the parking fee has been paid for the vehicle.
  - Constraints:
    - Required: Yes
    - Default: false

- **amountToPay**: Number
  - Description: Amount to be paid for parking.
  - Constraints:
    - Required: Yes
    - Default: 0

- **parkingReferenceNo**: String
  - Description: Reference number for the parking transaction.
  - Constraints:
    - Required: Yes

- **paymentReferenceNo**: String
  - Description: Reference number for the payment transaction.
  - Constraints:
    - Default: null

- **paymentType**: String
  - Description: Method of payment for parking.
  - Constraints:
    - Enumerated values: 'GCash', 'Cash'
    - Default: 'Cash'

- **parkingLevel**: Number
  - Description: Level or floor of the parking area where the vehicle is parked.
  - Constraints:
    - Required: Yes

- **createdAt**: Date
  - Description: Timestamp indicating when the document was created.
  - Automatically generated by the system.

- **updatedAt**: Date
  - Description: Timestamp indicating when the document was last updated.
  - Automatically generated by the system.

### Example Document

```json
{
  "_id": "609b9b42e2e603181c05b212",
  "startTime": "2022-05-12T08:30:00.000Z",
  "parkedHours": null,
  "vehicleType": "4W",
  "isPaid": false,
  "amountToPay": 0,
  "parkingReferenceNo": "ABC123",
  "paymentReferenceNo": null,
  "paymentType": "Cash",
  "parkingLevel": 1,
  "createdAt": "2022-05-12T08:30:42.503Z",
  "updatedAt": "2022-05-12T08:30:42.503Z"
}
```



## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
