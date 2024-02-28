import { Account, Client, Databases } from "appwrite";

export const Database_id = import.meta.env.VITE_DATABASE_ID;
export const Collection_id = import.meta.env.VITE_COLLECTION_ID;

const client = new Client();
export const account = new Account(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_PROJECT_ID);

export const databases = new Databases(client);

export default client;
