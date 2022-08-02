# hybr1d
NodeJS CRUD Application to implement OnlineShopping

Steps to Run Application:

Clone Repository on your local system
Get into the cloned folder
RUN command npm i
RUN command npm start 5 Import the postman collection to run the Application
ENDPOINTS-

REGISTER USER: POST http://localhost:3000/api/auth/register BODY {"username": "monuenterprise","password": "monu@123","userType": "seller"}

LOGIN USER: POST http://localhost:3000/api/auth/login BODY {"username": "parth", "password": "parth@123"}

ADD PRODUCTS: POST http://localhost:3000/api/seller/addProducts BODY
{
    "catalog": [
        {
            "itemName": "guns",
            "itemCategory": "weapons",
            "itemPrice":5000
        },
        {
            "itemName": "bullets",
            "itemCategory": "weapons",
            "itemPrice":132
        },
        {
            "itemName" : "silencer",
            "itemCategory" :"weapons",
            "itemPrice": 799
        }
    ]
}

LIST OF SELLERS: GET http://localhost:3000/api/buyer/list-of-sellers

CREATE CATALOG: POST http://localhost:3000/api/seller/create-catalog BODY
{
    "itemName": "fiction novels",
    "seller_id": "ca0eaky"
}

VIEW CATALOG BY SELLER ID: GET http://localhost:3000/api/seller/seller-catalog/0p09acw

CREATE ORDER: POST http://localhost:3000/api/buyer/create-order/0p09acw BODY
{
    "items":[
                {
                    "itemName": "guns",
                    "itemCategory": "weapons",
                    "itemPrice": 5000
                },
                {
                    "itemName": "bullets",
                    "itemCategory": "weapons",
                    "itemPrice": 132
                }
        ]
}

VIEW ORDERS: GET http://localhost:3000/api/seller/orders

LOGOUT: PUT http://localhost:3000/api/buyer/logout?username=