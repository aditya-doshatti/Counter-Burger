# Menu Module APIs


### APIs to process Menu in GoLang
### Server running in Kubernetes on AWS

**Attributes**

List of all Attributes in a Menu Object (Attributed in struct)

|Name	| Type | Description|
|---------------|-------|------------|
|ItemId |String |Autogenerated |
|ItemName | String | Name of the item |
|Price | Integer  | Price of the item|
|Description |String |Description of the Item |
|ItemType	| String | Type of the item|

1. Ping the API endpoint
    **Request**
    ```
    GET /menu/ping
    Content-Type: application/json
    ```
    **Response**
    ```
    {
    "Test": "Burger Menu API Server Working on machine: 10.20.2.5"
    }
    ```


2. Get Menu details for a restaurant

    **Request**
    ```
    GET /menu
    Content-Type: application/json
    ```
   
    **Response Body**

    |Parameter	|Type |	Description|
    |-----------|-------|--------------------|
    |ItemId |String |Autogenerated |
    |ItemName | String | Name of the item |
    |Price | Integer  | Price of the item|
    |Description |String |Description of the Item |
    |ItemType	| String | Type of the item|

    **Response Body Error**
    (Status code: 404)

    |Parameter	|Type |	Description|
    |-----|-----|------|
    |messsage	|String|Error string|


2. Post an Order

    **Request**
    ```
    POST /order
    Content-Type: application/json
    ```

    **Request Body**

    (Status code: 200)

    |Parameter	|Type |	Description|
    |-----|-----|------|
    |ItemId |String |Autogenerated |
    |ItemName | String | Name of the item |
    |Price | Integer  | Price of the item|
    |Description |String |Description of the Item |
    |ItemType| String | Type of the item|

    (Status code: 404)

    |Parameter	|Type |	Description|
    |-----|-----|------|
    |message	|String|Error string|


