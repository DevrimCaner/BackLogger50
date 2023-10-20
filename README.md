# YOUR PROJECT TITLE
#### Video Demo: https://www.youtube.com/watch?v=YTr_7DS-C0I
#### Description:
BackLogger50 is an web app for back logging video games which is made with ReactJS and PHP.
If you like to play lot of video games in diffrent platforms and store apps this app will help you about whit game you planned to play which one's are you complated.

>Typical To Do List App with Login and Register features but todo's are games.

## How To Use It ?

BackLogger50 is live at backlogger50.devrimcaner.com you can visit the website and start to using it.

- For start to using this app first register
- After the registeration you can login to the app
- When you login to the app you can start to manage your list
- For adding games to your list you can visit 'add' page
- For managing complated and listed games you can visit 'list' page

### Pages

There are couple pages in this app that helps you using it.
Description of every page is given below.

#### Home

Home page is for presentation and introduction for BackLogger50.
There is a hero section with image and there are links which fowards you to registeration page and github page
There are two gif images that shown in the following sections that telling you about "add" and "list" pages.
In the Final section there are couple info about background of app How its made which Programming languages, frameworks and structures used etc.

#### Register

In register page you can create a user for using app.
You need to fulfill the email, username, Password and confirm the password in inputs for registeration to the app.

#### Login

There are two fields in login page which is 'Username' and 'Password'.
With this page if you type the correct credentials you can login to the app.

#### Add

Add page is using for add games to your list. To vist this page you need to login to the app.
There is a search input field in this page, you can start to typing for searching.
When you finished the typing the application starts searching and when it's finished the searching it lists what it founds. If app doesn't find any game, it will informs you.
After the searching and listing proccess, you can see the games listed and you can use the "+" icon button for adding games to your list.

#### List

List page is second login required page in this app. In login page there is two sections for listing games. First section for Listed but not complated games, and second section for the games you complated. 
You can set the games as complated with "check" icon button.
If you want to relist the games you can use "reverse" icon button and if you want to permanently delete the game on list you can use "trash" icon button.

## How was it Made ?

This app is just made by "DevrimCaner". You can see the list of the all technologies used in this application below.

- ReactJS
- PHP
- Axios
- MySQL
- IGDB API

### General Structure

There are two directory on folder, one of them api folder other is backlogger50.
In 'api' folder there are php files for comunicate with database and IGDB api.
api folder is represents Back-End of this application.

In  'backlogger50' folder there is a ReactJS app which is created with 'create-react-app' command.
backlogger50 folder is represents Front-End of this application.

#### ReactJS
ReactJS is a javascript framework that allows you using MVC, create component and manage them easily. With ReactJS I manage the front data of my project and send requests to my api.
There are several options of Front-End frameworks alternative to ReactJS like VueJS and AngularJS. The reason of I chose ReactJS was because it was the most popular.

#### PHP
I used PHP for Back-End actions of this project. Comunicating IGDB api, User login and register Actions, Getting game list of users and some other functions are operate by PHP in this project.
The main reason of I chose PHP in this project is My hosting can run it.
PHP is the most common programming language on the web, you can get a Linux hosting and it can runs PHP but other Back-End options like NodeJS, Python, Ruby is not runs on every hosting.

#### MySQL
Every app needs to store data in somewere. MySQL database is most efficient way to store and manage datas with PHP thats Why I used on my project. There are just two tables on the database one of them is 'users' other one is 'lists'.
Usres table stores data like, name, sha256 password hash, email and created datetime.
Lists table stores data of which user lists which game and list status of the game.

#### Axios
Axios is another Javascript framework. i used Axios for sending get and post actions to My api from ReactJs app.

#### IGDB API
IGDB api is developed by 'Twitch' which gives you video game data.
I used IGDB for getting game datas and cover arts of games in my project.