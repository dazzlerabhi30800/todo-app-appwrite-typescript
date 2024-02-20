import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useTodoContext } from "../Store/Store";

interface edit {
  note: Todo;
}

const EditTodo = ({ note: { todo, $id } }: edit) => {
  const [editInput, setEditInput] = useState<string>("");
  const { completeEdit } = useTodoContext();

  useEffect(() => {
    setEditInput(todo);
  }, []);

  return (
    <form
      className="edit--form"
      onSubmit={(e) => completeEdit(e, $id, editInput)}
    >
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
