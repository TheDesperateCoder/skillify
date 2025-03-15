// import { useState } from 'react';

// function ResumeUploader({ onUpload }) {
//   const [dragActive, setDragActive] = useState(false);
  
//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };
  
//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
    
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       onUpload(e.dataTransfer.files[0]);
//     }
//   };
  
//   const handleChange = (e) => {
//     e.preventDefault();
//     if (e.target.files && e.target.files[0]) {
//       onUpload(e.target.files[0]);
//     }
//   };
  
//   return (
//     <div className="flex flex-col items-center justify-center w-full">
//       <div 
//         className={`border-2 border-dashed rounded-lg p-10 w-full max-w-xl text-center cursor-pointer
//           ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
//         onDragEnter={handleDrag}
//         onDragLeave={handleDrag}
//         onDragOver={handleDrag}
//         onDrop={handleDrop}
//       >
//         <div className="flex flex-col items-center justify-center">
//           <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
//           </svg>
//           <p className="mb-2 text-sm text-gray-500">
//             <span className="font-semibold">Upload your resume</span>
//           </p>
//           <p className="text-xs text-gray-500">PDF, DOC, DOCX (MAX. 5MB)</p>
//         </div>
//         <input 
//           type="file" 
//           id="resume-upload" 
//           className="hidden" 
//           accept=".pdf,.doc,.docx" 
//           onChange={handleChange}
//         />
//       </div>
//       <label htmlFor="resume-upload" className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer">
//         Choose Resume File
//       </label>
//     </div>
//   );
// }

// export default ResumeUploader;




import React, { useState } from 'react';

// Replace with your actual image import
import backgroundImage from "../assets/resume-background.jpg"; // Correct path// Ensure the path is correct
// Consider importing a vector graphic for better scalability
import uploadIcon from '../assets/upload-icon.svg'; // Ensure the path is correct

function ResumeUploader({ onUpload }) {
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
             if (file.size > 5 * 1024 * 1024) {
                alert("File size exceeds 5MB limit.");
                return;
            }
            await onUpload(file);
        }
    };

    const handleChange = async (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
             if (file.size > 5 * 1024 * 1024) {
                alert("File size exceeds 5MB limit.");
                return;
            }
            await onUpload(file);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-cyan-500 relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center blur-sm" style={{ backgroundImage: `url(${backgroundImage})` }}></div>

            {/* Overlay for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 to-blue-900/70"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center p-8 rounded-lg w-full max-w-xl text-white">
                <div
                    className={`border-2 border-dashed rounded-lg p-8 w-full text-center cursor-pointer transition-colors duration-300
                        ${dragActive ? "border-blue-300 bg-blue-100/20 backdrop-blur-sm" : "border-gray-500/50 hover:border-blue-300/50 backdrop-blur-sm"}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <div className="flex flex-col items-center justify-center">
                         <img src={uploadIcon} alt="Upload Icon" className="w-12 h-12 mb-4 text-blue-300" />
                        <p className="mb-2 text-lg font-semibold">
                            <span className="">Drag & Drop your resume here</span>
                        </p>
                        <p className="text-sm text-gray-300">or</p>
                        <p className="text-sm text-gray-300">Browse files from your computer</p>
                        <p className="text-xs text-gray-400 mt-2">PDF, DOC, DOCX (Max. 5MB)</p>
                    </div>
                    <input
                        type="file"
                        id="resume-upload"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={handleChange}
                    />
                </div>
                <label htmlFor="resume-upload" className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-md transition-colors duration-300 cursor-pointer">
                    Choose Resume File
                </label>
            </div>
        </div>
    );
}

export default ResumeUploader;