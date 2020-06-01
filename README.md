
# Task Planner APP API
- NODEJS, Express, MongoDB, Node Mailer, REST API implementation

## Features

- User Authentication with JWT tokens

- Supports multiple login from different places

- User -> creation / deletion/ updates

- User avator -> add / delete

- Task -> add / update / delete / batch delete

- Send Mail -> When new user is created or deleted

- Image processing with Multer and sharp

- Tested with POSTMAN

  

## API URL
_https://simple-task-planner-app.herokuapp.com_

## API Documentation

### ADD a new USER

 - API -> `{{url}}/users`
 - Method -> *POST*
- data -> body  [ type -> JSON]
- sample -> ```{
	"name": "Jhon Doe",
	"email": "jhon@example.com",
	"password": "password",
	"age": 26
}```