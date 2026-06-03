const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//  Replace with your MongoDB URI
mongoose.connect("mongodb://BatchA_db_user:batch_123@ac-4mvided-shard-00-00.adslckq.mongodb.net:27017,ac-4mvided-shard-00-01.adslckq.mongodb.net:27017,ac-4mvided-shard-00-02.adslckq.mongodb.net:27017/?ssl=true&replicaSet=atlas-136x6d-shard-0&authSource=admin&appName=Cluster0")
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

//  Schema
const Student = mongoose.model("Student", {
  name: String,
  email: String,
  rollNumber: String
});


//  CREATE
app.post("/students", async (req, res) => {
  const student = await Student.create(req.body);
  res.json(student);
});

//  READ
app.get("/students", async (req, res) => {
  const data = await Student.find();
  res.json(data);
});

//  UPDATE
app.put("/students/:id", async (req, res) => {
  const updated = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

//  DELETE
app.delete("/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log("Server running on 5000"));