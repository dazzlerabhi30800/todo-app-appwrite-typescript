import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { Collection_id, Database_id, databases } from "../appWrite";

interface edit {
  note: Todo;
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[] | null>>;
}

const EditTodo = ({ note: { todo, $id }, todos, setTodos }: edit) => {
  const [editInput, setEditInput] = useState<string>("");

  useEffect(() => {
    setEditInput(todo);
  }, []);

  const completeEdit = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string | undefined
  ) => {
    e.preventDefault();
    if (!id) return;
    let payload = {
      $id: id,
      edit: false,
      todo: editInput,
    };
    let response = await databases.updateDocument(
      Database_id,
      Collection_id,
      id,
      payload
    );
    setTodos(
      todos.map((note) => {
        if (note.$id === response.$id) {
          return { ...note, edit: response.edit, todo: response.todo };
        }
        return note;
      })
    );
  };

  return (
    <form className="edit--form" onSubmit={(e) => completeEdit(e, $id)}>
      <input
        type="text"
        value={editInput}
        onChange={(e) => setEditInput(e.target.value)}
      />
      <button className="check--btn">
        <FaCheck />
      </button>
    </form>
  );
};

export default EditTodo;
