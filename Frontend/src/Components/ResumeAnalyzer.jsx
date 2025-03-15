// function ResumeAnalyzer({ resume, resumeText, onAnalyze, isAnalyzing ,error }) {
//     return (
//         <>
//         {error && <div className="text-red-500 mt-2">{error}</div>}
//       <div className="flex flex-col items-center justify-center w-full">
//         <div className="bg-gray-100 p-6 rounded-lg w-full max-w-xl mb-6">
//           <h2 className="text-xl font-semibold mb-4">Uploaded Resume</h2>
//           <div className="flex items-center mb-4">
//             <svg className="w-8 h-8 text-gray-700 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
//             </svg>
//             <div>
//               <p className="font-medium">{resume.name}</p>
//               <p className="text-sm text-gray-500">{Math.round(resume.size / 1024)} KB</p>
//             </div>
//           </div>
          
//           <div className="bg-white border border-gray-200 rounded p-3 max-h-60 overflow-auto mb-4">
//             <pre className="text-xs whitespace-pre-wrap">{resumeText}</pre>
//           </div>
//         </div>
        
//         <button
//           onClick={onAnalyze}
//           disabled={isAnalyzing}
//           className={`flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg w-full max-w-xl
//             ${isAnalyzing ? "opacity-75 cursor-not-allowed" : ""}`}
//         >
//           {isAnalyzing ? (
//             <>
//               <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//               </svg>
//               Analyzing...
//             </>
//           ) : (
//             <>
//               Generate Questions with AI
//             </>
//           )}
//         </button>
//       </div>
//       </>
//     );
//   }
  
//   export default ResumeAnalyzer;



import React from 'react';
// Import image
import backgroundImage from '../assets/resume-background.jpg'; // Ensure the path is correct
import documentIcon from '../assets/document-icon.svg'; // Ensure the path is correct

function ResumeAnalyzer({ resume, resumeText, onAnalyze, isAnalyzing, error }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center blur-sm" style={{ backgroundImage: `url(${backgroundImage})` }}></div>

      {/* Overlay for Contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 to-blue-900/70"></div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full p-8 rounded-lg text-white max-w-xl">
        {error && <div className="text-red-400 mt-2">{error}</div>}

        <div className="bg-gray-800 bg-opacity-50 rounded-lg w-full mb-6 p-6 shadow-md backdrop-blur-sm border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-100">Uploaded Resume</h2>

          <div className="flex items-center mb-4">
            <img src={documentIcon} alt="Document Icon" className="w-8 h-8 mr-3 text-gray-400" />
            <div>
              <p className="font-medium text-white">{resume.name}</p>
              <p className="text-sm text-gray-300">{Math.round(resume.size / 1024)} KB</p>
            </div>
          </div>

          <div className="bg-gray-700 border border-gray-600 rounded p-3 max-h-60 overflow-auto mb-4">
            <pre className="text-xs whitespace-pre-wrap text-gray-200">{resumeText}</pre>
          </div>
        </div>

        <button
          onClick={onAnalyze}
          disabled={isAnalyzing}
          className={`flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full w-full transition-colors duration-300 shadow-md
            ${isAnalyzing ? "opacity-75 cursor-not-allowed" : ""}`}
        >
          {isAnalyzing ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            <>
              Generate Questions with AI
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default ResumeAnalyzer;