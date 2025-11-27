# CarRental — Buy | Sell | Rent Cars

A modern, responsive car marketplace built with **React + Vite**, where users can:
- Buy cars
- Sell cars
- Rent cars
- View services
- Book a car online
- Manage their profile & listings

**Tech Stack:** React, Vite, Tailwind CSS, LocalStorage (for demo authentication & listings)

---

## 🚗 Features

### **Home Page**
- Hero banner with blue & white theme
- Featured car cards
- Quick navigation to Buy, Sell, Rent

### **Buy Cars**
- List of available cars with details
- Search & filter functionality

### **Sell Cars**
- Post your own car for sale
- Fields: Brand, Model, Price, Image URL
- Data stored locally for demo

### **Rent Cars**
- Available cars for rent
- Booking option for each

### **Booking Page**
- Shows selected car details
- Booking form: Pickup Date, Return Date, Pickup Location, Contact
- Confirmation message after booking

### **Services Page**
- Car servicing, insurance, and maintenance offers

### **Authentication**
- Login / Signup with LocalStorage
- Profile page to manage user data

---

## 🛠️ Installation & Setup

### **1. Clone or Download**
Unzip the project or clone it from your repository.

```bash
cd car-rental-react



2. Install dependencies

Make sure you have Node.js (v18+) installed.

npm install

3. Run Development Server
npm run dev


Open the URL shown in the terminal (e.g., http://localhost:5173).

4. Build for Production
npm run build
npm run preview

📂 Project Structure
car-rental-react/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable components
│   ├── pages/          # Page components (Home, Buy, Sell, Rent, Booking, Profile)
│   ├── App.jsx         # App entry point
│   ├── main.jsx        # React DOM render
│   └── styles.css      # Tailwind & custom styles
├── package.json        # Project config & dependencies
├── vite.config.js      # Vite config
└── README.md           # Project documentation

🎨 Design

Theme: Blue + White, clean, modern

Fully responsive: works on mobile, tablet, desktop

Rounded cards, smooth hover effects

🔮 Future Improvements

Backend integration (Node.js + MongoDB or Firebase)

Real payment gateway for rentals
           
Admin dashboard

User profile picture & advanced settings

