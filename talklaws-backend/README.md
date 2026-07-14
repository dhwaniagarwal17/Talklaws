# TALKLAWS Backend

Node.js / Express / MongoDB backend for the TALKLAWS legal advisory website.

---

## Quick Start

### 1. Install dependencies
```bash
cd talklaws-backend
npm install
```

### 2. Set up environment variables
```bash
# Copy the example file
copy .env.example .env      # Windows
cp .env.example .env        # Mac/Linux

# Open .env and fill in:
# - MONGO_URI  (your MongoDB Atlas connection string)
# - JWT_SECRET (any long random string)
# - ADMIN_PASSWORD (your desired admin password)
```

### 3. Set up MongoDB Atlas (free)
1. Go to https://cloud.mongodb.com
2. Create a free cluster
3. Click Connect → Drivers → copy the connection string
4. Replace `<password>` with your DB user password
5. Paste it as MONGO_URI in your .env file

### 4. Create the admin account (run ONCE)
```bash
node utils/seeder.js
```
This creates the admin login using the credentials in your .env file.

### 5. Start the server
```bash
# Development (auto-restarts on file changes)
npm run dev

# Production
npm start
```

Server runs at: http://localhost:5000

---

## Testing with Thunder Client (VS Code extension)

1. Install "Thunder Client" from VS Code extensions
2. Create a new request
3. Test login:
   - POST http://localhost:5000/api/admin/login
   - Body → JSON: `{"email":"talklaws@gmail.com","password":"YourPassword"}`
   - Copy the token from the response
4. Test protected routes:
   - GET http://localhost:5000/api/admin/enquiries
   - Headers → Authorization: Bearer <paste token here>

---

## Deployment on Render (free tier)

1. Push this folder to a GitHub repository
2. Go to https://render.com → New → Web Service
3. Connect your GitHub repo
4. Set:
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add all .env variables in the Render dashboard → Environment tab
6. Deploy

Your API will be live at: https://your-app-name.onrender.com

---

## Project Structure

```
talklaws-backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # Login, profile, password change
│   └── enquiryController.js  # CRUD for contact form submissions
├── middleware/
│   ├── auth.js               # JWT protect middleware
│   ├── errorHandler.js       # Centralised error handler
│   ├── rateLimiter.js        # Rate limiting for contact + login
│   └── validate.js           # express-validator error checker
├── models/
│   ├── Admin.js              # Admin schema with password hashing
│   └── Enquiry.js            # Contact form submission schema
├── routes/
│   ├── adminRoutes.js        # /api/admin/* routes
│   └── contactRoutes.js      # /api/contact route
├── services/
│   └── enquiryService.js     # Business logic for enquiries
├── utils/
│   ├── AppError.js           # Custom error class
│   ├── generateToken.js      # JWT token generator
│   └── seeder.js             # Creates admin account in DB
├── .env.example              # Template for environment variables
├── .gitignore
├── API_DOCS.md               # Full API documentation
├── package.json
└── server.js                 # Entry point
```
