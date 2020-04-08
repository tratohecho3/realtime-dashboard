# realtime-dashboard

## Install dependencies

Run These 3 commands in order

```
npm run installation

```

## Put Your Twitch Api Credentials

/global/environment.ts

```js
export const CLIENT_ID: string = process.env.CLIENT_ID || "";
export const TOKEN_TWITCH: string = process.env.TOKEN_TWITCH || "";
```

## Start Development Server

```
npm run start
```

## Build

- **Backend**

```
npm run build-ts
```

- **Frontend**

```
npm run build-frontend
```

## Deployment (from your master branch)

```
git push heroku master
```

## API And Routes

- **Development (Frontend)**: http://localhost:4200/
- **Development (Backend)**: http://localhost:5000/

- **Production**: https://dash-dna-staging.herokuapp.com/

- **Endpoint**: /games/analytics **GET**

```json
// Status: 200 OK
[
  {
    "name": "Far Cry 5",
    "id": "497078",
    "counter": 100
  },
  {
    "name": "Rainbow Six Siege",
    "id": "460630",
    "counter": 21027
  },
  {
    "name": "Assassin’s Creed Odyssey",
    "id": "506274",
    "counter": 457
  }
]
```
