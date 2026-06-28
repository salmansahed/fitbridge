# 🏋️‍♂️ FitBridge - Fitness & Gym Management Platform

FitBridge is a modern, fully responsive, and secure **MERN Stack** Fitness & Gym Management Platform. It acts as a powerful bridge connecting fitness trainers, gym members, and administrators. Users can seamlessly book fitness classes, apply to become trainers, and participate in community forums.

## 🌐 Live Site Link
* **Live URL:** https://fitbridge-alpha.vercel.app/

---

## 🔥 Key Features

### 🔑 1. Advanced Authentication & Security (Auth & JWT)
* **Better-Auth Integration:** Secure sign-in system utilizing Google Login and standard credentials.
* **HTTPOnly Cookie JWT:** Tokens are securely generated on the backend and stored entirely within an HTTPOnly Cookie.
* **Role-Based Middleware:** Custom verification middleware implemented to protect Dashboard API routes for Users, Trainers, and Admins.

### 🛡️ 2. Dynamic Role-Based Dashboards
* **User Dashboard:** Members can view visual stat cards for their Total Bookings and Total Favorites, track their live Trainer Application status, manage their favorite classes list, and view successfully booked classes in a clean table format.
* **Trainer Dashboard:** Trainers can add new fitness classes (defaulting to a Pending status), manage or delete their own classes and forum posts, and view the names and emails of enrolled students for each class using an interactive modal.
* **Admin Control Panel:** A comprehensive one-stop solution for managing the user roster, reviewing trainer applications (with a custom feedback field for approval/rejection), demoting active trainers, moderating classes, and monitoring all Stripe transaction histories.
* **Admin Soft Block (Special Logic):** When an Admin blocks a user, backend middleware restricts them from making any state changes—such as posting comments, booking classes, or submitting trainer applications—and displays an error toast message, while still allowing them to log in and browse classes or forums.

### 💳 3. Payment & Class Booking System (Stripe Integration)
* **Stripe Checkout:** Clicking "Book Now" triggers dynamic validation checks (disabling the button if already booked). For new bookings, users are securely redirected to the Stripe payment gateway to complete the transaction.
* **Favorites Toggle:** An interactive content UI allows users to save any class to their favorites list or remove them instantly without requiring a page refresh.

### 💬 4. Community Forum & Interaction
* **Voting System:** Authenticated members can cast "Helpful" or "Not Helpful" votes on informative posts created by Trainers and Admins.
* **Comments & Moderation:** A real-time comments section allows users to read, post, reply to, edit, or delete their own comments, while Admins retain the ability to moderate and delete inappropriate posts.

### 🔍 5. Optimized Data Fetching & UI (UX & SEO)
* **Advanced Search & Filter:** Enhanced class searching using MongoDB \$regex and category filtering built with MongoDB \$in operators.
* **Server-side Pagination:** Implemented server-side pagination on both the All Classes page and the Community Forum page to maintain optimal page loading speeds.
* **Dynamic Site-Wide Metadata:** Configured Next.js metadata templates to dynamically handle SEO-friendly page titles (e.g., `Contact | FitBridge`).
* **Premium Theme with Dark Mode:** Clean user interface supporting full Dark/Light theme toggling, sleek glassmorphism elements, and smooth Framer Motion animations.

---

## 🛠️ Tech Stack Used

### Frontend:
* Next.js (App Router)
* Tailwind CSS v4
* HeroUI (Component Library)
* Better Auth (Authentication Framework)
* Framer Motion (Animation Library)
* React Icons (Icon Library)
* React Toastify (Instant Notification Toasts)

---

## ⚙️ Local Setup

### 1. Frontend Setup:
```bash
cd fitbridge-client
npm install

.env
# Better Auth Configuration
BETTER_AUTH_SECRET=your_better_auth_secret_here
BETTER_AUTH_URL=http://localhost:3000

# OAuth Provider
GOOGLE_CLIENT_ID=your_google_client_id_here

# API & Server URLs
NEXT_PUBLIC_SERVER_URL=http://localhost:4000
NEXT_PUBLIC_IMAGE_UPLOAD_API=your_imgbb_api_key_here

# Database Configuration (If handled via Next.js)
MONGODB_URI=your_mongodb_atlas_connection_uri
MONGODB_DATABASE=your_database_name