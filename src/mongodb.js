// mongodb.js

import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

let client;
let clientPromise;

if (!process.env.MONGODB_URI)
    throw new Error('Add Mongo URI to .env.local');

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;

export async function pushData(uuid, todoList) {
    const client = await clientPromise;
    const db = client.db("nextjs-todo-db");
    await db.collection("todos").replaceOne(
        { user: uuid },
        { user: uuid, data: JSON.stringify(todoList)  }
    );
}

export async function pullData(uuid) {
    const client = await clientPromise;
    const db = client.db("nextjs-todo-db");
    const allPosts = await db.collection("todos").find({ user: uuid });
    return JSON.parse(allPosts);
}
