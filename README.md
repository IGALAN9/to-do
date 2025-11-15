## Start Aplication

```bash

npm install

npm run seed (database akan terbuat dari sini)

npm run dev

```

## Design decisions

SQLite, Express, React, and Node.js are all part of the SERN stack technology. The server.js file acts as the primary gateway for the monolithic application architecture with a custom server. Express.js is used by this file to handle API requests; Next.js is used to produce pages for all other requests.

Because the entire application—frontend and backend—can be operated with a single terminal and port, this method is feasible. Because the frontend and backend operate on the same domain and port, CORS setting is also eliminated.

Despite being monolithic, the code structure guarantees that the frontend and backend are distinct. Additionally, the API design adheres to a modular REST API style with distinct routing to prevent server.js logic from building up. The code is more manageable, tidy, and structured as a result of this division.

## Possible improvements

Search and Filter
A search box might be introduced to make it simpler to look for activities by title. Additionally, including filters like "All," "Active," and "Completed" would enable customers to view jobs in accordance with their preferences.

Due Dates
Users can determine whether a task has crossed the deadline by using the due date function. The program may show a color indicator as a marker when a task is past due.

MVC Pattern (Model-View-Controller)
The project structure can become more structured by implementing the MVC pattern. The data flow is made clearer, the code is simpler to maintain, and future feature development is more organized when the Model, View, and Controller are kept apart.