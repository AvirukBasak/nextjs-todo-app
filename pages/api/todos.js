import clientPromise from '../../lib/mongodb';

async function uploadData(uuid, todoList) {
    const client = await clientPromise;
    const db = client.db("nextjs-todo-db");
    return await db.collection("todos").replaceOne(
        { user: uuid },
        { user: uuid, todoList }
    );
}

async function downloadData(uuid) {
    const client = await clientPromise;
    const db = client.db("nextjs-todo-db");
    const data = await db.collection("todos").find({ user: uuid });
    return { user: uuid, todoList: data };
}

/**

request: GET: /api/todos?uuid=user-id
response: body: {
    status: 200,
    data: { user: uuid, todoList: [] }
}

request: POST: body: {
    uuid: "user-id"
    todoList: []
}

*/
export default async (req, res) => {
   try {
       switch (req.method) {
           case "GET":
               if (!req.query?.uuid) {
                   res.json({
                       status: 400,
                       message: "get request should have `uuid` field",
                   });
                   break;
                }
               const data = downloadData(req.query.uuid);
               res.json({ status: 200, data });
               break;
           case "POST":
               let bodyObject = JSON.parse(req.body);
               if (!bodyObject?.uuid || !bodyObject?.todoList) {
                   res.json({
                       status: 400,
                       message: "post request should have `uuid` and `todoList` fields",
                   });
                   break;
               }
               let post = uploadData(bodyObject.uuid, bodyObject.todoList);
               res.json(post.ops[0]);
               break;
           default:
               res.json({ status: 405 });
       }
   } catch (e) {
       console.error(e);
   }
};
