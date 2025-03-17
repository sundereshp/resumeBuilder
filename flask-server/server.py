import mysql.connector
import bcrypt
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

# Database setup
db_config = {
    'user': 'root',
    'password': 'Vishal@003',
    'host': 'localhost'
}

# Create a connection to MySQL without specifying a database
conn = mysql.connector.connect(**db_config)
cursor = conn.cursor()

# Create database if it doesn't exist
cursor.execute("CREATE DATABASE IF NOT EXISTS resume_sunderesh")
conn.commit()

# Now connect to the newly created database
db_config['database'] = 'resume_sunderesh'
conn.close()  # Close the previous connection
conn = mysql.connector.connect(**db_config)
cursor = conn.cursor()

# Create users table if it doesn't exist
cursor.execute('''
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
)
''')
conn.commit()

cursor.execute('''CREATE TABLE IF NOT EXISTS heading (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    city VARCHAR(100),
    country VARCHAR(100),
    pincode VARCHAR(20),
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    linkedin VARCHAR(255),
    website VARCHAR(255),
    driving_licence VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);''')
conn.commit()

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    name = data['name']
    email = data['email']
    password = data['password']

    # Check if the email already exists
    cursor.execute('SELECT * FROM users WHERE email = %s', (email,))
    existing_user = cursor.fetchone()
    
    if existing_user:
        return jsonify({'message': 'Email already in use!'}), 400

    # Store plain password directly
    hashed_password = password  

    cursor.execute('INSERT INTO users (name, email, password) VALUES (%s, %s, %s)', (name, email, hashed_password))
    conn.commit()

    return jsonify({'message': 'User created successfully!'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']

    cursor.execute('SELECT * FROM users WHERE email = %s', (email,))
    user = cursor.fetchone()

    if user:
        if password == user[3]:  # Compare plain passwords
            return jsonify({'message': 'Login successful!'}), 200

    return jsonify({'message': 'Invalid credentials!'}), 401

@app.route('/heading', methods=['POST'])
def save_heading():
    try:
        data = request.json
        section = data.get('section')

        # Ensure section is 'heading' before proceeding
        if section != 'heading':
            return jsonify({'error': 'Invalid section'}), 400

        form_data = data.get('data', {})

        sql = """INSERT INTO heading 
                 (first_name, surname, city, country, pincode, phone, email, linkedin, website, driving_licence)
                 VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""

        values = (
            form_data.get('firstName', ''),
            form_data.get('surname', ''),
            form_data.get('city', ''),
            form_data.get('country', ''),
            form_data.get('pincode', ''),
            form_data.get('phone', ''),
            form_data.get('email', ''),
            form_data.get('linkedin', ''),
            form_data.get('website', ''),
            form_data.get('drivingLicence', '')
        )

        cursor.execute(sql, values)
        conn.commit()

        return jsonify({'message': 'Data saved successfully'}), 201

    except Exception as e:
        print('Error:', str(e))
        return jsonify({'error': 'Failed to save data'}), 500
  
if __name__ == '__main__':
    app.run(debug=True)