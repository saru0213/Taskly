import React, { useState } from "react";

const priorityStyles = {
  low: {
    base: "bg-green-100 text-green-800",
    order: 1,
  },
  medium: {
    base: "bg-yellow-100 text-yellow-800",
    order: 2,
  },
  high: {
    base: "bg-red-100 text-red-800",
    order: 0,
  },
};

export function TaskInput({ onAddTask }) {
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("high");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = () => {
    const trimmedTaskText = taskText.trim();

    // Enhanced validations
    if (!trimmedTaskText) {
      setError("Task description cannot be empty.");
      return;
    }

    if (trimmedTaskText.length < 5) {
      setError("Task description must be at least 5 characters long.");
      return;
    }

    if (trimmedTaskText.length > 100) {
      setError("Task description cannot exceed 100 characters.");
      return;
    }

    if (!/[a-zA-Z0-9]/.test(trimmedTaskText)) {
      setError(
        "Task description must include at least one alphanumeric character."
      );
      return;
    }

    if (/[^a-zA-Z0-9\s.,!?'-]/.test(trimmedTaskText)) {
      setError(
        "Task description contains invalid characters. Only letters, numbers, spaces, and common punctuation are allowed."
      );
      return;
    }

    // If all validations pass
    onAddTask({
      text: trimmedTaskText,
      priority,
    });

    setTaskText("");
    setPriority("high");
    setError("");
    setSuccessMessage("Task added successfully!");

    // Hide success message after 3 seconds
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col space-y-4 p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-semibold text-gray-700">Add a New Task</h3>

      {/* Priority Tabs */}
      <div className="flex space-x-2">
        {Object.keys(priorityStyles).map((key) => (
          <button
            key={key}
            onClick={() => setPriority(key)}
            className={`py-2 px-4 rounded-md transition duration-200 ${
              priority === key
                ? `${priorityStyles[key].base} font-semibold border`
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)} Priority
          </button>
        ))}
      </div>

      {/* Task Input */}
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Enter task description"
        className={`border p-3 rounded-md w-full focus:outline-none focus:ring-2 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Add Task Button */}
      <button
        title="add task here.."
        onClick={handleSubmit}
        className="py-2 px-4 text-white rounded-md hover:bg-primary-600 transition duration-200 bg-primary-500"
      >
        Add Task
      </button>

      {/* Success Message */}
      {successMessage && (
        <p className="text-sm text-green-500 font-semibold">{successMessage}</p>
      )}
    </div>
  );
}
