import {ID} from "appwrite";
import getInitialClient from "./getAppwrite";  

const { client, account, databases } = getInitialClient();


//data is the form data e.g:- {email: "xyz@gmail", password: "123456",username:"",usertype:"creator"}

export const authHelper = async (data) => {
    const { email, password,username,usertype } = data;
    try {
        const d = await account.create(ID.unique(), email, password,username);
       
        console.log({d});
        return d;
    } catch (error) {
        console.log(error);
    }
  
}
export const handleSignIn = async (data) => {};

export const handleSignUp = async (data) => {

    // const fullName = `${data.fname.charAt(0).toUpperCase() + data.fname.slice(1)} ${data.lname.charAt(0).toUpperCase() + data.lname.slice(1)}`;
    const {email,password,username,usertype}=data;
    try {
        const authRes = await authHelper(data);
        /*
        const account_Creation=await databases.createDocument(process.env.NEXT_PUBLIC_APPWRITE_DB, process.env.NEXT_PUBLIC_APPWRITE_DB_USERS_COLLN, ID.unique(), {
            email: data.email,
            uid: d["$id"],
            name: d["name"]

        });
        */
  
        // const { email, password } = getValues();
    //   const test2=  await handleSignIn({ email, password });
    //   console.log({d,account_Creation,test2,email,password});
      return authRes;
    } catch (error) {
        console.log(error);
    }
  

  };
  