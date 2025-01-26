import React, { useState } from "react";
import { Edit, Trash2, X } from "lucide-react";

export function TaskList({ tasks, onDeleteTask, onEditTask }) {
  const [editableTask, setEditableTask] = useState(null); // Track the task being edited
  const [editText, setEditText] = useState(""); // Text for the edit input
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const priorityColors = {
    low: "bg-green-100",
    medium: "bg-yellow-100",
    high: "bg-red-100",
  };

  const handleEditSave = () => {
    if (editableTask) {
      const updatedTask = {
        ...editableTask,
        text: editText,
        updatedAt: new Date().toISOString(),
      }; // Update task text and set the updatedAt date
      onEditTask(editableTask.id, updatedTask); // Update task
      setIsModalOpen(false); // Close modal
      setEditText(""); // Reset input
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`flex justify-between items-center p-4 rounded-lg shadow-sm ${
            priorityColors[task.priority.toLowerCase()]
          }`}
        >
          {/* Task Content */}
          <div className="flex-grow">
            <span className="font-medium text-lg sm:text-base">
              {task.text}
            </span>
            {task.weather && (
              <p className="text-sm text-gray-600">
                {task.weather.description}
              </p>
            )}
            <p className="text-sm text-gray-500">Priority: {task.priority}</p>
            <p className="text-xs text-gray-400">
              Created: {new Date(task.createdAt).toLocaleString()}
            </p>
            {task.updatedAt && (
              <p className="text-xs text-gray-400">
                Updated: {new Date(task.updatedAt).toLocaleString()}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setEditableTask(task); // Set task to be edited
                setEditText(task.text); // Set initial text for editing
                setIsModalOpen(true); // Open modal
              }}
              className="flex items-center bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              aria-label="Edit Task"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDeleteTask(task.id)} // Delete task
              className="flex items-center bg-red-500 text-white p-2 rounded hover:bg-red-600"
              aria-label="Delete Task"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}

      {/* Modal for Editing */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-1/3 md:w-1/4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Edit Task</h2>
              <button
                onClick={() => setIsModalOpen(false)} // Close modal
                aria-label="Close Modal"
              >
                <X className="w-6 h-6 text-gray-600 hover:text-gray-800" />
              </button>
            </div>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full p-2 border rounded mt-4 text-sm sm:text-base"
              placeholder="Edit task description"
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleEditSave}
                className="bg-green-500 text-white px-4 py-2 rounded text-sm sm:text-base hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
