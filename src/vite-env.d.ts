type Todo = {
  $collectionId?: string;
  $createdAt: string;
  $databaseId?: string;
  $id: string;
  $permissions?: any;
  $updatedAt?: string;
  user_id: string;
  completed: boolean;
  edit: boolean;
  todo: string;
  todo_id: string;
};


type login = {
  email: string,
  pass: string
}
type signup = {
  name: string,
  email: string,
  pass1: string,
  pass2: string,
}
