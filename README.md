# 🎓 ScholarCore – Scholarship Management System

**ScholarCore** is a full-stack web application designed to help students discover, apply for, and manage scholarships from a single platform. It offers a secure, user-friendly interface with Stripe payment integration, role-based dashboards, and Firebase authentication.

🔗 **Live URL**: [https://scholarship-management-s-4bf47.web.app/]

---

## 📌 Table of Contents

- [🎯 Purpose](#-purpose)
- [✨ Key Features](#-key-features)
- [💻 Frontend Stack](#-frontend-stack)
- [🛠️ Backend Stack](#-backend-stack)
- [🔐 Authentication & Security](#-authentication--security)
- [⚙️ Installation](#-installation)
- [🧾 Available Scripts](#-available-scripts)
- [📈 Future Improvements](#-future-improvements)
- [📄 License](#-license)

---

## 🎯 Purpose

The goal of ScholarCore is to simplify the scholarship process for students while providing powerful management tools for moderators and administrators. Whether it’s applying for scholarships, reviewing applications, or managing users — ScholarCore brings everything under one roof.

---

## ✨ Key Features

### 👨‍🎓 User Features
- Browse and **apply** for multiple scholarships
- **Stripe payment** integration for service fees
- Access personal **dashboard**:
  - View & update profile
  - Track, update, or cancel applications
  - Post and read **scholarship reviews**
- **Login** via email/password or Google
- Secure routes using **JWT authentication**

### 🛡️ Moderator Role
- Access all **scholarship listings**
- Manage all **user reviews**
- View and manage all **applications**
- Add, update, and delete scholarships
- Private **moderator dashboard**

### 👨‍💼 Admin Role
- All moderator privileges
- View **analytics dashboard**
- **Change user roles** (User ↔ Moderator ↔ Admin)
- **Remove users** from the platform

---

## 💻 Frontend Stack

Built with **React**, styled using **Tailwind CSS**, **DaisyUI**, and **shadcn/ui** components, powered by **Vite** for fast builds. Icons provided by **Lucide React**.

### 📦 Frontend Dependencies

- ⚛️ **React** – UI Library  
- 🧠 **React DOM** – DOM rendering  
- 🔄 **React Router** – Routing and navigation  
- 🎨 **Tailwind CSS** – Utility-first styling  
- 🌸 **DaisyUI** – Tailwind CSS component library  
- 🎨 **shadcn/ui** – Re-usable component library built with Radix UI and Tailwind CSS  
- 🧩 **Lucide React** – Beautiful & consistent icon library  
- 💳 **@stripe/react-stripe-js** – Stripe payment (React integration)  
- 💳 **@stripe/stripe-js** – Stripe client SDK  
- 🔥 **Firebase** – Authentication and cloud storage  
- 🍞 **React Hot Toast** – Toast notifications  
- 🎞️ **React Slick** – Carousel/slider component  
- 🛷 **Slick Carousel** – Styles for slick slider  
- 📊 **Recharts** – Charting and analytics  
- 🎬 **Lottie React** – Animated illustrations  
- 🌀 **Framer Motion** – UI animations

### 🧪 Dev Dependencies (Frontend)

- 🧼 **ESLint** – JavaScript linter  
- ♻️ **React Refresh Plugin** – Fast refresh for development  
- 🧠 **Type Definitions** – `@types/react`, `@types/react-dom`  
- 🌍 **Globals** – Recognized global variables  
- ⚡ **Vite** – Fast frontend tooling  

---

## 🛠️ Backend Stack

Built with **Node.js**, **Express**, and **MongoDB**, secured with **JWT** and integrated with **Stripe** for payment.

### 📦 Backend Dependencies

- 🚀 **Express** – Web server framework  
- 🌐 **CORS** – Enable cross-origin requests  
- 🔒 **Dotenv** – Manage environment variables  
- 🛡️ **JWT (jsonwebtoken)** – Token-based authentication  
- 🗃️ **MongoDB** – Database  
- 💳 **Stripe** – Backend payment integration

---

## 🔐 Authentication & Security

- **Firebase Auth**:
  - Email/password login
  - Google OAuth login
- **JWT Tokens**:
  - Role-based route protection
  - Session validation
- **Secure Payment**:
  - Stripe handles all sensitive payment data

---

## ⚙️ Installation

### 🖥️ Clone the Repository

```bash
git clone https://github.com/your-username/scholarcore.git
cd scholarcore

cd scholarship-management-system-clientside
npm install
npm run dev

cd scholarship-management-system-serverside
npm install
node index.js


