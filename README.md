# O3 Project

## Running locally
To run the project locally you'll need `node` and `npm`.

Start by install dependencies in both `/client` and `/server` directories:
```
npm install
```

To start both the server and client in development mode you need to first install [concurrently](https://www.npmjs.com/package/concurrently). This helps to run multiple processes with one command while still giving you good console output if one process fails:
```
npm install -g concurrently
```

Then navigate to the `/client` directory and use:
```
npm run dev
```

Alternatively you can run each process indivually.

From `/client`: `npm run start`

From `/server`: `node index.js`

## Frontend

The frontend for this project is bootstrapped with [Create-react-app](https://github.com/facebook/create-react-app). It uses the latest version of React in order enable hooks.

### Component Structure
- App
  - CreatePlayerInput
  - Leaderboard
  - PlayerSelectContainer

### Hooks
In addition to using `useState` in various components for storing local UI state, there is one custom hook `usePlayerApi.js`. This hooks encapsulates logic for fetching player data from server, and return loading, error, and success states as well as an updater function that can be used to trigger the `useEffect` hook to re-fetch data. This hook could be further customized to take in a url as a parameter so it could be reused for all data fetching.

### CSS
To keep things simple all css is in `App.css`. This is not normally the approach that I would take but it seemed to be the easiest solution for a small app like this. I used BEM naming structure for classes as outlined in an O3 style guide I found on github. Additionally I followed conventions outlined there as much as possible, including linting with `sass-lint` based on the [.sass-lint.yml](https://github.com/o3world/o3w-frontend-guidelines/blob/master/.sass-lint.yml) I also found on github, though I did not use sass for this particular project.

### Tests
Tests are run using enzyme to help with mounting and rendering React components, and Jest as a test runner.

To run the tests navigate to the `/client` directory then run:
```
npm run test
```

## Server

Made using Express.js.

### Routes

```
/player
```
```
- POST
Creates new player.
Example body: { "name": "AJ" }

- PATCH
Increments wins for specific player
Example body: { "name": "AJ" }

- DELETE
Deletes a player by name
Example body: { "name": "AJ" }
```
---
```
/players
```
```
- GET
Returns an array of players
Example response: [{ "name": "AJ", "wins": 1 }]

- DELETE
Deletes all players
Example body: { "name": "AJ" }
```

### Database

I had never used a SQLite db before, but this seems like a good use case for it. The sql queries are essentially the same as what I'm used to with postgres, but the setup is just about 3 lines within the express server.

There is only one table with the following structure:

| column | data type |
|--------|-----------|
| name   | text      |
| wins   | integer   |

### Tests
There are no tests for the server currently. If I were to set them up I would use mocha and chai/chai-HTTP to test actual requests to the running server.

[Here is an example](https://github.com/ajdeleon/indego_project/tree/master/api/test) of these types of tests in another project of mine.

## Deployment

The app is hosted on an Amazon Lightsail instance. It's running Ubuntu 16.04 with `node v12.6` and `nginx`. The DNS is managed via Linode, because I already had nameservers set up there for a spare domain: [ajdeleon.xyz](ajdeleon.xyz)

The frontend is built into a production using Create-react-app's `npm run build`. These static files are then served with nginx.

The server is running using [pm2](http://pm2.keymetrics.io/). This allows for features likes error logging, automatically restarting upon crash and more.
