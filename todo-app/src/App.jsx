import { useState, useEffect } from 'react';


export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [draft, setDraft] = useState('');


    useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);



  const addTask = () => {
    const text = draft.trim();
    if (!text) return;

    setTasks((prev) => [...prev, { id: Date.now(), text, done: false }]);
    setDraft('');
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };


   const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };


  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.done));
  };

  const remaining = tasks.filter((task) => !task.done).length;


   return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md p-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">
        Today's list
      </h1>

      <div className="flex gap-2 mb-4">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          placeholder="Add a task..."
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <ul className="space-y-3">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center gap-3">
            <button
              onClick={() => toggleTask(task.id)}
              className={`w-4 h-4 rounded-full border-2 ${
                task.done ? 'bg-green-500 border-green-500' : 'border-gray-300'
              }`}
            />
            <span
              className={`flex-1 text-gray-700 ${
                task.done ? 'line-through text-gray-400' : ''
              }`}
            >
              {task.text}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-gray-400 hover:text-red-500 text-sm"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {tasks.length > 0 && (
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200 text-sm text-gray-500">
          <span>{remaining} left</span>
          <button
            onClick={clearCompleted}
            className="hover:text-red-500 underline"
          >
            Clear completed
          </button>
        </div>
      )}
    </div>
  );
}