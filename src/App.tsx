import { useEffect } from "react";
import "./App.css";
import InputForm from "./Components/InputForm";
import Spinner from "./Components/Spinner";
import Todo from "./Components/Todo";
import { useTodoContext } from "./Store/Store";

function App() {
  // Context Import
  const { todos, getDocuments } = useTodoContext();

  // function to run on start
  useEffect(() => {
    getDocuments();
  }, []);

  if (!todos) return <Spinner />;
  return (
    <>
      <h1>Todo App using Appwrite.</h1>
      <InputForm />
      <div className="todo--wrapper">
        {todos.map((todo: any) => (
          <Todo todo={todo} key={todo.$id} />
        ))}
      </div>
    </>
  );
}

export default App;
