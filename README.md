# MiniExtensions Frontend Developer Coding Challenge

Welcome to the MiniExtensions Frontend Developer coding challenge repository! This repository contains my solution to the challenge requirements provided by MiniExtensions for the Frontend Developer job position.

My Portfolio: https://www.friyad.site
\
\
\
![Website Photo](https://github.com/friyad/miniext-coding-challenge/assets/86700138/47d81f5d-28b0-447a-ab5b-8f8f1dc50be4)

## Challenge Requirements
The main challenge requirements were Integration phone number on authentication (Sign Up / Log In).

- Phone Number > Email
- Email > Phone Number

Ensure that linking a new email or phone number doesn't create a separate user object in Firebase.

## Solution Overview
To address the challenge requirements, I implemented the following solution:

- Integrated phone number authentication using Firebase Authentication with getting help from existing codes which were written for email and Google provider.
- Implemented a login flow that ensures users authenticate with both their phone number and email provider before accessing the home page content.
- Ensured that linking a new email or phone number does not create a separate user object in Firebase by leveraging Firebase Authentication features and maintaining a single user profile.

## Technologies Used
- Firebase
- Next JS
- JavaScript/TypeScript
- Tailwind CSS

## Getting Started
To run the application locally, follow these steps:
- Clone this repository to your local machine.
- Install dependencies by running 
```bash
npm install
# or
yarn install
```
- Configure Firebase Authentication and obtain necessary API keys.
- Start the development server by running 
```bash
npm run dev
# or
yarn dev
```
- Open your browser and navigate to http://localhost:3000 to view the application.

\
Thank you for considering my solution to the MiniExtensions Frontend Developer coding challenge. I look forward to discussing it further!