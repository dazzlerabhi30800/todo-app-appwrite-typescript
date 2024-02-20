import { FaEdit } from "react-icons/fa";
import EditTodo from "./EditTodo";
import { Collection_id, Database_id, databases } from "../appWrite";

const Todo = ({
  todo,
  setTodos,
  todos,
}: {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[] | null>>;
  todos: Todo[];
}) => {
  const handleEdit = async (id: string | undefined) => {
    if (!id) return;
    let payload = {
      $id: id,
      edit: true,
    };
    let response = await databases.updateDocument(
      Database_id,
      Collection_id,
      id,
      payload
    );
    setTodos(
      todos.map((note) => {
        if (note.$id === id) {
          return { ...note, edit: response.edit };
        }
        return note;
      })
    );
  };

  return (
    <div className="todo">
      {!todo.edit ? (
        <p>{todo.todo}</p>
      ) : (
        <EditTodo note={todo} todos={todos} setTodos={setTodos} />
      )}
      <button className="edit--btn" onClick={() => handleEdit(todo?.$id)}>
        <FaEdit />
      </button>
    </div>
  );
};

export default Todo;
