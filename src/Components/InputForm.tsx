import { useState } from "react";
import { Collection_id, Database_id, databases } from "../appWrite";
import { nanoid } from "nanoid";
import { ID } from "appwrite";

interface props {
  setTodos: React.Dispatch<React.SetStateAction<Todo[] | null>>;
  todos: Todo[];
}

export default function InputForm({ setTodos, todos }: props) {
  const [todoInput, setTodoInput] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todoInput.length < 5) {
      alert("todo length is short");
      return;
    }
    let payload = {
      todo: todoInput,
      todo_id: nanoid(),
      completed: false,
    };
    // console.log(payload);
    const promise = await databases.createDocument(
      Database_id,
      Collection_id,
      ID.unique(),
      payload
    );
    if (!promise) return;
    const newTodo: Todo = {
      $id: promise.$id,
      todo: promise.todo,
      todo_id: promise.todo_id,
      completed: promise.completed,
    };
    setTodos((prev) => [...todos, newTodo]);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={(e) => setTodoInput(e.target.value)}
        type="text"
        placeholder="Enter your todo"
        id="todo--input"
      />
      <button className="submit--btn" type="submit">
        Add
      </button>
    </form>
  );
}
