# React + Vite Movie Project

Movie Explorer is a modern, responsive web application that lets you discover, search, and explore trending movies with ease. Built with React, Tailwind CSS, and Appwrite, this app provides a seamless user experience with real-time search, trending analytics, and a beautiful UI.

# 🚀 Features

Search Movies: Instantly search through thousands of movies using The Movie Database (TMDB) API.

Trending Movies: See what’s popular! Trending movies are dynamically ranked based on user searches and stored in Appwrite.

Modern UI/UX: Clean, responsive design powered by Tailwind CSS for a delightful experience on any device.

Debounced Search: Efficient search input that waits for you to stop typing before making API requests.

Loading States: Smooth loading spinners and error handling for a polished feel.

Appwrite Integration: Tracks and displays trending movies based on real user activity.


# 🛠️ Tech Stack
React 19 – Modern component-based UI

Tailwind CSS 4 – Utility-first, responsive styling

Vite – Lightning-fast development and build tool

Appwrite – Cloud backend for trending analytics

TMDB API – Movie data source

Some Info about the Project:
After running the vite commands and npm install, here is the starter code.
The vite.config.js: this file allows you to customize the build process by adding plugins and more

The ReadME.md contains the information about the project, like how to run it and what the project does

The package.json file contains metadata about the project, including the name, scripts, and dependencies. The dev script starts the development server, while the build script creates the production build (npm run build) after you install the necessary dependencies.

Package-lock.json: This file is auto-generated when you run npm install, and it locks down the versions of the dependencies in your project, making sure the same dependencies will be installed, making sure your app runs perfectly

Index.html: This is the main HTML file within which your app is loaded Vite uses the root dev as the main entry point of the application and script

eslint.config.js: This is used to define the rules and settings of ESLint (a popular lending tool that helps you identify and fix problems in your code, such as coding style violations, and errors)

Gitignore: this file tells git which files to ignore when committing your code, you never want to push NODE MODULES to GitHub or .env files

Node Modules: include all the installed dependencies for your project, everything from react, vite, … don't need to interact with this

Public: this folder has all the static assets such as images, icons, and other files that don't need to go through Vite's bundler

Src: this is where the React components and JavaScript logic go, Tailwind CSS will be applied here,

App.jsx is where the main UI of your app will be applied

Main.jsx is your app's entry point, where React is rendered into the document.

Index.css is where you define the global styles of your app

Assets: has all the media icons, like images or icons

app.css is the styling file for the app.jsx file

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
