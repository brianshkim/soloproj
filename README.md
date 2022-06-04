# SPECTRAL WAVES
## Technologies Used:
* Javascript
* REACT
* HTML5
* REDUX
* Sequelize
* Express.js
* PostgreSQL
***
Busy Bees demo: https://busy-bees-attempt-2.herokuapp.com/

Github wiki: https://github.com/brianshkim/soloproj/wiki
***
## Developer:
Brian


***
## About
This project is based off of [SoundCloud](https://www.soundcloud.com).

Spectral Waves is a clone of Soundcloud that utilizes one page to render the user's songs and playlists

***

## How to Run
1. Download the [repository]((https://github.com/brianshkim/soloproj)) and open it in VS Code.
2. Install the necessary dependencies by running `npm install` in the terminal.
3. Create an `.env` file in the root of the project. Input the corresponding information from the `.env.example` file.
4. Create your local database.
    * Create a user named `busy_bees_app` with db privileges with your desired password.
    * Initialize sequelize with `npx dotenv sequelize init`.
    * Then run the following:
        * `npx dotenv sequelize db:create`
        * `npx dotenv sequelize db:migrate`
        * `npx dotenv sequelize db:seed:all`
5. Start the local server in your terminal by running `npm start` on two terminals in your folders called /backend and /frontend.
6. Navigate to `http://localhost:3000/` in Google Chrome.

***

## Languages and Frameworks
* [React.js](https://reactjs.org/docs/getting-started.html): a free and open-source front-end JavaScript library for building user interfaces based on UI components
* [React-Redux](https://react-redux.js.org/): an open-source JavaScript library for managing and centralizing application state. 
* [Express.js](https://expressjs.com/): a prebuilt NodeJS framework that can help you in creating server-side web applications faster and smarter.
* [PostgreSQL](https://www.postgresql.org/): the primary data store or data warehouse for many web, mobile, geospatial, and analytics applications.

***

## Future Features
* Search
* Album listing
* Sort on playlists
* Custom music player

***



### Home Page (Logged In)
![Screenshot 2022-06-03 145516](https://user-images.githubusercontent.com/28768561/171959394-92e40f61-53b2-4699-af91-0d7c7e8fab9c.png)

