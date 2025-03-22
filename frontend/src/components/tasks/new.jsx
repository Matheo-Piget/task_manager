import React from "react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../../api/taskService";
import { getUsers } from "../../api/userService";


const NewTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("low");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTask({
        title,
        description,
        assignedTo,
        dueDate,
        priority,
      });
      navigate("/");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };
    return (
        <div className="new-task">
        <h2>Create New Task</h2>
        <form onSubmit={handleSubmit}>
            <div>
            <label>Title:</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            </div>
            <div>
            <label>Description:</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            ></textarea>
            </div>
            <div>
            <label>Assigned To:</label>
            <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                required
            >
                {users.map((user) => (
                <option key={user.id} value={user.id}>
                    {user.name}
                </option>
                ))}
            </select>
            </div>
            <div>
            <label>Due Date:</label>
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
            />
            </div>
            <div>
            <label>Priority:</label>
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            </div>
    
            <button type="submit">Create Task</button>
        </form>
        </div>
    );
}
export default NewTask;