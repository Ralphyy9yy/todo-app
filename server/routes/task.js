const express = require ("express");
const router = express.Router();
const Task = require("../models/Task");

//get all tasks
router.get("/", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

//add new task
router.post("/", async (req, res) => {
    const {title} = req.body;
    const newTask = new Task ({title});
    await newTask.save();
    res.json(newTask);

});

//toggle task completion
router.put("/:id", async (req,res) => {
    
    const task =await Task.findById(req.params.id);
    task.completed = !task.completed;
    await task.save();
    res.json(task);
});

//delete task
router.delete("/:id", async (req,res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({message: "Deleted"});
});

module.exports = router;
