
## How to install

1. 
```zsh
$ git clone git@github.com:dmibronnikov/node-crud-api.git
```
2.
```zsh
$ git fetch origin
$ git switch dev
```

3. 
```zsh
npm install
```

Alternatively, download `dev` branch of the project as an archive and call `npm install`

## How to run

Development mode (nodemon):

```zsh
npm run start:dev
```

Production mode:

```zsh
npm run start:prod
```

Cluster mode with a database emulated by a text file:

```zsh
npm run start:multi
```

When running in cluster mode, `availableParallelism() - 1` number of servers are started, that are listened on the common port, specified in `.env` file, while also listening on their exclusive ports `4001...`. You can either send requests to `localhost:4000` to use all cluster nodes or send request to a different port to get a specific server.

## CRUD API

**base url: localhost:{port}/api**

- fetch all users.
```
GET /users

Response
200 OK
[
  {
    "id": "{id}",
    "name": "{name}",
    "age": "{age}",
    "hobbies": [
      "{hobby_1}",
      "{hobby_2}",
      ...
    ]
  },
  ...
]
```

- fetch a user specified by id.
```
GET /users/{userID}
userID: string (UUID)

Response
200 OK
{
    "id": "{id}",
    "name": "{name}",
    "age": "{age}",
    "hobbies": [
      "{hobby_1}",
      "{hobby_2}",
      ...
    ]
}

Errors:
400 Bad Request
if userID is not a valid UUID

404 Not Found
if user with a given userID is not found

```

- create a new user
```
POST /users
Body
{
    required name: string
    required age: number
    required hobbies: string[] (can be empty)
}

Response
200 OK
{
    "id": "{id}",
    "name": "{name}",
    "age": "{age}",
    "hobbies": [
      "{hobby_1}",
      "{hobby_2}",
      ...
    ]
}

Errors:
400 Bad Request
if body is not valid

```
- update an existing user
```
PUT /users/{userID}
Body
{
    required name: string
    required age: number
    required hobbies: string[] (can be empty)
}

Response
200 OK
{
    "id": "{id}",
    "name": "{name}",
    "age": "{age}",
    "hobbies": [
      "{hobby_1}",
      "{hobby_2}",
      ...
    ]
}

Errors:
400 Bad Request
if userID is not a valid UUID or body is not valid

404 Not Found
if user with a given userID is not found

```
- delete a user
```
DELETE /users/{userID}

Response
204 No Data

Errors:
404 Not Found
if user with a given userID is not found