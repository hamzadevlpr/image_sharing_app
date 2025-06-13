
# 📸 Image Sharing Web App

An advanced image sharing platform built with **Next.js**, **MySQL**, and **TypeORM** that allows users to upload and share images publicly or privately. Users can manage their images, set privacy controls, and share links with others.

---

## 🚀 Getting Started

This guide will help you get the Image Sharing Web App up and running locally for development and testing.

---

### 📦 Tech Stack

- **Frontend**: Next.js (App Router), React, TailwindCSS
- **Backend**: Next.js API Routes, TypeORM (MySQL)
- **Database**: MySQL
- **ORM**: TypeORM
- **File Storage**: (Optional: Cloudinary, AWS S3, or local storage)
- **Authentication**: JWT / NextAuth.js (depending on implementation)
- **Image Privacy**: Public / Private sharing logic

---

## 🔧 Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v18+ recommended)
- **npm** or **yarn**
- **MySQL Server** (local or hosted)
- **Cloudinary Account (optional)** for image storage

---

## 🗂 Project Structure (simplified)

```

/project-root
├── /app (Next.js App Router)
├── /components (Reusable frontend components)
├── /lib (DB connection, utils)
├── /entities (TypeORM entities)
├── /services (Business logic / APIs)
├── /public (Static files)
├── /uploads (if using local storage)
├── /api (API routes)
├── .env.local
├── next.config.js
└── package.json

````

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/image-sharing-app.git
cd image-sharing-app
````

### 2️⃣ Install dependencies

```bash
npm install
# or
yarn install
```

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
# Application
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# MySQL Database
HOST=localhost
DB_PORT=3306
DBUSERNAME=your_mysql_user
DBPASSWORD=your_mysql_password
DATABASE=image_sharing_app

# JWT (If using JWT for authentication)
JWT_SECRET=your_super_secret_key

# Cloudinary (Optional if using Cloudinary)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

```

---

## 🗄️ Setup MySQL Database

Make sure MySQL server is running.

You can manually create the database:

```sql
CREATE DATABASE image_sharing_app;
```

TypeORM will handle table creation automatically when you run the app if `synchronize: true` is set in your `DataSource`.

---

## ⚙️ Setup TypeORM

Configure TypeORM data source (`lib/data-source.ts` or equivalent):

```typescript
import { DataSource } from "typeorm";
import { User } from "@/entities/User";
import { Image } from "@/entities/Image";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Image],
  synchronize: true, // Set to false in production
  logging: false,
});
```

You can expand entities as needed.

---

## 🖼️ Core Features

* ✅ User Registration & Login
* ✅ JWT-based Authentication (or NextAuth)
* ✅ Upload Images (Cloudinary or Local)
* ✅ Public / Private Sharing
* ✅ Generate Shareable Links
* ✅ User Dashboard to manage uploaded images
* ✅ View counts, downloads, and analytics (optional)

---

## ▶️ Running the App

### 1️⃣ Start the development server

```bash
npm run dev
# or
yarn dev
```

The app will be running at:

```
http://localhost:3000
```

### 2️⃣ Access API Routes

Example:

* `POST /api/auth/register` – register new user
* `POST /api/auth/login` – login
* `POST /api/images/upload` – upload image
* `GET /api/images/:id` – view image
* `GET /api/images/public` – fetch public images

*(Routes may vary depending on your implementation structure)*

---

## 🚀 Production Deployment

You can deploy the app to:

* **Vercel** (recommended for Next.js)
* **Render**
* **DigitalOcean**
* **AWS / GCP / Azure**

⚠️ Make sure to:

* Set `synchronize: false` in TypeORM for production
* Use proper CORS, security headers, and HTTPS

---

## 📂 Sample Entity Models

### User Entity (`entities/User.ts`)

```typescript
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Image } from "./Image";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Image, (image) => image.user)
  images: Image[];
}
```

### Image Entity (`entities/Image.ts`)

```typescript
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  title: string;

  @Column({ default: false })
  isPrivate: boolean;

  @ManyToOne(() => User, (user) => user.images)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
```

---

## ⚠️ Notes

* You can choose between **local file uploads** or **Cloudinary** integration.
* For local uploads, ensure the `/uploads` directory exists and is writable.
* Implement proper security measures: rate limiting, authentication, input validation, etc.
* Use environment variables for all secrets.

---

## 🧪 Testing

You can use tools like **Postman** or **Insomnia** to test API endpoints during development.

---

## 📖 Future Improvements (optional)

* ✅ Image tagging and search
* ✅ Social sharing
* ✅ Admin dashboard
* ✅ Image comments & likes
* ✅ Rate limiting for uploads
* ✅ Watermark support

---

## ❤️ Contribution

PRs are welcome. Please fork the repo and submit your pull requests.

---

## 📝 License

This project is open-sourced under the MIT License.

---
