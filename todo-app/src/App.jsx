export default function App() {
  const tasks = [] ;

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md p-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">
        Today's list
      </h1>

      <ul className="space-y-3">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center gap-3">
            <span
              className={`w-4 h-4 rounded-full border-2 ${
                task.done ? 'bg-green-500 border-green-500' : 'border-gray-300'
              }`}
            />
            <span
              className={`text-gray-700 ${
                task.done ? 'line-through text-gray-400' : ''
              }`}
            >
              {task.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}