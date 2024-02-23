import { useState } from "react";
import { useTodoContext } from "../Store/Store";

export default function InputForm() {
  const [todoInput, setTodoInput] = useState<string>("");
  const { handleSubmit } = useTodoContext();
  return (
    <form
      className="input--form"
      onSubmit={(e) => {
        handleSubmit(e, todoInput);
        setTodoInput("");
      }}
    >
      <input
        value={todoInput}
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
