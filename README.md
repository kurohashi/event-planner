# Guidelines before staring the service
**Create database "events" in postgresql**

**Create tables in postgresql**

1. CREATE TABLE users
    (
        username text NOT NULL,
        name text NOT NULL,
        password text NOT NULL,
        wallet numeric NOT NULL,
        PRIMARY KEY (username)
    );

2. CREATE TABLE events
    (
        name text NOT NULL,
        "startdate" date NOT NULL,
        "enddate" date NOT NULL,
        status text NOT NULL,
        price numeric NOT NULL,
        PRIMARY KEY (name)
    );

3. CREATE TABLE participants
    (
        event text NOT NULL,
        username text NOT NULL,
        PRIMARY KEY (event, username)
    );

---

**The API endpoints**

1. POST http://localhost:25000/apis/v1/user/register
2. GET http://localhost:25000/apis/v1/user/login
3. GET http://localhost:25000/apis/v1/event/join/:event
4. GET http://localhost:25000/apis/v1/event/:event
5. POST http://localhost:25000/apis/admin/v1/event/create
6. DELETE http://localhost:25000/apis/admin/v1/event/delete/:event
7. POST http://localhost:25000/apis/admin/v1/event/update

You can fine more info about APIs in "Event Planner.postman_collection.json" file