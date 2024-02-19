import { Client, Databases} from "appwrite";



export const Database_id = "65d2e1ba98dc506d4c9e";
export const Collection_id = "65d2e1c1ceefca180096";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65d2e06571f6b3feabd6");

export const databases = new Databases(client);

export default client;
