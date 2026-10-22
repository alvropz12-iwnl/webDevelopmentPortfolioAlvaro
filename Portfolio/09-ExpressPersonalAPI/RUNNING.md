# Run the activity

Run `npm install`, then `npm start` in this folder. Open http://localhost:3000.
Only run one portfolio server on port 3000 at a time.

Names and tasks stay in memory until the server is restarted. The page uses
JavaScript to submit forms and follow greetings without changing the address.
EJS renders the provided HTML templates and escapes names and tasks.

In Postman:

- `GET http://localhost:3000/task` returns the tasks as JSON.
- `PUT http://localhost:3000/greet?name=Alvaro` adds a name and returns all names.
- `DELETE http://localhost:3000/task/0` deletes the first task and redirects home.
- `GET http://localhost:3000/greet?index=0` opens the first person's greeting.

Indices start at zero. The JSON routes are also accessible to other HTTP clients;
Postman is the tool used to test them, not an authentication requirement.
