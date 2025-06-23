MMIW Community Board
A full-stack web application built to raise awareness for Missing and Murdered Indigenous Women (MMIW). Users can share stories, comment, and engage with the platform to elevate voices and raise visibility.

Live Site
https://mmiw-latest.onrender.com

Tech Stack
Frontend

React

Redux

React Router

Vite

Backend

Python

Flask

SQLAlchemy

Flask-Migrate

PostgreSQL (hosted via Render)

Features
User authentication (signup, login, logout)

Create, edit, delete stories

Create, edit, delete comments

Optional photo upload (partially implemented)

Region input: country and state/region

Form validation and error handling

Demo user login for quick access

CRUD Functionality
Full CRUD

Stories

Comments

Partial CRUD

Tags

Follows

Local Development Setup
Clone the repository
git clone https://github.com/MatoWanatake/MMIW.git

Backend setup

cd backend
pipenv install
pipenv shell
pip install -r requirements.txt


Create a .env file in the backend directory. Example:

FLASK_APP=app
FLASK_ENV=development
SECRET_KEY=your_secret_key_here
DATABASE_URL=sqlite:///dev.db
SCHEMA=MMIW


Set up the database

flask db upgrade
flask seed all


Run the backend server

flask run


Frontend setup

cd ../frontend
npm install
npm run dev

Demo User
The "Demo User" button logs in a test user so visitors can explore the site without creating an account.
