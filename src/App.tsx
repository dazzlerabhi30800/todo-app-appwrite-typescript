import { useEffect, useState } from "react";
import "./App.css";
import { databases, Collection_id, Database_id } from "./appWrite";

function App() {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  useEffect(() => {
    getDocuments();
  }, []);

  async function getDocuments() {
    const response = await databases.listDocuments(Database_id, Collection_id);
    if (!response) return;
    const documents: Todo[] = response.documents.map((doc: any) => ({
      $id: doc.$id,
      todo: doc.todo,
      todo_id: doc.todo_id,
      completed: doc.completed,
    }));
    setTimeout(() => {
      setTodos(documents);
    }, 1200);
  }
  if (!todos) return <div style={{fontSize: "1.3rem"}}>Loading Todos ....</div>;
  return (
    <>
      <h1>Todo App using Appwrite.</h1>
      <ul>
        {todos.map((todo: any) => (
          <li key={todo.$id}>{todo.todo}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
