import { useState, useEffect } from "react";
// import axios from "axios";
import "./index.css";
import { TriviaData } from "./apis/quiz";

function App() {
   const triviaData = TriviaData
   const [currentQuestion, setCurrentQuestion] = useState(0);
   const [activeAnswer, setActiveAnswer] = useState(false);
   // const [allPossibleAnswers, setAllPossibleAnswers] = useState([]);

   // function combineAllAnswers() {
   //    let allAnswers = [];
   //    let correctAnswer = triviaData[currentQuestion].correct_answer
   //       triviaData[currentQuestion].incorrect_answers.map((incorrectAnswer) => {
   //          allAnswers.push(incorrectAnswer)
   //       });
   //    allAnswers.push(correctAnswer);
   //    allAnswers.sort(() => Math.random() - 0.5);
   //    setAllPossibleAnswers(allAnswers);
   //  }

   // async function GetTriviaData() {
   //    const resp = await axios.get("https://opentdb.com/api.php?amount=10&category=11")
   //       // .then(response => response.data
   //       // ).then(data => 
   //       //    setTriviaData(data.results)
   //       // ).catch(error => {
   //       //    console.error(error)
   //       // });
   //    setTriviaData(resp.data.results)
   //    // await combineAllAnswers(resp.data.results, resp.data.results[currentQuestion].correct_answer);
   // }

   // useEffect(() => {
   //    combineAllAnswers();
   // }, []);

   const NextQuestion = () => {
      if (currentQuestion < triviaData.length) {
         setCurrentQuestion(currentQuestion + 1);
         // combineAllAnswers(triviaData[currentQuestion], triviaData[currentQuestion].correct_answer);
      } else {
         console.log("Success")
      }
   }

   function removeCharacters(question) {
      return question.replace(/(&quot\;)/g, "\"").replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\"");
   }

   function clickAnswer() {
      setActiveAnswer(!activeAnswer)
   }
   
   // console.log(triviaData[0])
   return (
      <div className="bg-zinc-950 min-h-screen text-slate-50 flex justify-center py-16">
         <div className="flex flex-col space-y-6 w-5/12">
            <h1 className="text-xl py-4 rounded-xl bg-zinc-900 font-bold text-center">Quiz App</h1>
            <div className="flex flex-col space-y-3 bg-zinc-900 rounded-xl p-4">
               
               <div className="flex flex-col space-y-3">
                  <h2 className="text-lg font-bold">{removeCharacters(triviaData[currentQuestion].question)}</h2>
                  <ul className="flex flex-col space-y-3 list-none">
                     {triviaData[currentQuestion].incorrect_answers.map((answer, index) => (
                        <li onClick={clickAnswer} className={activeAnswer ? 'answer-active' : 'answer'} key={index}>{answer}</li>
                     ))}
                     <li onClick={clickAnswer} className={activeAnswer ? 'answer-active' : 'answer'}>{triviaData[currentQuestion].correct_answer}</li>
                  </ul>
               </div>
               <div className="flex flex-row justify-end pr-4">
                  <button onClick={NextQuestion} className="py-2 px-6 bg-blue-600 rounded-xl w-fit">Next</button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default App
