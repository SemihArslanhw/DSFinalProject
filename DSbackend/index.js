const app = require('express')();
const MongoClient = require('mongodb').MongoClient;
const cors = require("cors");


const url = 'mongodb://127.0.0.1:27017/DS';

let mongoClient;
async function connectToCluster(uri) {
  try {
    mongoClient = new MongoClient(uri);
    console.log('Connecting to MongoDB Atlas cluster...');
    await mongoClient.connect();
    console.log('Successfully connected to MongoDB Atlas!');
    return mongoClient;
  } catch (error) {
    console.error('Connection to MongoDB Atlas failed!', error);
    process.exit();
  }
}
app.use(cors());

connectToCluster(url);
app.use(require('body-parser').json());
//Access-Control-Allow-Origin *: herkese izin verir


app.post('/teacher', (req, res) => {
  const { username, password } = req.body;
  const collection = mongoClient.db("DS").collection("teacher");
  collection.insertOne({ username: username, password: password }).then((result) => {
    res.send(result);
  }
  ).catch((err) => {
    res.send(err);
  }
  );
});

//register teacher
app.post('/teacher', (req, res) => {
  const { username, password } = req.body;
  const collection = mongoClient.db("DS").collection("teacher");
  collection.insertOne({ username: username, password: password }).then((result) => {
    res.send(result);
  }
  ).catch((err) => {
    res.send(err);
  }
  );
});

//login teacher
app.post('/teacher/login', async (req, res) => {
  const { username, password } = req.body;
  const collection = mongoClient.db("DS").collection("teacher");
  try {
    const data = await collection.findOne({ username: username, password: password })
    console.log(data);
    res.send({ data: data });
  } catch (error) {
    res.send(error);
  }
});

//register student
app.post('/student', (req, res) => {
  const { username, password } = req.body;
  const collection = mongoClient.db("DS").collection("student");
  collection.insertOne({ username: username, password: password }).then((result) => {
    res.send(result);
  }
  ).catch((err) => {
    res.send(err);
  }
  );
});


//login student
app.post('/student/login', async (req, res) => {
  const { username, password } = req.body;
  const collection = mongoClient.db("DS").collection("student");
  try {
    const data = await collection.findOne({ username: username, password: password })
    console.log(data);
    res.send({ data: data });
  } catch (error) {
    res.send(error);
  }

});

//get all students
app.get('/student', async (req, res) => {
  const collection = mongoClient.db("DS").collection("student");
  try {
    const result = await collection.find({}).toArray();
    res.send(result);
  } catch (error) {
    res.send(error);

  }
});

//get student by id
app.get('/student/get/:id', async (req, res) => {
  const { id } = req.params;
  const collection = mongoClient.db("DS").collection("student");
  var ObjectId = require('mongodb').ObjectId;
  try {
    const result = await collection.findOne({ _id: new ObjectId(id) });
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});


//devamsızlık ekle
app.post('/student/absence', async (req, res) => {
  const { studentId, date } = req.body;
  const collection = mongoClient.db("DS").collection("absence");
  try {
    await collection.insertOne({ studentId: studentId, date: date });
    res.send("ok");
  } catch (error) {
    res.send(error);
  }

});

//devamsızlık sil
app.delete('/student/absence/:absenceId', async (req, res) => {
  const { absenceId } = req.params;
  const collection = mongoClient.db("DS").collection("absence");
  var ObjectId = require('mongodb').ObjectId;
  try {
    const data = await collection.deleteOne({ _id: new ObjectId(absenceId) });
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});


//ogrenci devamsızlıklarını getir
app.get('/student/absence/:studentId', async (req, res) => {
  const { studentId } = req.params;
  const collection = mongoClient.db("DS").collection("absence");
  try {
    const data = await collection.find({ studentId: studentId }).toArray();
    console.log(data);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

//ders notu ekle ders , ogrenic id , not
app.post('/student/grade/:studentId', async (req, res) => {
  const { studentId } = req.params;
  const { lesson, grade } = req.body;
  const collection = mongoClient.db("DS").collection("grade");
  try {
    const data = await collection.insertOne({ studentId: studentId, lesson: lesson, grade: grade })
    res.send(data);
  } catch (error) {
    res.send(error);
  };
});

//ogrenci notunu düzenle
app.put('/student/grade/:id', async (req, res) => {
  const { id } = req.params;
  const { lesson, grade } = req.body;
  const collection = mongoClient.db("DS").collection("grade");
  var ObjectId = require('mongodb').ObjectId;
  console.log(new ObjectId(id), lesson, grade)
  try {
    //UpdateOneby mongo Id
    const data = await collection.updateOne({ _id:new ObjectId(id) }, { $set: { lesson: lesson, grade: grade } });
    console.log(data);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

//ogrenci notlarını getir
app.get('/student/grade/:studentId', async (req, res) => {
  const { studentId } = req.params;
  const collection = mongoClient.db("DS").collection("grade");
  try {
    const data = await collection.find({ studentId: studentId }).toArray();
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});




app.get('/', (req, res) => {
  res.send('Hello World!');
}
);

app.listen(8080, () => {
  console.log('Example app listening on port 8080!');
}
);

