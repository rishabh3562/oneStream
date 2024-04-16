import NextAuth from 'next-auth/next';

// import Providers from 'next-auth/providers';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
console.log("console",process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)
console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET)

const handler = NextAuth({
  providers: [
    Google({
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
    }),
    Credentials({
        email: { label: "Email", type: "email" },
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      }),
  ],

  callbacks: {
    async authorize(credentials) {
      // Connect to MongoDB
     const connection= await connect();
      console.log("connection",connection);
      // Find user by email or username
      const user = await User.findOne({
        $or: [{ email: credentials.email }, { username: credentials.username }],
      });
      console.log("user",user);
      // If user does not exist, create a new user
      if (!user) {
        // Hash the password
        const hashedPassword = await bcrypt.hash(credentials.password, 10);

        // Create a new user object
        const newUser = new User({
          email: credentials.email,
          username: credentials.username,
          password: hashedPassword,
          // Add additional user data here...
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        // Return the user object with an identifier (e.g., email or ID)
        return Promise.resolve({ id: savedUser._id, email: savedUser.email });
      }

      // If user already exists, verify password and return user object
      if (bcrypt.compareSync(credentials.password, user.password)) {
        return Promise.resolve({ id: user._id, email: user.email });
      } else {
        // If password is incorrect, return null
        return Promise.resolve(null);
      }
    },
  },
  pages:{
    signIn: '/login',
    signOut: '/auth/signout',
    signUp: '/signup',
    // error: '/auth/error',
    // verifyRequest: '/auth/verify-request',
  },
database: process.env.MONGODB_URI,
  secret: process.env.SECRET,
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.SECRET,
  },
  debug: true,
  // Enable debug messages in the console if you are having problems
  debug: true,
});

export {handler as GET , handler as POST};
