import { useState } from "react";
// import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  // fetch all todos from server

  //try catch method is used when we are fetching data from an api

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:3000/todos");
      if (response.ok) {
        const todos = await response.json();
        setTodos(todos);
      } else {
        console.error("Failed to fetch todos");
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const deleteTodos = async (id) => {
    try {
      const response = await fetch("http://localhost:3000/todos/" + id,{
        method : "DELETE"
      });
      console.log("http://localhost:3000/todos/" + id)
      if (response.ok) {
        setTodos([]);
      } else {
        console.error("Failed to delete todos");
      }
    } catch (error) {
      console.error("Error deleting todos:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTodo = {
      title: e.target.todo.value,
      description: e.target.description.value,
      id: Date.now(),
    };

    const response = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    if (response.ok) {
      // // Todo successfully added to the server
      // setTodos((prevTodos) => [...prevTodos, newTodo]);
      // e.target.reset(); // Reset the form fields
      console.log("todo added");
    } else {
      // Handle error
      console.error("Failed to add todo");
    }
  };

  return (
    <>
      <div>
        <h1>Easy Todo App</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" name="todo" placeholder="add a todo" />
          <input
            type="text"
            name="description"
            placeholder="add a description"
          />
          <input type="submit" />
        </form>
      </div>
      <button onClick={fetchTodos}> Get todos </button>
      {todos.map((todo) => {
        return (
          <Todo
            title={todo.title}
            description={todo.description}
            id={todo.id}
            key={todo.id}
            onDelete={() => deleteTodos(todo.id)}
          ></Todo>
        );
      })}
    </>
  );
}

function Todo(props) {
 
  return (
    <div>
      <ul>
        <li>title: {props.title}</li>
        <li> description: {props.description}</li>
        <li> id : {props.id}</li>
      </ul>
      <button onClick={props.onDelete} >DELETE</button>
    </div>
  );
}

export default App;
