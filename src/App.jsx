import React, {useState, useEffect} from "react";
import Home from "./pages/home";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
   const [triviaData, setTriviaData] = useState([]);
   const fetchData = async () => {
      const resp = await fetch("https://opentdb.com/api.php?amount=10&category=10")
      const data = await resp.json()
      return setTriviaData(() => data.results)
   }

   useEffect(() => {
      fetchData();
   }, []);
   return (
      <Router>
         <main className="flex justify-center min-h-screen bg-zinc-950 text-zinc-50 py-16">
            <Routes>
               <Route path="/" element={<Home data={triviaData} />} />
               <Route path="/signup" element={<SignUp />} />
               <Route path="/login" element={<Login />} />
            </Routes>
         </main>
      </Router>
   );
}

export default App;