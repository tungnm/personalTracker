DEMO STEPS:

1. START MONGOD:

- go to MONGODB/bin folder
- ./mongod —dbpath .

2. START NODE

- go to node folder
- node server.js

3. START SHELL

- go to MONGODB/bin folder
- ./mongo

- load createTask.js : load(‘full path’);


COMMON COMMAND:

- go to MONGODB/bin folder
- ./mongo
- use my_database
- list all goals:  db.goalmodels.find()
- delete all: db.goalmodels.deleteMany({})



EXISTING FUNCTIONS:

API:
*return JSON to caller*

- /api/listGoal 			: list all goals
- /api/listGoal/:id			: list a specific goal
- /updateTask				: task that has been updated
- /updateHabit				: habit that has been updated


UI:
*return HTML file (generate by bootstrap, handlebars) back to caller*

- /about					: return about page
- /home						: return home
- /listGoal					: return list of goals
- /updateTask				: return updateTask page
- /deleteGoal				: return to listGoal page