import React, { useState, useEffect, useTransition } from 'react';
import axios from "axios";
import { TrashIcon, PlusIcon, CheckIcon } from '@heroicons/react/24/solid';
import Alert from './components/Alert';
function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [filter, setFilter] = useState ("all");


  const fetchTasks = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/tasks`);
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const filteredTasks = tasks.filter(task => {
if (filter === "completed") {
  return task.completed
}else if (filter === "pending") {
  return !task.completed;
  
}else{
  return true; //shiw all tasks
}

  });

  const addTask = async () => {
    if (!title.trim()) {
      alert("Please enter a task title.");
      return;
    }
    try {
      const res = await axios.post(`http://localhost:5000/api/tasks`, { title });
      setTitle("");
      fetchTasks();

    } catch (error) {
      console.error("Error adding task:", error);

    }
  };

  const toggleTask = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();

    } catch (error) {
      console.error("Error toggling task:", error);

    }
  };

  useEffect(() => {
  if (alertMessage) {
    const timer = setTimeout(() => {
      setAlertMessage("");
    }, 3000); // 3000ms = 3 seconds

    return () => clearTimeout(timer);
  }
}, [alertMessage]);


  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();
      setAlertMessage("🗑️ Task deleted successfully!");
      
      setAlertType("success");
    } catch (error) {
      console.error("Error deleting task:", error);
      setAlertMessage("❌ Failed to delete task.");
      setAlertType("error");
    }
  };

  useEffect(() => {
    fetchTasks();

  }, []);




  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 flex flex-col items-cemter px-4 py-8">
      <Alert message={alertMessage} type={alertType} onClose={() => setAlertMessage("")} />
      <h1 className="text-3xl md:text-5xl font-extrabold text-indigo-700 mb-6 text-center">To-Do List</h1>

      <div className="flex flex-row md:flex-row mb-2 w-full max-w-lg mx-auto ">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow border font-mono mr-2 items-center border-gray-300 rounded px-5  py-3 mb-1 md:mb-0 md:mr-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />

        <button
          onClick={addTask}>
          <PlusIcon className="border w-10 h-10 bg-white border-gray-300 rounded-md py-2 px-3 font-mono mb-1 md:mb-0  md:mr-0 hover:bg-slate-50 transition " />
        </button>
      </div>
      {tasks.length === 0 ? (
        <div className="text-center text-gray-500 mt-10  font-mono">
          <p className="text-sm">No tasks available. Add a new task to get started!</p>
        </div>

      ) : (
        <ul className="w-full max-w-lg space-y-3 mx-auto">
          {filteredTasks.map(task => (
            <li key={task._id}
              className="flex justify-between items-center bg-white shadow rounded px-4 py-2">
              <CheckIcon
                onClick={() => toggleTask(task._id)}
                className={`border border-gray-300 py-2 px-2 w-9 h-9 rounded-md font-mono hover:bg-slate-50 transition cursor-pointer ${task.completed ? "text-green-500" : "text-gray-400"
                  }`}

              />
              <span
                style={{ textDecoration: task.completed ? "line-through" : "none" }}
                cursor="pointer"
                onClick={() => toggleTask(task._id)}
              >
                {task.title}
              </span>

              <TrashIcon
                onClick={() => deleteTask(task._id)}
                className="
    w-9 h-9
    p-2
    text-red-500
    border border-red-200
    rounded-md
    cursor-pointer
    hover:bg-red-50
    hover:text-red-600
    transition
  "
              />

            </li>

          ))}
        </ul>
      )}
      <div className="mt-10 text-center text-gray-500 font-mono">
        <button 
        onClick={() => setFilter("all")}
        className="text-sm text-indigo-500 hover:underline">All Tasks</button>
        <span className="mx-2">|</span>
        <button
        onClick={() => setFilter("completed")}
        className = "text-sm text-indigo-500 hover:underline">Completed Tasks</button>
        <span className="mx-2">|</span> 
        <button 
        onClick={ () => setFilter("pending")}
        className = "text-sm text-indigo-500 hover:underline">Pending Tasks</button>
        
    </div>
    </div>
  )
}

export default App;
