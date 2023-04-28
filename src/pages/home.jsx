import { useState, useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Home(props) {
   const navigate = useNavigate();
   const triviaData = props.data;
   const [showResult, setShowResult] = useState(false);
   const [allPossibleAnswers, setAllPossibleAnswers] = useState([]);
   let [currentQuestion, setCurrentQuestion] = useState(0);
   const [answerCorrect, setAnswerCorrect] = useState(false);
   const [result, setResult] = useState({ correctAnswer: 0, wrongAnswer: 0, totalAnswer: 0 })
   const [timer, setTimer] = useState("00:00");
   const Ref = useRef(null);
   useEffect(() => {
      if (Cookies.get("firebase_token")) {
         combineAllAnswers();
         if (showResult === false) {
            clearTimer(getDateTime());
         }
      } else {
         navigate("/login");
      }
   }, [props.data]);
   // LOGIC
   function combineAllAnswers() {
      let allAnswers = [];
      let correctAnswer = triviaData[currentQuestion]?.correct_answer
      triviaData[currentQuestion]?.incorrect_answers.map((answer) => { allAnswers.push(answer) });
      allAnswers.push(correctAnswer);
      allAnswers.sort(() => Math.random() - 0.5);
      setAllPossibleAnswers(allAnswers);
   }
   function removeCharacters(question) {
      if (!question) return
      return question.replace(/(&quot\;)/g, "\"").replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\"");
   }
   function clickAnswer(answer) {
      if (currentQuestion !== triviaData.length - 1) {
         answer === triviaData[currentQuestion].correct_answer
            ?  setAnswerCorrect(true)
            :  setAnswerCorrect(false)
         setResult(( {correctAnswer, wrongAnswer, totalAnswer} ) => ( answerCorrect
            ? { correctAnswer: correctAnswer + 1, wrongAnswer: wrongAnswer, totalAnswer: totalAnswer + 1 }
            : { correctAnswer: correctAnswer, wrongAnswer: wrongAnswer + 1, totalAnswer: totalAnswer + 1 }
         ))
         setCurrentQuestion(currentQuestion += 1);
         combineAllAnswers();
      } else {
         setResult(( {correctAnswer, wrongAnswer, totalAnswer} ) => ( answerCorrect
            ? { correctAnswer: correctAnswer + 1, wrongAnswer: wrongAnswer, totalAnswer: totalAnswer + 1 }
            : { correctAnswer: correctAnswer, wrongAnswer: wrongAnswer + 1, totalAnswer: totalAnswer + 1 }
         ))
         setShowResult(true);
      }
   }
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
      } else {
         setShowResult(true)
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

   return (
      <div className="w-full flex justify-center">
         {!showResult ? (
            <div className="flex flex-col space-y-6 w-5/12">
               <h1 className="py-4 rounded-xl bg-zinc-900 text-blue-600 text-3xl font-black cursor-pointer text-center">Quiz App</h1>            
               <div className="flex flex-col space-y-3 bg-zinc-900 rounded-xl p-4">
                  <div className="flex flex-row justify-between border-b border-zinc-800 py-4 text-xl font-bold">
                     <div>Question {(currentQuestion >= 9 ? (currentQuestion + 1) : '0'+(currentQuestion + 1))}<span className="text-blue-600">/</span><span className="text-zinc-400 text-base">{triviaData.length}</span></div>
                     <div>{timer}</div>
                  </div>
                  <div className="flex flex-col space-y-6">
                     <h2 className="text-lg">{removeCharacters(triviaData[currentQuestion]?.question)}</h2>
                     <ul className="flex flex-col space-y-3 list-none">
                        {allPossibleAnswers.map((answer, index) => (
                           <li onClick={()=> clickAnswer(answer)}
                              className="cursor-pointer py-2 px-3 rounded-xl bg-zinc-800 hover:bg-blue-400/20 group hover:text-blue-500 flex flex-row space-x-3"
                              key={index}
                              >
                              <svg viewBox="0 0 24 24"
                                 className="w-[16px] h-auto fill-none stroke-zinc-400 group-hover:stroke-blue-500"
                                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                 <circle cx="12" cy="12" r="10"></circle>
                                 <circle cx="12" cy="12" r="3"></circle>
                              </svg>
                              <span>{answer}</span>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>
         ) : (
            <div className="flex flex-col w-5/12 rounded-xl bg-zinc-900 p-8 h-fit">
               <h2 className="items-center text-xl font-bold flex flex-row justify-between py-4 border-b border-zinc-800">
                  <span>Total Answer</span>
                  <span className="text-blue-500">{result.totalAnswer}</span>
               </h2>
               <h2 className="items-center text-xl font-bold flex flex-row justify-between py-4 border-b border-zinc-800">
                  <span>Correct Answer</span>
                  <span className="text-blue-500">{result.correctAnswer}</span>
               </h2>
               <h2 className="items-center text-xl font-bold flex flex-row justify-between py-4">
                  <span>Wrong Answer</span>
                  <span className="text-blue-500">{result.wrongAnswer}</span>
               </h2>
            </div>
         )}
      </div>
   )
   // return ( <p>tes</p>)
}
export default Home;
