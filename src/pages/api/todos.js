import clientPromise from '../../lib/mongodb';

async function downloadData(uuid) {
    const client = await clientPromise;
    const db = client.db('nextjs-todo-db');
    try {
        const data = await db.collection('todos').findOne({ uuid });
        console.log('download: ' + JSON.stringify({ uuid: data.uuid, todoList: data.todoList }));
        return { uuid: data.uuid, todoList: data.todoList };
    } catch (e) {
        console.error(e);
    }
}

async function uploadData(uuid, todoList) {
    console.log('upload: ' + JSON.stringify({ uuid, todoList }));
    const client = await clientPromise;
    const db = client.db('nextjs-todo-db');
    try {
        const res = await db.collection('todos').replaceOne(
            { uuid },
            { uuid, todoList },
            { upsert : true }
        );
        return { echo: { uuid, todoList }, response: { status: 200, message: 'OK', ...res }};
    } catch (e) {
        console.error(e);
        return { echo: { uuid, todoList }, response: { status: 400, message: e.toString() }};
    }
}

/**

api endpoint: /api/todos
------------------------------------------------------
request: POST: body: {
    "method": "READ",
    "uuid": "some-demo-user-id",
}
response: body: {
    status: 200,
    data: { uuid: uuid, todoList: [] },
}
-------------------------------------------------------
request: POST: body: {
    "method": "UPDATE",
    "uuid": "some-demo-user-id",
    "todoList": []
}
response: body {
    "status": 200,
    "echo": {
        "uuid": "some-demo-user-id",
        "todoList": []
    },
    "response": {
        "status": 200,
        "message": "OK",
        "acknowledged": true,
        ...
    }
}

*/
export default async (req, res) => {
    if (req.method !== 'POST') {
        res.json({ status: 405, message: 'only POST request is supported' });
        return;
    }
    const reqBody = req.body;
    if (!reqBody?.method) {
        res.json({ status: 400, message: 'POST should have `method` field' });
        return;
    }
    try {
        switch (reqBody.method) {
            case 'READ':
                if (!reqBody.uuid) {
                    res.json({
                        status: 400,
                        message: 'POST READ should have `uuid` field',
                    });
                    return;
                }
                const data = await downloadData(reqBody.uuid);
                res.json({ status: 200, data });
                return;
            case 'CREATE':
            case 'UPDATE':
                if (!reqBody.uuid || !reqBody.todoList) {
                    res.json({
                        status: 400,
                        message: 'POST CREATE or UPDATE should have `uuid` and `todoList` fields',
                    });
                    return;
                }
                let {echo, response} = await uploadData(reqBody.uuid, reqBody.todoList);
                res.json({ status: 200, echo, response });
                return;
            default:
                res.json({
                    status: 405,
                    message: 'POST `method` field should be `CREATE`, `UPDATE` or `READ`',
                });
                return;
        }
    } catch (e) {
        res.json({ status: 400, message: e.toString() });
        throw e;
    }
};
