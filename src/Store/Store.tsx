import {
  Dispatch,
  FormEvent,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { Collection_id, Database_id, account, databases } from "../appWrite";
import { ID } from "appwrite";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

interface todoContext {
  user: any | null;
  showPass: boolean;
  todos: Todo[] | null;
  loading: boolean;
  setUser: Dispatch<SetStateAction<any | null>>;
  setTodos: Dispatch<SetStateAction<Todo[] | null>>;
  setShowPass: Dispatch<SetStateAction<boolean>>;
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
  getSession: () => Promise<void>;
  handleSignUp: (
    e: FormEvent<HTMLFormElement>,
    credentials: signup
  ) => Promise<void>;
  handleLogin: (
    e: FormEvent<HTMLFormElement>,
    credentials: login
  ) => Promise<void>;
}

export const TodoContext = createContext<todoContext | null>(null);

export default function TodoContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  // States
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any | null>(null);
  const [showPass, setShowPass] = useState<boolean>(false);
  const navigate = useNavigate();

  // functions

  // function to fetch todos
  const getDocuments = async () => {
    setLoading(true);
    const response = await databases.listDocuments(Database_id, Collection_id);
    if (!response) return;
    const documents: Todo[] = response.documents.map((doc: any) => ({
      $id: doc.$id,
      todo: doc.todo,
      todo_id: doc.todo_id,
      completed: doc.completed,
      edit: doc.edit,
    }));
    setTimeout(() => {
      setTodos(documents);
      setLoading(false);
    }, 1500);
  };

  const handleSignUp = async (
    e: FormEvent<HTMLFormElement>,
    credentials: signup
  ) => {
    e.preventDefault();
    let { email, name, pass1, pass2 } = credentials;
    if (
      email.length < 8 ||
      name.length < 8 ||
      pass1.length < 8 ||
      pass2.length < 8
    ) {
      alert("one of your credentials are less than 5");
      return;
    }
    if (pass1 !== pass2) {
      alert("Your password & confirm password didn't match.");
      return;
    }
    try {
      const response = await account.create(ID.unique(), email, pass1, name);
      console.log("user registered: ", response);
      await account.createEmailSession(email, pass1);
      let accountDetails = await account.get();
      setUser(accountDetails);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = async (
    e: FormEvent<HTMLFormElement>,
    credentials: login
  ) => {
    e.preventDefault();
    let { email, pass } = credentials;
    if (email.length < 8 || pass.length < 8) return;
    try {
      await account.createEmailSession(email, pass);
      let accountDetails = await account.get();
      setUser(accountDetails);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // to add todo

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    todoString: string
  ) => {
    e.preventDefault();
    if (todoString.length <= 5) {
      alert("todo is short or empty");
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
    getDocuments();
  };

  // function to get current user
  const getSession = async () => {
    const session = await account.get();
    if (!session) return;
    navigate("/");
    setUser(session);
  };

  // function to edit Todo
  const handleEdit = async (id: string | undefined) => {
    if (!id || !todos) return;
    let payload = {
      $id: id,
      edit: true,
    };
    await databases.updateDocument(Database_id, Collection_id, id, payload);
    getDocuments();
    alert("todo added");
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
    await databases.updateDocument(Database_id, Collection_id, id, payload);
    getDocuments();
  };

  // Delete Todo
  const deleteTodo = async (id: string | undefined) => {
    if (!id || !todos) return;
    await databases.deleteDocument(Database_id, Collection_id, id);
    getDocuments();
  };

  // Mark Completed Todo
  const completeTodo = async (id: string | undefined, checked: boolean) => {
    if (!id || !todos || checked === undefined) return;
    let payload = {
      $id: id,
      completed: !checked,
    };
    await databases.updateDocument(Database_id, Collection_id, id, payload);
    getDocuments();
  };

  // Return component
  return (
    <TodoContext.Provider
      value={{
        user,
        showPass,
        todos,
        loading,
        setUser,
        setTodos,
        setShowPass,
        getDocuments,
        handleSubmit,
        handleEdit,
        completeEdit,
        deleteTodo,
        completeTodo,
        getSession,
        handleSignUp,
        handleLogin,
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
