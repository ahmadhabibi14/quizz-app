import { useState, useRef, useEffect } from "react";
// import axios from "axios";
import "./index.css";
import { TriviaData } from "./apis/quiz";
function App() {
   const triviaData = TriviaData
   // React HOOK
   const [showResult, setShowResult] = useState(false);
   let [currentQuestion, setCurrentQuestion] = useState(0);
   const [allPossibleAnswers, setAllPossibleAnswers] = useState([]);
   const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
   const [selectedAnswer, setSelectedAnswer] = useState(false);
   const [answerCorrect, setAnswerCorrect] = useState(false);
   const [result, setResult] = useState({
      correctAnswer: 0,
      wrongAnswer: 0,
      totalAnswer: 0
   })
   const [timer, setTimer] = useState("00:00");
   useEffect(() => {
      combineAllAnswers();
      console.log(triviaData[currentQuestion].incorrect_answers)
      console.log(currentQuestion)

      clearTimer(getDateTime());
   }, []);
   const Ref = useRef(null);

   const getTimeRemaining = (e) => {
      const total = Date.parse(e) - Date.parse(new Date());
      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      return { total, minutes, seconds }
   }
   const startTimer = (e) => {
      let { total, minutes, seconds } = getTimeRemaining(e);
      if (total >= 0) {
         setTimer((minutes > 9 ? minutes : '0'+minutes) + ':' + (seconds > 9 ? seconds : '0'+seconds))
      }
   }
   const clearTimer = (e) => {
      setTimer("15:00");
      if (Ref.current) clearInterval(Ref.current);
      const id = setInterval(() => { startTimer(e) }, 1000);
      Ref.current = id;
   }
   const getDateTime = () => {
      let deadline = new Date();
      deadline.setSeconds(deadline.getSeconds() + 900);
      return deadline;
   }
   const clickOnReset = () => { clearTimer(getDateTime());}


   async function combineAllAnswers() {
      let allAnswers = [];
      let correctAnswer = triviaData[currentQuestion].correct_answer
      triviaData[currentQuestion].incorrect_answers.map((answer) => { allAnswers.push(answer) });
      allAnswers.push(correctAnswer);
      allAnswers.sort(() => Math.random() - 0.5);
      setAllPossibleAnswers(allAnswers);
   }

   const NextQuestion = () => {
      if (currentQuestion !== triviaData.length) {
         setCurrentQuestion(currentQuestion += 1);
         combineAllAnswers();
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
         setSelectedAnswerIndex(null)
      } else {
         setShowResult(true);
      }
      console.log(currentQuestion)
   }
   function removeCharacters(question) {
      return question.replace(/(&quot\;)/g, "\"").replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\"");
   }
   function clickAnswer(answer, index) {
      setSelectedAnswerIndex(index)
      if (answer === triviaData[currentQuestion].correct_answer) {
         setAnswerCorrect(true)
      } else {
         setAnswerCorrect(false)
      }
      setSelectedAnswer(true)
      console.log(answer)
      console.log(answerCorrect)
   }

   const finish = () => {
      setShowResult(true)
   }

   return (
      <div className="bg-zinc-950 min-h-screen text-slate-50 flex justify-center py-16">
         {!showResult ?
            (
            <div className="flex flex-col space-y-6 w-5/12">
               <h1 className="py-4 rounded-xl bg-zinc-900 text-blue-600 text-3xl font-black cursor-pointer text-center">Quiz App</h1>            
               <div className="flex flex-col space-y-3 bg-zinc-900 rounded-xl p-4">
                  {/* <div className="flex flex-row justify-between border-b border-zinc-800 py-4 text-xl font-bold">
                     <div>Question {(currentQuestion > 9 ? currentQuestion + 1 : '0' + (currentQuestion + 1))}<span className="text-blue-600">/</span><span className="text-zinc-400 text-base">{triviaData.length + 1}</span></div>
                     <div>{timer}</div>
                  </div> */}
                  <div className="flex flex-col space-y-6">
                     <h2 className="text-lg font-bold">{removeCharacters(triviaData[currentQuestion]?.question)}</h2>
                     <ul className="flex flex-col space-y-3 list-none">
                        {allPossibleAnswers.map((answer, index) => (
                           <li onClick={()=> clickAnswer(answer, index)}
                              className={selectedAnswerIndex === index ? 'answer-active' : 'answer'}
                              key={index}
                              >
                              {answer}
                           </li>
                        ))}
                     </ul>
                  </div>
                  <div className="flex flex-row justify-end pr-4">
                     <button onClick={NextQuestion} className="py-2 px-6 bg-blue-600 hover:bg-blue-700 rounded-xl w-fit">
                        {currentQuestion === triviaData.length + 1 ? 'Finish' : 'Next'}
                     </button>
                  </div>
               </div>
               {/* <button className="p-2 bg-zinc-800" onClick={clickOnReset}>Reset</button> */}
            </div>
         ) : (
            <div>
               {/* {result.correctAnswer} */}
               tess
            </div>
         )}
      </div>
   )
}
export default App;