import { Client, Account, Databases } from 'appwrite';

const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);

export const appwriteConfig = {
    endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    contactsCollectionId: import.meta.env.VITE_APPWRITE_CONTACTS_COLLECTION_ID,
};

export default client;