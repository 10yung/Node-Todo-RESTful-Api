# Node.js Todolist  RESTful Api
------
## Description
This is a RESTful todolist Api built by Node.js (express) and MongoDB - [mLab](https://mlab.com/).
You can Add, Edit, Delete todo list through Api call.
It is RESTful Api so there are HTTP Methods corresponding to the above features.
* GET -> show all lists
* POST -> Edit or Update current list
* DELETE ->  Delete current list

## Introduction
**File Structure :**
```
.
|___config
|  |__config.json
|___driver
|  |__monogodb
|  |__mysql
|___models
|  |__todoModels.js
|___controller
|  |__apiController
|  |__setupController
|___app.js
|___package.json
```
**Files intro :**
* config.json : store all your config information. eg: DataBase name, location, password. (This file should be hided for security reason)
* driver folder : for all services driver like DataBase (Mysql, MongoDB, SQL), and you can also add email service or other services. Files in this folder are used to get config data and connect to other service.
* models folder : this folder is for your data Schema and data setting.
* apiController.js : control all HTTP Methods function and how to interact with database.
* setupController.js : seed database make sample data into database by endpoint.
* app.js : application entrance file.

Note:
> I haven't added any view (UI) yet, so I use controller to interact with database not model.
> Usually I will let model to interact with database and let controller to bind the result of data and view together.

## How to use ##
To interact with this Api. You should type URL endpoint to call function.In this case I set default listen port to 3000.
**Here are URL endpoint :**
* **GET** ```http://localhost:3000/api/setupTodos```  -> seed datbase

* **GET** ```http://localhost:3000/api/todos/:username```  -> show all <:username> todos
> ```http://localhost:3000/api/todos/andy``` then show all andy todos

* **GET** ```http://localhost:3000/api/todo/:id```  -> show current <:id> todo

* **POST** ```http://localhost:3000/api/todo```  -> add and update todo to default user. (In this case I set default user to **test**)
> you have to post { todo": "buy a bottle of eater",
    "isDone": "false",
    "hasAttachment": "false" } as a new todo

* **DELETE** ```http://localhost:3000/api/todo```  -> delete current <:id> todo.
> you have to use { "id": "<:todoid>"} to delete todo with that id

Note: [Postman](https://www.getpostman.com/) is a awesome tool to test this kind of api

## Summary ##
This side project is to show express app structure ( concept ) and how to design RESTful Api.
