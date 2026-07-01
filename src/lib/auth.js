import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

import { admin, jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_CONNECTION);
const db = client.db('recipe-hub-server');

export const auth = betterAuth({
   baseURL: process.env.NEXT_PUBLIC_BASE_URL, 

   database: mongodbAdapter(db, {
    
    client
  }),

    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        }, 
    },


    emailAndPassword: { 
    enabled: true, 
  },

  user: {
  additionalFields: {
    role: {
      type: "string",
      defaultValue: "user",
      input: false,
    },
    plan: {
      type: "string",
      defaultValue: "free",
      input: false, 
    },
    blocked: {
      type: "boolean",
      defaultValue: false,
      input: false,
    },
    likesCount: {
      type: "number",
      defaultValue: 0,
      input: false,
    },
  },
},
 plugins: [
        admin(),
        jwt()
    ]
});