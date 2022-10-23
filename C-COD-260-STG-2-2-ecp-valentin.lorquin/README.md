# <center>On-Va-Se-Bouger</center>

## Intro

This project, carried out as part of the CodingAcademy by Epitech training, is the end-of-training project, as part of the Code&Go specialty.

The objective is to carry out a graphic and functional overhaul of the [On-Va-Sortir](https://strasbourg.onvasortir.com/) (OVS) site centralized in Strasbourg. Responding as much as possible to the requirements of the client (our fellow training colleagues), this project corresponds to our vision, but is not free from imperfections and can serve as a basis for a deepening of the subject or as inspiration.

To copy the complete project to your workspace, use this command and complete it with its URL.

```bash
git clone
```

<br />

## Documentation

The documentation for the basic understanding of the project and its realization process is in the ***documentation*** folder at the root of the project.

You will find there the ***product-backlog***, the ***design schema*** and the ***documentation of the API***.

<br />

Within AGILE project management, ***product backlog*** refers to a prioritized list of functionality which a product should contain. It is sometimes referred to as a to-do list, and is considered a form of documentation within the Scrum software development framework. Ours can be viewed [here](./documentation/Backlog%20Product.xlsx).

<br />

A ***design schema*** organizes data into tables with appropriate attributes, shows the interrelationships between tables and columns, and imposes constraints such as data types. It can be defined as the design of the database at the view level, which generally describes end-user interaction with database systems.

![alt text](./documentation/Design%20Schema.jpeg "Design Schema")

<br />

***API documentation*** is essentially the reference manual for an API. It tells API consumers how to use the API. Ours can be viewed [here](https://docapiovsb.docs.apiary.io/#).

<br />

## Installation

Verify that NodeJs is installed on your system.

```bash
node -v
```

If not, run this command in your terminal to install npm (Node.js Package Manager) and NodeJs.

```bash
npm install -g npm
```

Also check the installation of nvm (Node.js Version Manager).

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

List the versions of NodeJs installed on your system.

```bash
nvm ls
```

And preferably use version 16.14.2 which is the one used for this project.

```bash
nvm install v16.14.2 && nvm use v16.14.2
```

## Database

The database for your project is hosted online on MongoDB Atlas. [Log in](https://account.mongodb.com/account/login) to your account or create one.

Create a project and name it arbitrarily. Build a database in the "shared" tier cluster. Use the cloud provider and region of your liking.

Then, you will be prompted to enter a username and a password in order to authenticate your connection. Keep them in safety by pasting them in a *.env* file you will create at the root of the ***back*** folder. This file is mandatory to connect your backend to your database.

```env
MONGODB_USERNAME=
MONGODB_PASSWORD=
```

Add your current IP address to your IP access list: only an IP address you add to your access list will be able to connect to your project's cluster.

Under "Connect" -> "Connect your application", copy the code after `:<password>@` and replace it in ./back/src/app.module.ts line 16 after `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@`.

And that's it!

## Backend

At the root of the ***back*** folder, run the following command to install NestJs...

```bash
npm i -g @nestjs/cli
```

... and the set of dependencies required for the project, as listed in the *package.json* file.

```bash
npm install
```

Run the command to start the server.

```bash
npm run start
```

Open your browser and navigate to <http://localhost:3000/>.

## Frontend

At the root of the ***front*** folder, run the following command to install VueJs...

```bash
npm install -g @vue/cli
```

... and the set of dependencies required for the project, as listed in the *package.json* file.

```bash
npm install
```

Run the command to start the server.
```bash
npm run serve
```

Open your browser and navigate to <http://localhost:8080/> or <http://localhost:8081/>.

## Outro

We would like to thank our pedagogical managers for their patience throughout this training, their attention to detail in answering our questions and their passion which they wanted to pass on to us.

We would also like to thank our colleagues from other promotions for their help, their enlightening observations, and their support and presence at our side on a daily basis.

And finally, thank you to our promotion colleagues for these intense months, challenging on a daily basis but oh so rewarding.

&copy; Valéric 2022.
