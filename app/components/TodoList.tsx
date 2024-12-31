'use client';
import { useState, useEffect } from 'react';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    // Tải dữ liệu từ LocalStorage khi component được mount
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    // Lưu dữ liệu vào LocalStorage mỗi khi state todos thay đổi
     if(todos.length > 0) {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo, completed: false },
      ]);
      setNewTodo('');
    }
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container mx-auto p-4 w-1/2 font-sans">
      <h1 className="text-center text-2xl mb-4">My Todo List</h1>

      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="Add a new todo"
          className="flex-grow border border-gray-300 p-2 mr-2"
        />
        <button onClick={addTodo} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add
        </button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center py-2 border-b border-gray-200">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
              className="mr-2"
            />
            <span className={`flex-grow ${todo.completed ? 'line-through text-gray-400' : ''}`}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}