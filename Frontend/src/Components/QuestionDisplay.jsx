// import { useState } from 'react';

// function QuestionDisplay({ questions, currentIndex, userAnswers, onAnswer }) {
//   const [currentAnswer, setCurrentAnswer] = useState('');
//   const [showExpected, setShowExpected] = useState(false);
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onAnswer(currentAnswer);
//     setCurrentAnswer('');
//     setShowExpected(false);
//   };
  
//   const currentQuestion = questions[currentIndex];
//   const isLastQuestion = currentIndex === questions.length - 1;
//   const answeredCount = Object.keys(userAnswers).length;
  
//   return (
//     <div className="w-full max-w-2xl mx-auto">
//       <div className="mb-6">
//         <div className="flex justify-between items-center mb-2">
//           <h2 className="text-xl font-bold">Interview Questions</h2>
//           <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
//             {currentIndex + 1} / {questions.length}
//           </span>
//         </div>
//         <div className="w-full bg-gray-200 rounded-full h-2.5">
//           <div 
//             className="bg-blue-600 h-2.5 rounded-full" 
//             style={{ width: `${(currentIndex / questions.length) * 100}%` }}
//           ></div>
//         </div>
//       </div>
      
//       <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
//         <h3 className="text-lg font-medium text-gray-900 mb-4">
//           {currentQuestion.question}
//         </h3>
        
//         <form onSubmit={handleSubmit}>
//           <textarea
//             value={currentAnswer}
//             onChange={(e) => setCurrentAnswer(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             rows="4"
//             placeholder="Type your answer here..."
//             required
//           ></textarea>
          
//           <div className="flex justify-between mt-4">
//             <button
//               type="button"
//               onClick={() => setShowExpected(!showExpected)}
//               className="text-blue-600 hover:text-blue-800"
//             >
//               {showExpected ? 'Hide Expected Answer' : 'View Expected Answer'}
//             </button>
            
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
//             >
//               {isLastQuestion ? 'Finish' : 'Next Question'}
//             </button>
//           </div>
//         </form>
        
//         {showExpected && (
//           <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded">
//             <p className="text-sm font-medium text-gray-500 mb-1">Expected Answer:</p>
//             <p className="text-sm text-gray-800">{currentQuestion.expectedAnswer}</p>
//           </div>
//         )}
//       </div>
      
//       {answeredCount > 0 && (
//         <div className="bg-white shadow rounded-lg p-4">
//           <h3 className="font-medium text-gray-900 mb-3">Previous Answers</h3>
//           {Object.keys(userAnswers).map((index) => {
//             const q = questions[index];
//             if (!q) return null;
//             return (
//               <div key={index} className="mb-3 pb-3 border-b border-gray-100 last:border-0">
//                 <p className="text-sm font-medium">{q.question}</p>
//                 <p className="text-sm text-gray-600 mt-1">{userAnswers[index]}</p>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// export default QuestionDisplay;




// import { useState } from 'react';

// function QuestionDisplay({ questions, currentIndex, userAnswers, onAnswer }) {
//   const [currentAnswer, setCurrentAnswer] = useState('');
//   const [showExpected, setShowExpected] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onAnswer(currentAnswer);
//     setCurrentAnswer('');
//     setShowExpected(false);
//   };

//   const currentQuestion = questions[currentIndex];
//   const isLastQuestion = currentIndex === questions.length - 1;
//   const answeredCount = Object.keys(userAnswers).length;

//   return (
//     <div className="w-full max-w-2xl mx-auto">
//       <div className="mb-6">
//         <div className="flex justify-between items-center mb-2">
//           <h2 className="text-xl font-bold">Interview Questions</h2>
//           <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
//             {currentIndex + 1} / {questions.length}
//           </span>
//         </div>
//         <div className="w-full bg-gray-200 rounded-full h-2.5">
//           <div
//             className="bg-blue-600 h-2.5 rounded-full"
//             style={{ width: `${(currentIndex / questions.length) * 100}%` }}
//           ></div>
//         </div>
//       </div>

//       <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
//         <h3 className="text-lg font-medium text-gray-900 mb-4">
//           {currentQuestion.question}
//         </h3>

//         <form onSubmit={handleSubmit}>
//           <div className="space-y-2">
//             {Object.entries(currentQuestion.options).map(([key, optionText]) => (
//               <label key={key} className="flex items-center">
//                 <input
//                   type="radio"
//                   className="form-radio h-5 w-5 text-blue-600"
//                   value={key}
//                   checked={currentAnswer === key}
//                   onChange={() => setCurrentAnswer(key)}
//                   required
//                 />
//                 <span className="ml-2 text-gray-700">{optionText}</span>
//               </label>
//             ))}
//           </div>

//           <div className="flex justify-between mt-4">
//             <button
//               type="button"
//               onClick={() => setShowExpected(!showExpected)}
//               className="text-blue-600 hover:text-blue-800"
//               disabled={!currentQuestion.correctAnswer} // Disable if no correctAnswer
//             >
//               {showExpected ? 'Hide Correct Answer' : 'View Correct Answer'}
//             </button>

//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
//             >
//               {isLastQuestion ? 'Finish' : 'Next Question'}
//             </button>
//           </div>
//         </form>

//         {showExpected && currentQuestion.correctAnswer && ( // Only show if correctAnswer exists
//           <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded">
//             <p className="text-sm font-medium text-gray-500 mb-1">Correct Answer:</p>
//             <p className="text-sm text-gray-800">
//               {currentQuestion.correctAnswer}: {currentQuestion.options[currentQuestion.correctAnswer]}
//             </p>
//           </div>
//         )}
//       </div>

//       {answeredCount > 0 && (
//         <div className="bg-white shadow rounded-lg p-4">
//           <h3 className="font-medium text-gray-900 mb-3">Previous Answers</h3>
//           {Object.keys(userAnswers).map((index) => {
//             const q = questions[index];
//             if (!q) return null;
//             return (
//               <div key={index} className="mb-3 pb-3 border-b border-gray-100 last:border-0">
//                 <p className="text-sm font-medium">{q.question}</p>
//                 <p className="text-sm text-gray-600 mt-1">
//                   You answered: {userAnswers[index]} - {q.options[userAnswers[index]]}
//                 </p>
//                  {q.correctAnswer && (
//                 <p className="text-xs text-green-600 mt-1">
//                   Correct Answer was: {q.correctAnswer} - {q.options[q.correctAnswer]}
//                 </p>
//                   )}
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// export default QuestionDisplay;


// import { useState } from 'react';

// function QuestionDisplay({ questions, currentIndex, userAnswers, onAnswer }) {
//   const [currentAnswer, setCurrentAnswer] = useState('');
//   const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onAnswer(currentAnswer);
//     setShowCorrectAnswer(true); // Show the answer after submission
//   };

//   const currentQuestion = questions[currentIndex];
//   const isLastQuestion = currentIndex === questions.length - 1;
//   const answeredCount = Object.keys(userAnswers).length;
//   const hasUserAnswered = userAnswers[currentIndex] !== undefined;

//   return (
//     <div className="w-full max-w-2xl mx-auto">
//       <div className="mb-6">
//         <div className="flex justify-between items-center mb-2">
//           <h2 className="text-xl font-bold">Interview Questions</h2>
//           <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
//             {currentIndex + 1} / {questions.length}
//           </span>
//         </div>
//         <div className="w-full bg-gray-200 rounded-full h-2.5">
//           <div
//             className="bg-blue-600 h-2.5 rounded-full"
//             style={{ width: `${(currentIndex / questions.length) * 100}%` }}
//           ></div>
//         </div>
//       </div>

//       <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
//         <h3 className="text-lg font-medium text-gray-900 mb-4">
//           {currentQuestion.question}
//         </h3>

//         <form onSubmit={handleSubmit}>
//           <div className="space-y-2">
//             {Object.entries(currentQuestion.options).map(([key, optionText]) => (
//               <label key={key} className="flex items-center">
//                 <input
//                   type="radio"
//                   className="form-radio h-5 w-5 text-blue-600"
//                   value={key}
//                   checked={currentAnswer === key}
//                   onChange={() => setCurrentAnswer(key)}
//                   required
//                   disabled={hasUserAnswered} // Disable options after answering
//                 />
//                 <span className="ml-2 text-gray-700">{optionText}</span>
//               </label>
//             ))}
//           </div>

//           <div className="flex justify-between mt-4">
//              {!hasUserAnswered && (
//               <button
//                   type="submit"
//                   className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
//               >
//                   {isLastQuestion ? 'Finish' : 'Next Question'}
//               </button>
//              )}

//              {hasUserAnswered && (
//                  <button
//                   type="button"
//                   onClick={() => {
//                       setShowCorrectAnswer(!showCorrectAnswer);
//                   }}
//                   className="text-blue-600 hover:text-blue-800"
//                   >
//                   {showCorrectAnswer ? 'Hide Correct Answer' : 'View Correct Answer'}
//                 </button>
//              )}
//           </div>
//         </form>

//         {showCorrectAnswer && hasUserAnswered && currentQuestion.correctAnswer && (
//           <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded">
//             <p className="text-sm font-medium text-gray-500 mb-1">Correct Answer:</p>
//             <p className="text-sm text-gray-800">
//               {currentQuestion.correctAnswer}: {currentQuestion.options[currentQuestion.correctAnswer]}
//             </p>
//           </div>
//         )}
//       </div>

//       {answeredCount > 0 && (
//         <div className="bg-white shadow rounded-lg p-4">
//           <h3 className="font-medium text-gray-900 mb-3">Previous Answers</h3>
//           {Object.keys(userAnswers).map((index) => {
//             const q = questions[index];
//             if (!q) return null;
//             return (
//               <div key={index} className="mb-3 pb-3 border-b border-gray-100 last:border-0">
//                 <p className="text-sm font-medium">{q.question}</p>
//                 <p className="text-sm text-gray-600 mt-1">
//                   You answered: {userAnswers[index]} - {q.options[userAnswers[index]]}
//                 </p>
//                 {q.correctAnswer && (
//                   <p className="text-xs text-green-600 mt-1">
//                     Correct Answer was: {q.correctAnswer} - {q.options[q.correctAnswer]}
//                   </p>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// export default QuestionDisplay;



import { useState } from 'react';

function QuestionDisplay({ questions, currentIndex, userAnswers, onAnswer }) {
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAnswer(currentAnswer);
    setShowCorrectAnswer(true); // Show the answer after submission
  };

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const answeredCount = Object.keys(userAnswers).length;
  const hasUserAnswered = userAnswers[currentIndex] !== undefined;

  return (
    <div className="w-full h-full max-w-3xl mx-auto p-4 bg-gradient-to-br from-indigo-100 to-purple-50 rounded-3xl shadow-lg"> {/* Aesthetic Background */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-bold text-blue-700">Interview Questions</h2> {/* Reduced heading size */}
          <span className="bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1 rounded-full">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2"> {/* Reduced height */}
          <div
            className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full"
            style={{ width: `${(currentIndex / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-xl p-6 mb-6"> {/* Reduced shadow and rounded corners */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{currentQuestion.question}</h3> {/* Reduced font size */}

        <form onSubmit={handleSubmit}>
          <div className="space-y-3"> {/* Reduced spacing between options */}
            {Object.entries(currentQuestion.options).map(([key, optionText]) => (
              <label key={key} className="flex items-center rounded-lg border p-3 hover:shadow-sm transition-shadow duration-200 cursor-pointer"> {/* Reduced padding and shadow */}
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-blue-500 focus:ring-blue-400"
                  value={key}
                  checked={currentAnswer === key}
                  onChange={() => setCurrentAnswer(key)}
                  required
                  disabled={hasUserAnswered} // Disable options after answering
                />
                <span className="ml-2 text-md text-gray-700">{optionText}</span> {/* Reduced font size */}
              </label>
            ))}
          </div>

          <div className="flex justify-between mt-6"> {/* Reduced margin */}
            {!hasUserAnswered && (
              <button
                type="submit"
                className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-xs transition-colors duration-200" //{/* Reduced padding and shadow */}
              >
                {isLastQuestion ? 'Finish' : 'Next Question'}
              </button>
            )}

            {hasUserAnswered && (
              <button
                type="button"
                onClick={() => {
                  setShowCorrectAnswer(!showCorrectAnswer);
                }}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {showCorrectAnswer ? 'Hide Correct Answer' : 'View Correct Answer'}
              </button>
            )}
          </div>
        </form>

        {showCorrectAnswer && hasUserAnswered && currentQuestion.correctAnswer && (
          <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-lg"> {/* Reduced padding */}
            <p className="text-sm font-medium text-green-700 mb-1">Correct Answer:</p>
            <p className="text-md text-green-800 font-semibold">
              {currentQuestion.correctAnswer}: {currentQuestion.options[currentQuestion.correctAnswer]}
            </p>
          </div>
        )}
      </div>

      {answeredCount > 0 && (
        <div className="bg-white shadow-md rounded-xl p-4"> {/* Reduced shadow */}
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Previous Answers</h3> {/* Reduced font size */}
          {Object.keys(userAnswers).map((index) => {
            const q = questions[index];
            if (!q) return null;
            return (
              <div key={index} className="mb-4 pb-3 border-b border-gray-200 last:border-0"> {/* Reduced margin */}
                <p className="text-md font-medium text-gray-700">{q.question}</p> {/* Reduced font size */}
                <p className="text-gray-600 mt-1">
                  You answered: {userAnswers[index]} - {q.options[userAnswers[index]]}
                </p>
                {q.correctAnswer && (
                  <p className="text-sm text-green-600 mt-1">
                    Correct Answer was: {q.correctAnswer} - {q.options[q.correctAnswer]}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default QuestionDisplay;


