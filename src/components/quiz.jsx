import { useState } from "react"

const Quiz = () => {
   const [activeQuestion, setActiveQuestion] = useState(0)
   const [selectedAnswer, setSelectedAnswer] = useState("")
   const [result, setResult] = useState({
      score: 0,
      correctAnswer: 0,
      wrongAnswer: 0,
   })
   const { questions } = quiz
   return (
      <div>
         <h1>Quiz</h1>
         <h2>{questions[activeQuestion].question}</h2>
      </div>
   )
}