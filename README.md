# Mezhera
## Financial mentorship for refugees

[View the app here](https://mezhera.netlify.app/)

## Setup

Clone the repo and run `yarn` to install dependencies. Create a PostgreSQL database using the command in `schema.sql`. Make a `.env` file by copying the `.env.example` file and replace the value of `DATABASE_URL` with the value of your database's URL.

## Running locally

Use the command `yarn start` or `yarn start:dev` to run the app.

## Running on heroku

When the project is deployed to heroku, the command in the `Procfile` file will be run.