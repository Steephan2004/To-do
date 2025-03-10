import { useState, useEffect } from "react";
import "./App.css";
import add from "./assets/add.png";
import edit from "./assets/edit.png";
import del from "./assets/bin.png";

export default function TodoApp() {
  
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [task, setTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const startEdit = (index) => {
    setEditIndex(index);
  setTask(tasks[index].text);
  };

  const updateTask = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editIndex].text = task;
    setTasks(updatedTasks);
    setEditIndex(null);
    setTask("");
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h1>To-Do App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        {editIndex !== null ? (
          <button onClick={updateTask}>Update</button>
        ) : (
          <button onClick={addTask}>
            <img src={add} alt="Add" />
          </button>
        )}
      </div>
      <ul>
        {tasks.map((t, index) => (
          <li key={index} className={t.completed ? "completed" : ""}>
            <div className="textbox">{t.text}</div>
            <div>
              <input
                className="checkbox"
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleTask(index)}
              />
              <button className="edit" onClick={() => startEdit(index)}>
                <img src={edit} alt="Edit" />
              </button>
              <button onClick={() => deleteTask(index)}>
                <img src={del} alt="Delete" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
