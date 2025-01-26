// import React, { useState, useEffect } from 'react';
// import { Authentication } from './components/Authentication';
// import { TaskInput } from './components/TaskInput';
// import { TaskList } from './components/TaskList';
// import { WeatherWidget } from './utils/weatherApi';
// // import { Authentication } from './Authentication';
// // import { TaskInput } from './TaskInput';
// // import { TaskList } from './TaskList';
// // import { WeatherWidget } from './WeatherWidget';

// function App() {
//   const [tasks, setTasks] = useState(() =>
//     JSON.parse(localStorage.getItem('tasks') || '[]')
//   );
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setIsAuthenticated(true);
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }, [tasks]);

//   const handleAddTask = (newTask) => {
//     const taskWithId = {
//       ...newTask,
//       id: Date.now(),
//       createdAt: new Date().toISOString()
//     };
//     setTasks([...tasks, taskWithId]);
//   };

//   const handleDeleteTask = (taskId) => {
//     setTasks(tasks.filter(task => task.id !== taskId));
//   };

//   const handleLogin = (userData) => {
//     localStorage.setItem('user', JSON.stringify(userData));
//     setIsAuthenticated(true);
//     setUser(userData);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     setIsAuthenticated(false);
//     setUser(null);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-8 px-4">
//       <div className="container mx-auto max-w-2xl">
//         <div className="bg-white rounded-large shadow-medium overflow-hidden">
//           <Authentication
//             isAuthenticated={isAuthenticated}
//             user={user}
//             onLogin={handleLogin}
//             onLogout={handleLogout}
//           />

//           {isAuthenticated && (
//             <div className="p-6 space-y-6">
//               <TaskInput onAddTask={handleAddTask} />
//               <div className="grid md:grid-cols-2 gap-6">
//                 <TaskList
//                   tasks={tasks}
//                   onDeleteTask={handleDeleteTask}
//                 />
//                 <WeatherWidget />
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

// import React, { useState, useEffect } from 'react';
// import { Authentication } from './components/Authentication';
// import { TaskInput } from './components/TaskInput';
// import { TaskList } from './components/TaskList';
// import { WeatherWidget } from './utils/weatherApi';

// function App() {
//   const [tasks, setTasks] = useState([]);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('currentUser');
//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       setIsAuthenticated(true);
//       setUser(parsedUser);

//       // Load user-specific tasks
//       const userTasks = JSON.parse(
//         localStorage.getItem(`tasks_${parsedUser.email}`) || '[]'
//       );
//       setTasks(userTasks);
//     }
//   }, []);

//   const handleAddTask = (newTask) => {
//     const taskWithId = {
//       ...newTask,
//       id: Date.now(),
//       createdAt: new Date().toISOString()
//     };
//     const updatedTasks = [...tasks, taskWithId];
//     setTasks(updatedTasks);

//     // Save tasks for specific user
//     localStorage.setItem(`tasks_${user.email}`, JSON.stringify(updatedTasks));
//   };

//   const handleDeleteTask = (taskId) => {
//     const updatedTasks = tasks.filter(task => task.id !== taskId);
//     setTasks(updatedTasks);

//     // Update user-specific tasks in localStorage
//     localStorage.setItem(`tasks_${user.email}`, JSON.stringify(updatedTasks));
//   };

//   const handleLogin = (userData) => {
//     // Store current user
//     localStorage.setItem('currentUser', JSON.stringify(userData));
//     setIsAuthenticated(true);
//     setUser(userData);

//     // Load or initialize user-specific tasks
//     const userTasks = JSON.parse(
//       localStorage.getItem(`tasks_${userData.email}`) || '[]'
//     );
//     setTasks(userTasks);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('currentUser');
//     setIsAuthenticated(false);
//     setUser(null);
//     setTasks([]);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-8 px-4">
//       <div className="container mx-auto max-w-2xl">
//         <div className="bg-white rounded-large shadow-medium overflow-hidden">
//           <Authentication
//             isAuthenticated={isAuthenticated}
//             user={user}
//             onLogin={handleLogin}
//             onLogout={handleLogout}
//           />

//           {isAuthenticated && (
//             <div className="p-6 space-y-6">
//               <TaskInput onAddTask={handleAddTask} />
//               <div className="grid md:grid-cols-2 gap-6">
//                 <TaskList
//                   tasks={tasks}
//                   onDeleteTask={handleDeleteTask}
//                 />
//                 <WeatherWidget />
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Authentication } from "./components/Authentication";
import { TaskInput } from "./components/TaskInput";
import { TaskList } from "./components/TaskList";
import { WeatherWidget } from "./utils/weatherApi";
import { Edit, Trash2 } from "lucide-react";
import NotFound from "./components/NotFound";

function App() {
  const [tasks, setTasks] = useState([]);
  const [displayedTasks, setDisplayedTasks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [searchPriority, setSearchPriority] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setIsAuthenticated(true);
      setUser(parsedUser);

      const userTasks = JSON.parse(
        localStorage.getItem(`tasks_${parsedUser.email}`) || "[]"
      );
      setTasks(userTasks);
      setDisplayedTasks(userTasks.slice(-1));
    }
  }, []);

  const handleAddTask = (newTask) => {
    const taskWithId = {
      ...newTask,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      priority: newTask.priority || "Medium", // Default to Medium if not provided
    };
    const updatedTasks = [...tasks, taskWithId];
    setTasks(updatedTasks);

    setDisplayedTasks([taskWithId]);
    setShowAllTasks(false);

    localStorage.setItem(`tasks_${user.email}`, JSON.stringify(updatedTasks));
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);

    const updatedDisplayedTasks = showAllTasks
      ? updatedTasks
      : updatedTasks.slice(-1);
    setDisplayedTasks(updatedDisplayedTasks);

    localStorage.setItem(`tasks_${user.email}`, JSON.stringify(updatedTasks));
  };

  const handleEditTask = (taskId, updatedTaskData) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, ...updatedTaskData } : task
    );
    setTasks(updatedTasks);
    setDisplayedTasks(updatedTasks);

    localStorage.setItem(`tasks_${user.email}`, JSON.stringify(updatedTasks));
  };

  const toggleShowAllTasks = () => {
    if (showAllTasks) {
      setDisplayedTasks(tasks.slice(-1));
      setShowAllTasks(false);
    } else {
      setDisplayedTasks(tasks);
      setShowAllTasks(true);
    }
  };

  const handleSearchChange = (event) => {
    const priority = event.target.value;
    setSearchPriority(priority);

    if (priority) {
      const filteredTasks = tasks.filter(
        (task) => task.priority.toLowerCase() === priority.toLowerCase()
      );
      setDisplayedTasks(filteredTasks);
    } else {
      setDisplayedTasks(tasks);
    }
  };

  const handleLogin = (userData) => {
    localStorage.setItem("currentUser", JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);

    const userTasks = JSON.parse(
      localStorage.getItem(`tasks_${userData.email}`) || "[]"
    );
    setTasks(userTasks);
    setDisplayedTasks(userTasks.slice(-1));
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsAuthenticated(false);
    setUser(null);
    setTasks([]);
    setDisplayedTasks([]);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>

      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Welcoming Message Above Login */}
            {!isAuthenticated && (
              <div className="p-6 text-center space-y-4">
                <h1 className="text-4xl font-bold text-primary-600">
                  Your Task List – Ready to Conquer!
                </h1>
                <p className="text-lg text-gray-600">
                  Start your day by managing your tasks. Keep track and stay
                  organized!
                </p>
              </div>
            )}

            {/* Authentication Component */}
            <Authentication
              isAuthenticated={isAuthenticated}
              user={user}
              onLogin={handleLogin}
              onLogout={handleLogout}
            />

            {isAuthenticated && (
              <div className="p-6 space-y-6">
                {/* Weather Widget */}
                <WeatherWidget />

                {/* Task Input */}
                <TaskInput onAddTask={handleAddTask} />

                {/* Tasks Display */}
                <div className="grid gap-6">
                  <div className="space-y-4">
                    {showAllTasks && (
                      <select
                        value={searchPriority}
                        onChange={handleSearchChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">Filter by Priority...</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    )}
                    {searchPriority && displayedTasks.length === 0 ? (
                      <div className="text-center text-gray-500">
                        No tasks match your search criteria.
                      </div>
                    ) : tasks.length > 0 ? (
                      <TaskList
                        tasks={displayedTasks}
                        onDeleteTask={handleDeleteTask}
                        onEditTask={handleEditTask}
                        EditIcon={Edit}
                        DeleteIcon={Trash2}
                      />
                    ) : (
                      <div className="text-center text-gray-500">
                        No tasks available. Add one to get started!
                      </div>
                    )}

                    {tasks.length > 1 && (
                      <button
                        onClick={toggleShowAllTasks}
                        className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors"
                      >
                        {showAllTasks ? "Show Recent Task" : "Show All Tasks"}
                      </button>
                    )}
                  </div>
                </div>

                {/* Task Count */}
                <p className="text-center text-gray-500">
                  Total tasks: {tasks.length}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
