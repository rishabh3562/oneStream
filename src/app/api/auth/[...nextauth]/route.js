import NextAuth from 'next-auth/next';

// import Providers from 'next-auth/providers';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)
const handler= NextAuth({
  // Configure one or more authentication providers
  providers: [
   Google({
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" } ,
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        // Connect to MongoDB
       const mongoResult= await connect();
console.log(mongoResult);
        // Find user by email
        const user = await User.findOne({ email: credentials.email });
console.log(user);
        // Verify password
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          // If password matches, return user object
          return Promise.resolve({ id: user._id, email: user.email });
        } else {
          // If email or password is incorrect, return null
          return Promise.resolve(null);
        }
      }
    }),
    // Add more authentication providers as needed
  ],
  pages:{
    signIn: '/login',
    signOut: '/auth/signout',

    signup: '/signup',
    // signUp: '/signup',
    // error: '/auth/error',
    // verifyRequest: '/auth/verify-request',
  },
  

  
});


export {handler as GET, handler as POST}




















