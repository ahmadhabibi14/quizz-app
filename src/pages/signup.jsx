import React, {useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const SignUp = () => {
   const navigate = useNavigate();

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const onSignUp = async (e) => {
      e.preventDefault()

      await createUserWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            navigate("/login")
         })
         .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
         });
   }

   return (
      <section className="flex flex-col space-y-4 w-5/12 bg-zinc-900 rounded-xl p-6">
         <h1 className="text-center text-xl font-bold">Sign UP</h1>
         <form onSubmit={onSignUp} className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2">
               <label htmlFor="email-address">Email Address</label>
               <input
                  className="border-zinc-800 border rounded-xl bg-zinc-900 focus:border-blue-500 caret-blue-500 py-2.5 px-4 outline-0"
                  type="email"
                  label="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
               />
            </div>

            <div className="flex flex-col space-y-2">
               <label htmlFor="password">Create Password</label>
               <input
                  className="border-zinc-800 border rounded-xl bg-zinc-900 focus:border-blue-500 caret-blue-500 py-2.5 px-4 outline-0"
                  type="password"
                  label="Create Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
               />
            </div>

            <button type="submit" className="py-2 px-4 rounded-xl font-semibold bg-blue-500 hover:bg-blue-600">
               Sign Up
            </button>
         </form>

         <p>
            Already have an account?{' '}
            <NavLink to="/login" className="text-blue-500 hover:underline">
               Sign In
            </NavLink>
         </p>
      </section>
   )
}

export default SignUp