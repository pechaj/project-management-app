# Project Management Web App
Simple web application, used to manage projects with their corresponding tasks. Final project should allow user to make API calls to all endpoints on a remote client app, created on C#. The endpoints are GET, POST, PUT, DELETE. These endpoints can be used for projects and tasks alike.

**Project is finished.** The only changes that can occur are in the backend, bugfixes or in design of the web app.

## Technologies

**Backend** - C#

**Database** - Azure Cosmos DB

**Frontend** - React

## How to run
*Make sure the project and task service are running, so the API calls work and you run these commands in the corresponding folders.*
- **Project backend and actor**
``` PS
dapr run --app-id project-service --app-port 5000 --dapr-http-port 3500 --log-level debug -- dotnet run
```

- **Task backend**
``` PS
dapr run --app-id task-service --dapr-http-port 3501 -- dotnet run
```
- **Web application** (using npm / CRA / craco)
``` PS
# if needed
craco build

craco start
```