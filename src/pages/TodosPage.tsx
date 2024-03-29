import { useEffect } from "react";
import { useTodoContext } from "../Store/Store";
import Spinner from "../Components/Spinner";
import InputForm from "../Components/InputForm";
import Todo from "../Components/Todo";

export default function TodosPage() {
  // Context Import
  const { todos, getDocuments, loading, user } = useTodoContext();

  // function to run on start
  useEffect(() => {
    getDocuments();
  }, []);

  if (!todos) return <Spinner margin="0 0" />;
  return (
    <div className="todos--wrapper">
      <h1>Todo App using Appwrite.</h1>
      <InputForm />
      {loading && <Spinner margin="30px" />}
      {!loading && (
        <div className="todos--container">
          {todos.map(
            (todo) =>
              user.$id === todo.user_id && <Todo key={todo.$id} todo={todo} />
          )}
        </div>
      )}
    </div>
  );
}
