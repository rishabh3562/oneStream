import { Account, Client, Databases,Storage ,ID } from "appwrite"

const getAppwrite = () => {
    const client = new Client();

    client
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT )
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
    const account = new Account(client)
    const databases = new Databases(client)
    const storage =new Storage(client)
// console.log(databases)
    return {client, account, databases,storage,ID}
}

export default getAppwrite