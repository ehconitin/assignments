import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  function Addtodos() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    setTodos([
      ...todos,
      {
        title: title,
        description: description,
      },
    ]);
  }

  return (
    <>
      <input
        style={{ padding: 10 }}
        id="title"
        type="text"
        placeholder="Enter title"
      />
      <br />
      <br />
      <input
        style={{ padding: 10 }}
        id="description"
        type="text"
        placeholder="Enter description"
      />
      <br />
      <br />
      <button style={{ padding: 10 }} onClick={Addtodos}>
        Add task
      </button>
      {todos.map(function (todo) {
        return <Todos title={todo.title} description={todo.description} />;
      })}
    </>
  );
}

function Todos(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2> {props.description}</h2>
    </div>
  );
}

export default App;
