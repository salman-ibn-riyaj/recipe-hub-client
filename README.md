# 🍽️ RecipeHub - Client

RecipeHub is a modern recipe-sharing platform that brings food enthusiasts, home cooks, and professional chefs together in one community. Users can discover recipes from around the world, share their own culinary creations, save favorite dishes, and support talented creators by purchasing premium recipes. The platform encourages knowledge sharing, creativity, and a love for cooking while providing a seamless, secure, and personalized experience across all devices.

## 🌐 Live Demo

- Live Site: https://recipe-hub-ashen-phi.vercel.app

## 🔗 Repositories

- Client: https://github.com/kayesmahmud30/RecipeHub-Client
- Server: https://github.com/kayesmahmud30/RecipeHub-Server

## ✨ Features

- Better Auth authentication (Email/Password & Google)
- Browse and view recipe details
- Like, favorite, purchase, and report recipes
- Stripe payment integration for recipe purchases and premium membership
- User dashboard (Recipes, Favorites, Purchased Recipes, Profile)
- Admin dashboard (Users, Recipes, Reports, Transactions)
- Featured & Popular recipes
- Dark/Light theme
- Responsive UI with Framer Motion animations
- Pagination and category filtering

## 🛠️ Technologies Used

### 💻 Frontend

- Next.js
- React.js
- JavaScript (ES6+)
- Tailwind CSS
- HeroUI
- Framer Motion
- Lucide Icons

### ⚙️ Backend

- Node.js
- Express.js
- Better Auth
- JWT (JSON Web Tokens)
- Stripe
- Cloudinary

### 🗄️ Database

- MongoDB

## 🚀 Run Locally

```bash
git clone https://github.com/kayesmahmud30/RecipeHub-Client.git
cd RecipeHub-Client
npm install
npm run dev
```

## 🔐 Environment Variables

Create a `.env` file and add:

```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_BETTER_AUTH_URL=your_auth_url
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key
STRIPE_SECRET_KEY=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 👤 Admin Credentials

```text
Email: <mail>
Password: <password>
```

## 📄 License

This project is developed for educational and assessment purposes.
