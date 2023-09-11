import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import connectDB from "./connectDB";
import { AuthOptions } from "next-auth";
import User from "./models/user"
import { NextApiRequest, NextApiResponse } from "next";



export const nextauthOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            credentials: {},
            async authorize(credentials, req) {
                connectDB()
                
                const {emailLogin: email, passwordLogin: password} = credentials as {
                    emailLogin: string,
                    passwordLogin: string
                }
                console.log(email, password);
                
                const user = await User.findOne({email});
                console.log(user);
                
                if(!user){
                    throw new Error("User does not exist.")
                }
                //validate password
                const passwordIsValid = await bcrypt.compare(
                    password!,
                    user.password
                );
        
                if (!passwordIsValid) {
                    throw new Error("Invalid credentials");
                }

                return {
                    user,
                    id: user._id.toString(),
                };
            },
        
        }), 
        
    ],
    pages: {
        signIn: "/auth/login",      // URL for the login page
        signOut: "/auth/logout",    // URL for the logout page
        error: "/auth/error",       // URL for error page (e.g., for displaying authentication errors)
        verifyRequest: "/auth/verify-request", // URL for request to verify email
        newUser: null,              // URL for new user registration (set to null if you don't have this page)
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
        // Persist the OAuth access_token to the token right after signin
        if (user) {
            token.accessToken = user;
        }
        return token;
        },
        async session({ session, token, user }) {
        // Send properties to the client, like an access_token from a provider.
        session.user = token.accessToken;
        return session;
        },
    },
    
}