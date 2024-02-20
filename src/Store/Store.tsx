import {
  Dispatch,
  FormEvent,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { Collection_id, Database_id, databases } from "../appWrite";
import { ID } from "appwrite";
import { nanoid } from "nanoid";

interface todoContext {
  todos: Todo[] | null;
  setTodos: Dispatch<SetStateAction<Todo[] | null>>;
  getDocuments: () => Promise<void>;
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    todoString: string
  ) => Promise<void>;
  handleEdit: (id: string | undefined) => Promise<void>;
  completeEdit: (
    e: FormEvent<HTMLFormElement>,
    id: string | undefined,
    editInput: string
  ) => Promise<void>;
  deleteTodo: (id: string | undefined) => Promise<void>;
  completeTodo: (id: string | undefined, checked: boolean) => Promise<void>;
}

export const TodoContext = createContext<todoContext | null>(null);

export default function TodoContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  // States
  const [todos, setTodos] = useState<Todo[] | null>(null);

  // functions

  // function to fetch todos
  const getDocuments = async () => {
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
  };

  // to add todo

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    todoString: string
  ) => {
    e.preventDefault();
    if (todoString.length < 5) {
      alert("todo length is short");
      return;
    }
    let payload = {
      todo: todoString,
      todo_id: nanoid(),
      completed: false,
      edit: false,
    };
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
      edit: promise.edit,
    };
    setTodos((prev) => [...(todos as Todo[]), newTodo]);
  };

  // function to edit Todo
  const handleEdit = async (id: string | undefined) => {
    if (!id || !todos) return;
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

  // function to confirm edit
  const completeEdit = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string | undefined,
    editInput: string
  ) => {
    e.preventDefault();
    if (!id || !todos) return;
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

  // Delete Todo
  const deleteTodo = async (id: string | undefined) => {
    if (!id || !todos) return;
    await databases.deleteDocument(Database_id, Collection_id, id);
    setTodos(todos.filter((todo) => todo.$id !== id));
  };

  // Mark Completed Todo
  const completeTodo = async (id: string | undefined, checked: boolean) => {
    if (!id || !todos || checked === undefined) return;
    let payload = {
      $id: id,
      completed: !checked,
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
          return { ...note, completed: response.completed };
        }
        return note;
      })
    );
  };

  // Return component
  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        getDocuments,
        handleSubmit,
        handleEdit,
        completeEdit,
        deleteTodo,
        completeTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export const useTodoContext = () => {
  const todoContext = useContext(TodoContext);
  if (!todoContext) {
    throw new Error("Your are not using the todo context");
  } else {
    return todoContext;
  }
};
