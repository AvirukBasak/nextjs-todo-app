# NextJS Todo App
Features:
- ReactJS Frontend
- NextJS Framework
- MongoDB with CRUD API

## Get started
Create a `.env.local` at the project root and give it an entry in followong format
```
MONGODB_URI='mongodb+srv://<username>:<passswd>@<some_domain>/?retryWrites=true&w=majority'
```
You will find the above URI in MongoDB Atlas (you'll need to hunt a little for it or create a new cluster if you don't have one).


Alternatively, for local MongoDB server instance
```
MONGODB_URI='mongodb://0.0.0.0:27017'
```

**Note**: Only use `0.0.0.0` for the IP address or MongoDB local server will refuse connections.

## Run server
```
npm install
npm run dev
```
