🌍 Wanderlust Clone

A full-stack Wanderlust (Airbnb-style) clone built with Node.js, Express, MongoDB, and EJS, featuring complete CRUD functionality, authentication, image uploads, and a fully working MongoDB database.

🚀 Features

🔐 User Authentication (Signup / Login / Logout)

🏡 Create, Read, Update, Delete Listings

🖼️ Image Upload Support (Cloudinary / Local)

✍️ Reviews & Ratings System

🗺️ Map Integration (Location-based listings)

🧾 Secure Sessions & Authorization

📦 MongoDB Database with Mongoose

🎨 Responsive UI using EJS & Bootstrap

🛠️ Tech Stack

Frontend

EJS (Embedded JavaScript Templates)

HTML5, CSS3, Bootstrap

Backend

Node.js

Express.js

Database

MongoDB

Mongoose ODM

Authentication & Utilities

Passport.js

Express-session

Multer (File Uploads)

Cloudinary (Image Hosting)

Dotenv (Environment Variables)

📂 Project Structure
wanderlust-clone/
│── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│── routes/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
│── views/
│   ├── listings/
│   ├── layouts/
│   └── users/
│── public/
│   ├── css/
│   └── js/
│── middleware.js
│── app.js
│── seed.js
│── package.json
│── .env
⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/wanderlust-clone.git
cd wanderlust-clone
2️⃣ Install Dependencies
npm install
3️⃣ Configure Environment Variables

Create a .env file in the root directory:

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret
DB_URL=mongodb://127.0.0.1:27017/wanderlust
SECRET=session_secret
🗄️ MongoDB Database Setup
▶️ Start MongoDB

Make sure MongoDB is running locally:

mongod
▶️ Seed the Database (Optional)
node seed.js

This will populate the database with sample listings.

▶️ Run the Project
node app.js

or (with nodemon):

nodemon app.js

Now open your browser and visit:

http://localhost:3000
🔑 Authentication Flow

Users must log in to create or edit listings

Only the listing owner can edit or delete their listings

Reviews can only be added by logged-in users

📸 Image Upload Flow

Images are uploaded using Multer

Stored securely on Cloudinary

Image URLs are saved in MongoDB

🧪 Sample MongoDB Schema (Listing)
const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  location: String,
  country: String,
  image: {
    url: String,
    filename: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});
📌 Future Enhancements

Payment Gateway Integration

Wishlist Feature

Booking System

Admin Dashboard

Search & Filters

👨‍💻 Author

Pushkaraj Jagatap
Computer Science Student | Web Developer

📄 License

This project is for learning and educational purposes only.

⭐ If you like this project, give it a star and feel free to fork it!