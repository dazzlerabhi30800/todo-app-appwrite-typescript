import { useEffect } from "react";
import "./App.css";
import InputForm from "./Components/InputForm";
import Spinner from "./Components/Spinner";
import Todo from "./Components/Todo";
import { useTodoContext } from "./Store/Store";

function App() {
  // Context Import
  const { todos, getDocuments, loading } = useTodoContext();

  // function to run on start
  useEffect(() => {
    getDocuments();
  }, []);

  if (!todos) return <Spinner />;
  return (
    <>
      <h1>Todo App using Appwrite.</h1>
      <InputForm />
      {loading && <Spinner />}
      {!loading && (
        <div className="todo--wrapper">
          {todos.map((todo) => (
            <Todo key={todo.$id} todo={todo} />
          ))}
        </div>
      )}
    </>
  );
}

export default App;
