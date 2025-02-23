import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase Admin SDK
cred = credentials.Certificate("./firebase-auth.json")  # Update the path to the new credentials file
firebase_admin.initialize_app(cred)
db = firestore.client()

# Sample product data
products = [
    {
        "name": "Product 6",
        "description": "Description for product 1",
        "price": 19.99,
        "image_url": "https://example.com/product1.jpg",
        "category": "Category 1"
    },
    {
        "name": "Product 7",
        "description": "Description for product 2",
        "price": 29.99,
        "image_url": "https://example.com/product2.jpg",
        "category": "Category 2"
    },
    {
        "name": "Product 8",
        "description": "Description for product 3",
        "price": 39.99,
        "image_url": "https://example.com/product3.jpg",
        "category": "Category 3"
    },
    {
        "name": "Product 9",
        "description": "Description for product 4",
        "price": 49.99,
        "image_url": "https://example.com/product4.jpg",
        "category": "Category 4"
    },
    {
        "name": "Product 10",
        "description": "Description for product 5",
        "price": 59.99,
        "image_url": "https://example.com/product5.jpg",
        "category": "Category 5"
    }
]

# Add products to Firestore
for product in products:
    db.collection('products').add(product)

print("Products added successfully!")