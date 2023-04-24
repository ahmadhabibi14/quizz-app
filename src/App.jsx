import { useState, useRef, useEffect } from "react";
// import axios from "axios";
import "./index.css";
import { TriviaData } from "./apis/quiz";
function App() {
   const triviaData = TriviaData
   // useState HOOK
   const [showResult, setShowResult] = useState(false);
   const [allPossibleAnswers, setAllPossibleAnswers] = useState([]);
   let [currentQuestion, setCurrentQuestion] = useState(0);
   const [answerCorrect, setAnswerCorrect] = useState(false);
   const [result, setResult] = useState({
      correctAnswer: 0,
      wrongAnswer: 0,
      totalAnswer: 0
   })
   // useEffect HOOK
   useEffect(() => {
      combineAllAnswers();
      console.log(triviaData.length)
   }, []);

   function combineAllAnswers() {
      let allAnswers = [];
      let correctAnswer = triviaData[currentQuestion].correct_answer
      triviaData[currentQuestion].incorrect_answers.map((answer) => { allAnswers.push(answer) });
      allAnswers.push(correctAnswer);
      allAnswers.sort(() => Math.random() - 0.5);
      setAllPossibleAnswers(allAnswers);
   }
   function removeCharacters(question) {
      return question.replace(/(&quot\;)/g, "\"").replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\"");
   }
   function clickAnswer(answer) {
      if (currentQuestion !== triviaData.length - 1) {
         answer === triviaData[currentQuestion].correct_answer
            ?  setAnswerCorrect(true)
            :  setAnswerCorrect(false)
         setResult(( {correctAnswer, wrongAnswer, totalAnswer} ) => (
            answerCorrect ? {
               correctAnswer: correctAnswer + 1,
               wrongAnswer: wrongAnswer,
               totalAnswer: totalAnswer + 1,
            } : {
               correctAnswer: correctAnswer,
               wrongAnswer: wrongAnswer + 1,
               totalAnswer: totalAnswer + 1,
            }
         ))
         setCurrentQuestion(currentQuestion += 1);
         combineAllAnswers();
      } else {
         setResult(( {correctAnswer, wrongAnswer, totalAnswer} ) => (
            answerCorrect ? {
               correctAnswer: correctAnswer + 1,
               wrongAnswer: wrongAnswer,
               totalAnswer: totalAnswer + 1,
            } : {
               correctAnswer: correctAnswer,
               wrongAnswer: wrongAnswer + 1,
               totalAnswer: totalAnswer + 1,
            }
         ))
         setShowResult(true);
      }
   }

   return (
      <div className="bg-zinc-950 min-h-screen text-slate-50 flex justify-center py-16">
         {!showResult ?
            (
            <div className="flex flex-col space-y-6 w-5/12">
               <h1 className="py-4 rounded-xl bg-zinc-900 text-blue-600 text-3xl font-black cursor-pointer text-center">Quiz App</h1>            
               <div className="flex flex-col space-y-3 bg-zinc-900 rounded-xl p-4">
                  <div className="flex flex-row justify-between border-b border-zinc-800 py-4 text-xl font-bold">
                     <div>Question {(currentQuestion >= 9 ? (currentQuestion + 1) : '0'+(currentQuestion + 1))}<span className="text-blue-600">/</span><span className="text-zinc-400 text-base">{triviaData.length}</span></div>
                     <div>15:00</div>
                  </div>
                  <div className="flex flex-col space-y-6">
                     <h2 className="text-lg">{removeCharacters(triviaData[currentQuestion]?.question)}</h2>
                     <ul className="flex flex-col space-y-3 list-none">
                        {allPossibleAnswers.map((answer, index) => (
                           <li onClick={()=> clickAnswer(answer)}
                              className="answer"
                              key={index}
                              >
                              {answer}
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>
         ) : (
            <div className="flex flex-col space-y-4 w-5/12">
               <p className="text=lg font-bold">Total Answer {result.totalAnswer}</p>
               <p className="text=lg font-bold">Correct Answer {result.correctAnswer}</p>
               <p className="text=lg font-bold">Wrong Answer {result.wrongAnswer}</p>
            </div>
         )}
      </div>
   )
}
export default App;
