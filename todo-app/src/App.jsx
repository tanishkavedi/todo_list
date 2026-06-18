import { useState, useEffect } from 'react';

export default function App() {
    const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  const [draft, setDraft] = useState('');

  const addTask = () => {
    const text = draft.trim();
    if (!text) return;
    setTasks((prev) => [...prev, { id: Date.now(), text, done: false }]);
    setDraft('');
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.done));
  };

  const remaining = tasks.filter((task) => !task.done).length;
  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#EFECE4]">
      <div className="w-full max-w-sm bg-[#FAF6EE] rounded-2xl shadow-lg p-7">
        <div className="font-data text-[11px] uppercase tracking-wider text-[#8A8474] pb-3 border-b border-[#DED5C2]">
          {today}
        </div>

        <h1 className="font-display text-2xl font-semibold text-[#232A3B] py-4 border-b border-[#DED5C2]">
          Today's list
        </h1>

        <div className="flex items-center gap-2 py-3 border-b border-[#DED5C2]">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            placeholder="Add a task..."
            className="flex-1 bg-transparent outline-none text-sm text-[#232A3B] placeholder-[#8A8474]"
          />
          <button
            onClick={addTask}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#D9603F] text-[#FAF6EE] text-lg leading-none hover:opacity-90"
          >
            +
          </button>
        </div>

        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className="group flex items-center gap-3 py-3 border-b border-[#DED5C2] last:border-b-0"
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  task.done ? 'bg-[#5C7A52] border-[#5C7A52]' : 'border-[#8A8474]'
                }`}
              >
                {task.done && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="white"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>

              <span className="relative flex-1 text-sm text-[#232A3B]">
                <span className={task.done ? 'text-[#8A8474]' : ''}>{task.text}</span>
                {task.done && (
                  <svg
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-3 overflow-visible pointer-events-none"
                    viewBox="0 0 100 12"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2,6 C20,2 35,9 50,5 C65,1 80,8 98,4"
                      stroke="#D9603F"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                )}
              </span>

              <button
                onClick={() => deleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 text-[#8A8474] hover:text-[#D9603F] text-sm transition-opacity"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        {tasks.length > 0 && (
          <div className="font-data flex justify-between items-center pt-3 mt-1 text-xs text-[#8A8474]">
            <span>
              {remaining} {remaining === 1 ? 'task' : 'tasks'} left
            </span>
            <button onClick={clearCompleted} className="underline hover:text-[#D9603F]">
              clear done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}