const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: String,
  contact: String,
  position: String,
  email: String,
  salary: String,
  picture: String,
});

mongoose.model('employee', EmployeeSchema);
