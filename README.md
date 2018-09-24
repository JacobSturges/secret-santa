<h1> Secret Santa</h1>

I created this project so that when my family is doing our yearly secret santa I can email each person the person they have without any one person in the circles knowing who has who.

I recgonise there where a tonne of simpiliar solutions to this problem then this but I thought it might have been fun and give me a chance to write a bit of code outside work and study. 

It would be awesome if anyone who saw this had any feedback code style wise as I have recently adjusted it quite a bit to include alot more promises to avoid callback hell.


<h2>Usage</h2>

<h3>people.json</h3>
First you have to edit the  people.json file so that it represents the group you are doing the secret santa with.


```
[
	{"email": "example1@gmail.com", "name": "person1", "id": 1, "partner": 2},
	{"email": "example3@gmail.com", "name": "person2", "id": 3, "partner": -1},
	{"email": "example4@gmail.com", "name": "person3", "id": 4, "partner": -1},
	{"email": "example2@gmail.com", "name": "person4", "id": 2, "partner": 1},
	{"email": "example5@gmail.com", "name": "person5", "id": 5, "partner": -1}
]
```

Where email is the persons email address, name is there name, id a unique number you assign them and partner being there partners id (-1 if zero). Note the partner is their to stop someone being partnered with their husband, wife, boyfreind, etc.


<h3>Enviroment Variables</h3>
Then you will need to provide this program with the variables it needs to send the emails from a given address. This being a email address, that emails pass and a email host. eg

SENDER_EMAIL

```
export SENDER_EMAIL=exampleSanta@example.com
```

SENDER_PASS

```
export SENDER_PASS=********
```

SENDER_HOST

```
export SENDER_HOST=smtp.gmail.com
```


<h3>Running</h3>
Once you are setup you need to run 

```
npm i
```
to install the all required modules. Then to run the code run

```
npm start
```

