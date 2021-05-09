const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('./Employee');

app.use(bodyParser.json());

const Employee = mongoose.model('employee');

// password = ctDGEF8aimm3YJxm;
const mongoUri =
  'mongodb+srv://new_user:ctDGEF8aimm3YJxm@cluster0.akrjw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', () => {
  console.log('Connected to mongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('error', err);
});

app.get('/', (req, res) => {
  Employee.find({})
    .then((data) => {
      console.log(req.body);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
  //   res.send('Welcome to node js');
});

app.post('/send-data', (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    contact: req.body.contact,
    position: req.body.position,
    email: req.body.email,
    salary: req.body.salary,
    picture: req.body.picture,
  });

  employee
    .save()
    .then((data) => {
      console.log(req.body);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/delete', (req, res) => {
  Employee.findByIdAndRemove(req.body._id)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/update', (req, res) => {
  Employee.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    contact: req.body.contact,
    position: req.body.position,
    email: req.body.email,
    salary: req.body.salary,
    picture: req.body.picture,
  })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3000, () => {
  console.log('server is running');
});
