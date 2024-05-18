import { ID } from "appwrite";
import getAppwrite from "@/helpers/init/getAppwrite";

const { client, account, databases } = getAppwrite();

// data is the form data e.g:- {email: "xyz@gmail", password: "123456", username: "", usertype: "creator"}

export const authHelper = async (data) => {
    const { email, password, username } = data;
    try {
        const d = await account.create(ID.unique(), email, password, username);
        console.log({ d });
        return d;
    } catch (error) {
        console.error("Error during account creation:", error);
        throw new Error("Account creation failed");
    }
};
export const handleSignIn = async (data) => {
    const { emailOrUsername, password } = data;

    // Regular expression to validate email format
    const isEmail = /\S+@\S+\.\S+/.test(emailOrUsername);
console.log("isEmail", { isEmail });
    try {
        if (isEmail) {
            // Sign in with email
            const session = await account.createEmailPasswordSession(emailOrUsername, password);
           console.log("session in handleSignIn", { session });
            return session;
        } else {
            // Retrieve the user by username
            const users = await databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DB, process.env.NEXT_PUBLIC_APPWRITE_DB_USERS_COLLN, [
                Query.equal('username', emailOrUsername)
            ]);

            if (users.total === 0) {
                throw new Error('User not found');
            }

            const user = users.documents[0];
            const session = await account.createEmailSession(user.email, password);
            console.log("session in handleSignIn", { session });
            console.log("user in handleSignIn", { user });
            console.log("users in handleSignIn", { users });

            return session;
        }
    } catch (error) {
        console.error("Error during sign-in:", error);
        throw new Error("Sign-in failed");
    }}

// export const handleSignIn = async (data) => {
//     const { email, password } = data;
//     try {
//         const session = await account.getSession(email, password);
//         console.log("session in handleSignIn",{ session });
//         return session;
//     } catch (error) {
//         console.error("Error during sign-in:", error);
//         throw new Error("Sign-in failed");
//     }
// };

export const handleSignUp = async (data) => {
    const { email, password, username, usertype } = data;
    try {
        const authRes = await authHelper(data);
        const uniqueId = authRes["$id"];

        if (usertype === "creator") {
            try {
                const Creator_Doc = await databases.createDocument(
                    process.env.NEXT_PUBLIC_APPWRITE_DB,
                    process.env.NEXT_PUBLIC_APPWRITE_DB_CREATORS_COLLN,
                    uniqueId,
                    {
                        email: email,
                        uid: uniqueId,
                        firstname: '',
                        lastname: '',
                        bio: '',
                        username: username,
                    }
                );
                console.log({ Creator_Doc });

                try {
                    const promise = await account.createEmailPasswordSession(email, password);
                    console.log("promise", { promise });
                } catch (error) {
                    console.error("Error creating email/password session:", error);
                    throw new Error("Session creation failed");
                }

                return Creator_Doc;
            } catch (error) {
                console.error("Error creating creator document:", error);
                throw new Error("Creator document creation failed");
            }
        }

        return authRes;
    } catch (error) {
        console.error("Error during sign-up process:", error);
        throw error;
    }
};
