
# Task Planner APP API
- NODEJS, Express, MongoDB, Node Mailer, REST API implementation

## Features

- User Authentication with JWT tokens

- Supports multiple login from different devices

- User -> creation / deletion/ updates

- User avator -> add / delete

- Task -> add / update / delete / batch delete

- Send Mail -> When new user is created or deleted

- Image processing with Multer and sharp

- Tested with JEST

- Tool use to test APIs - POSTMAN

  

## API URL
_https://simple-task-planner-app.herokuapp.com_

	## API Documentation

`url = http://localhost:3000`
### ADD a new USER

 -  API -> `{{url}}/users`
 - Method -> *POST*
 - data -> body  [ type -> JSON]
```bash 
{
	"name": "Jhon Doe",
	"email": "jhon@example.com",
	"password": "password",
	"age": 26
}
```

### User Login
- API: `/users/login`
- Method: `Post`
- body - JSON
```bash
{
	email: 'jhon@example.com',
	password: 'password'
}
```

### User Logout
- API: `/users/logout`
- Method: `Post`
- Header - `'Authorization': 'Bearer token'`

### User Logout from all devices
- API: `/users/logout-all`
- Method: `Post`
- Header - `'Authorization': 'Bearer token'`

### User own profile
- API: `/users/me`
- Method: `Get`
- Header - `'Authorization': 'Bearer token'`

### User updates own profile data
- API: `/users/me`
- Method: `Patch`
- Header - `'Authorization': 'Bearer token'`
- Body - JSON
```bash
{
	name: 'Jhon',
	password: 'password',
	age: 23,
	email: 'jhon@example.com'
}
```

### User deletes own profile
- API: `/users`
- Method: `Delete`
- Header - `'Authorization': 'Bearer token'`


### User uploads own profile pricture
- API: `/users/me/avator`
- Method: `Post`
- Header - `'Authorization': 'Bearer token'`
- Body - multipart formdata: `'avator': 'image file'`

### User deletes own profile pricture
- API: `/users/me/avator`
- Method: `Delete`
- Header - `'Authorization': 'Bearer token'`

### Get a user's profile pricture
- API: `/users/:userId/avator`
- Method: `Get`

## Tasks

### User adds a new task
- API: `/tasks`
- Method: `Post`
- Header - `'Authorization': 'Bearer token'`
- Body - JSON
```bash
{
	description: 'random tasks :0',
	completed: false
}
```

### User fetchs all his/her tasks
- API: `/tasks`
- Method: `Get`
- Header - `'Authorization': 'Bearer token'`

### User fetches a specific task
- API: `/tasks/:id`
- Method: `Get`
- Header - `'Authorization': 'Bearer token'`

### User updates a specific task
- API: `/tasks/:id`
- Method: `Patch`
- Header - `'Authorization': 'Bearer token'`
```bash
{
	description: 'updated random tasks :p',
	completed: true
}
```

### User deletes a specific task
- API: `/tasks/:id`
- Method: `Delete`
- Header - `'Authorization': 'Bearer token'`
