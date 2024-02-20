import { useEffect, useState } from "react";
import "./App.css";
import { databases, Collection_id, Database_id } from "./appWrite";
import InputForm from "./Components/InputForm";
import Spinner from "./Components/Spinner";
import Todo from "./Components/Todo";

function App() {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  useEffect(() => {
    getDocuments();
  }, []);

  async function getDocuments() {
    const response = await databases.listDocuments(Database_id, Collection_id);
    if (!response) return;
    // console.log(response.documents);
    const documents: Todo[] = response.documents.map((doc: any) => ({
      $id: doc.$id,
      todo: doc.todo,
      todo_id: doc.todo_id,
      completed: doc.completed,
      edit: doc.edit,
    }));
    setTimeout(() => {
      setTodos(documents);
    }, 1200);
  }
  if (!todos) return <Spinner />;
  return (
    <>
      <h1>Todo App using Appwrite.</h1>
      <InputForm setTodos={setTodos} todos={todos} />
      <div className="todo--wrapper">
        {todos.map((todo: any) => (
          <Todo todo={todo} key={todo.$id} setTodos={setTodos} todos={todos} />
        ))}
      </div>
    </>
  );
}

export default App;
