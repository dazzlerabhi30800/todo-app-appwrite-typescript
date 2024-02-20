import { FaEdit, FaTrash } from "react-icons/fa";
import EditTodo from "./EditTodo";
import { useTodoContext } from "../Store/Store";

const Todo = ({ todo }: { todo: Todo }) => {
  const { handleEdit, deleteTodo, completeTodo } = useTodoContext();
  // const handleComplete = (value: boolean) => {
  //   console.log(value);
  // };

  return (
    <div className={`todo ${todo.completed && "completed"}`}>
      <div className="complete--container">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => completeTodo(todo.$id, todo.completed)}
          id={`todo--${todo.$id}`}
          className="todo--check"
        />
        <label htmlFor={`todo--${todo.$id}`}></label>
      </div>
      {!todo.edit ? <p>{todo.todo}</p> : <EditTodo note={todo} />}
      <div className="button--container">
        <button
          disabled={todo.completed}
          className="edit--btn"
          onClick={() => handleEdit(todo?.$id)}
        >
          <FaEdit />
        </button>
        <button
          disabled={todo.completed}
          className="remove--btn"
          onClick={() => deleteTodo(todo?.$id)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default Todo;
