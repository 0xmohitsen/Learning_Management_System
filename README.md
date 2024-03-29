# Learning Management System (LMS)

Learning Management System (LMS) is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) project designed to provide a comprehensive platform for managing courses and user profiles.

## Project Video

https://github.com/Mohitsen11/Learning_Management_System/assets/114509045/3531f95e-156e-4eae-8ec7-3d3809c3e109

## Features

- **Authentication and Authorization**: Secure user authentication and authorization with role-based access control.
- **Course Listing**: Display courses fetched from the backend via API calls, providing users with access to course details and descriptions.
- **Frontend Design**: Utilizes Daisy UI and Tailwind CSS to create an aesthetically pleasing and responsive frontend interface.
- **User Profile Functionality**: Enables users to perform CRUD (Create, Read, Update, Delete) operations on their profiles, including updating personal information and uploading profile images.
- **Admin Role**: Grants administrative privileges to create, update, and manage courses, as well as perform CRUD operations on user profiles.
- **Mailing Mechanism**: Implements a mailing mechanism for the "forgot password" functionality, ensuring seamless user experience and security.
- **Cloudinary Integration**: Utilizes Cloudinary for storing user profile images, providing efficient and reliable image storage and retrieval.
- **Password Hashing**: Uses bcrypt to securely hash user and admin passwords before storing them in MongoDB.
- **Course Subscription**: Enables users to subscribe and unsubscribe from courses, with smooth payment integration using Razorpay.

## Technologies Used

- **Frontend**: React.js, Daisy UI, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT), bcrypt
- **Payment Integration**: Razorpay
- **Image Storage**: Cloudinary

## Getting Started

To get started with the Learning Management System (LMS), follow these steps:

### Setup instructions

1. Clone the project

```
  https://github.com/Mohitsen11/Learning_Management_System.git
```

2. Move into the directory

```
   cd Learning_Management_System
```
# LMS FRONTEND

1. Move into the directory

```
   cd Frontend
```

2. Install dependencies

```
   npm i
```

3. Run the server

```
   npm run dev
```

### How to setup tailwind in your project [Link]
(https://tailwindcss.com/docs/guides/vite)

1. Install tailwind and other dependencies

```
   npm install -D tailwindcss postcss autoprefixer
```

2. Create `tailwind.config.js` file

```
   npx tailwindcss init -p
```

3. Add the files and extensions to the tailwind config file in content property

```
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
```

4. Add the tailwind directives on the top of src/index.css file

```
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
```

5. Then run the server, tailwind should be integrated...


### Adding plugins and dependencies

```
   npm install @reduxjs/toolkit react-redux react-router-dom react-icons daisyui axios react-hot-toast @tailwindcss/line-clamp
```

### Adding auto import sort for eslint

1. Install the plugin

```
   npm i eslint-plugin-simple-import-sort
```

2. Add rule in `.eslintrc.cjs` file

```
   'simple-import-sort/imports': 'error',
```

3. Add simple-import-sort in plugins array in `.eslintrc.cjs` file

```
   plugins: [... , 'simple-import-sort'],
```

4. Open settings.json in vscode configuration settings

5. Add the following line

```
   "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true 
    }
```
# LMS BACKEND

1. Move into the directory

```
   cd Backend
```

2. Install dependencies

```
   npm i
```

3. Run the server

```
   npm run dev
```

## OPEN THE BROWSER AND HIT THIS ADDRESS

```
http://localhost:5173/
```

## Contributing

Contributions to the Learning Management System (LMS) project are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.
