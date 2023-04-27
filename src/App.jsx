import React, {useState, useEffect} from "react";
import Home from "./pages/home";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
   return (
      <Router>
         <main className="flex justify-center min-h-screen bg-zinc-950 text-zinc-50 py-16">
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/signup" element={<SignUp />} />
               <Route path="/login" element={<Login />} />
            </Routes>
         </main>
      </Router>
   );
}

export default App;