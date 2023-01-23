# **rent-a-bnb**
rent-a-bnb is a website clone that is inspired by <a href='https://www.airbnb.com/'>Airbnb</a>. rent-a-bnb is for people looking for a place to stay when going on vacations. It also allows people who have extra space or properties to host stays for people. Visit rent-a-bnb by clicking <a href='https://rent-a-bnb.onrender.com/'>here</a> or visiting this link: https://rent-a-bnb.onrender.com/.

## Wiki Links
- Api Routes: https://github.com/JvredH/Rent-A-BnB/wiki/API-ROUTES
- Database Schema: https://github.com/JvredH/Rent-A-BnB/wiki/Database-Schema
- Feature List: https://github.com/JvredH/Rent-A-BnB/wiki/Features-List
- Redux State Structure: https://github.com/JvredH/Rent-A-BnB/wiki/Redux-State-Structure

## Built With

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
	![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)


## Features Directions

### Home page
You will be able to test the features without signing up by clicking on the demo user which can be found by clicking the icon on the top right of the page. When clicked the icon will display a login and sign up button. The login button contains the demo user option.

![home-page](./frontend/assets/homepage.png)

### Create a Spot
After signing in you will be able to create your own spot by clicking on "rent-a-bnb your home" on the top right of the page and you will be directed to this form.

![create-spot](./frontend/assets/createspot.png)

### Spot Details
After creating a spot you can view the details of the spot you've just created. This is also where you can make edits to the spot in case you have errors and delete the spot as well if you wish. You can do these by clicking the buttons above the image to the right.

![spot-detail](./frontend/assets/spotdetails.png)

### Reviews
Reviews can be left and deleted at any spot detail page. All these functionalities will be found at the bottom of a spot detail page, example shown below.

![spot-reviews](./frontend/assets/spotreviews.png)

## To Do List for Future Features
- [ ] add functionality to edit a review
- [ ] add ability to add photos of reviews
- [ ] full CRUD functionality to book sites
- [ ] user profile page

## To Get Started Locally
1. Clone the repo
2. Install dependencies by running ```npm install``` in root directory of project.
3. Open two terminals, cd into frontend folder in one terminal, in the other cd into backend
4. In back end terminal migrate tables and seed data by running:
  	- ```npx dotenv sequelize-cli db:migrate```
  	- ```npx dotenv sequelize-cli db:seed:all```
5. ```npm start``` in both terminals
6. Go to localhost:3000 in your browser and begin

## Contact Information
Jared Hem - hem.jared@gmail.com

Project Link: https://github.com/JvredH/Rent-A-BnB
