import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import React, { useState } from "react";
import ResumeUploader from '../Components/ResumeUploader';
import ResumeAnalyzer from '../Components/ResumeAnalyzer';
import QuestionDisplay from '../Components/QuestionDisplay';
import ResultsDisplay from '../Components/ResultDisplay';
import Footer from '../Components/footer';



function Main() {
  const [resume, setResume] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState([]); // New state for completed questions

  const handleResumeUpload = (file, text) => {
    setResume(file);
    setResumeText(text);
    setSkills([]);
    setProjects([]);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setError(null);
    setShowResults(false);
    setCompletedQuestions([]); // Clear completed questions on new resume
  };

  const generateQuestions = async (resumeText) => {
    setIsAnalyzing(true);
    setError(null);

    // Log environment variable (will be visible in browser console)
    const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
    console.log("Gemini API key available:", !!geminiKey);

    if (!geminiKey) {
      setError("Gemini API key is missing. Please check your environment variables.");
      setIsAnalyzing(false);
      return;
    }

    try {
      console.log("Analyzing resume and generating multiple choice questions...");

      // Construct the API URL with your API key
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`;

      const promptText = `Analyze the following resume text. Extract the skills and projects mentioned.

                     Generate 15 technical interview questions based on the candidate's skills and project experience as presented in the resume.  Focus on questions that assess the candidate's understanding and practical application of the technologies and concepts listed.  Avoid subjective or opinion-based questions.

                     Each question MUST be multiple choice with exactly 4 options labeled A, B, C, and D. Only ONE option should be the correct answer, and it should be a definitively correct choice based on established technical knowledge.

                     The response MUST be valid JSON with a single top-level object containing "skills", "projects", and "questions" keys.  The "questions" array must contain 15 question objects.

                     Here is an example of valid JSON response:
                     \`\`\`json
                     {
                       "skills": ["skill1", "skill2", ...],
                       "projects": ["project1", "project2", ...],
                       "questions": [
                         {
                           "question": "Question text here?",
                           "options": {
                             "A": "First option",
                             "B": "Second option",
                             "C": "Third option",
                             "D": "Fourth option"
                           },
                           "correctAnswer": "A"
                         },
                         {
                           "question": "Another question?",
                           "options": {
                             "A": "First option for second question",
                             "B": "Second option for second question",
                             "C": "Third option for second question",
                             "D": "Fourth option for second question"
                           },
                           "correctAnswer": "C"
                         },
                        {
                           "question": "Third question?",
                           "options": {
                             "A": "First option for third question",
                             "B": "Second option for third question",
                             "C": "Third option for third question",
                             "D": "Fourth option for third question"
                           },
                           "correctAnswer": "B"
                         }
                        ,{
                           "question": "4th question?",
                           "options": {
                             "A": "First option for 4th question",
                             "B": "Second option for 4th question",
                             "C": "Third option for 4th question",
                             "D": "Fourth option for 4th question"
                           },
                           "correctAnswer": "A"
                         }
                        ,{
                           "question": "5th question?",
                           "options": {
                             "A": "First option for 5th question",
                             "B": "Second option for 5th question",
                             "C": "Third option for 5th question",
                             "D": "Fourth option for 5th question"
                           },
                           "correctAnswer": "C"
                         }

                       ]
                     }
                     \`\`\`

                     Return ONLY the JSON.

                     Resume:
                     ${resumeText}`;



      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: promptText
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 3000,
            topP: 0.95,
            topK: 30
          }
        })
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      console.log("API response:", data);

      try {
        // Extract the content from Gemini's response structure
        const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!content) {
          throw new Error("No content in Gemini response");
        }

        console.log("Raw content:", content);

        // Try to find JSON in the response (sometimes the model includes explanation text)
        const jsonRegex = /```json\s*([\s\S]*?)\s*```|(\{[\s\S]*\})/;
        const jsonMatch = content.match(jsonRegex);

        if (!jsonMatch) {
          throw new Error("No JSON found in response");
        }

        // Use the matched JSON content (either from code block or direct JSON)
        const jsonText = jsonMatch[1] || jsonMatch[2];
        console.log("Extracted JSON:", jsonText);

        // Parse the JSON content
        let parsedData = null; // added to avoid the scope error with the finally block.
        try {
            parsedData = JSON.parse(jsonText);
            console.log("Parsed data:", parsedData?.questions
            );
        } catch (jsonParseError) {
            console.error("Failed to parse JSON:", jsonParseError);
            throw new Error(`Failed to parse JSON: ${jsonParseError.message}`);
        }

        // Validate and format the data
        let formattedData = {
          skills: Array.isArray(parsedData.skills) ? parsedData.skills : [],
          projects: Array.isArray(parsedData.projects) ? parsedData.projects : [],
          questions: []
        };

        // Handle questions
        if (Array.isArray(parsedData.questions)) {
          formattedData.questions = parsedData.questions.map(q => {
            // Ensure the question has required properties
            return {
              question: q.question || q.text || "Question text unavailable",
              options: q.options || q.choices || {
                A: "Option A unavailable",
                B: "Option B unavailable",
                C: "Option C unavailable",
                D: "Option D unavailable"
              },
              correctAnswer: q.correctAnswer || q.answer || q.correct || "A"
            };
          });
        } else {
          throw new Error("No questions array found in response");
        }

        // Ensure we have the correct number of questions
        if (formattedData.questions.length !== 15) {
           console.warn(`Expected 15 questions, but got ${formattedData.questions.length}.  Adjusting or using fallback.`);
           // You might want to truncate or pad the questions array here to ensure it has 15 elements
           // Or, fall back to a set of default questions
           setError(`Expected 15 questions, but got ${formattedData.questions.length}.  Using fallback questions.`);
          throw new Error("Incorrect question array length")
        }


        if (formattedData.questions.length === 0) {
          throw new Error("No questions returned from the model after parsing and formatting");
        }

        // Update state with the formatted data
        setSkills(formattedData.skills);
        setProjects(formattedData.projects);
        setQuestions(formattedData.questions);

      } catch (parseError) {
        console.error("Failed to parse Gemini response:", parseError);
        console.error("Original response:", data);
        setError(`Failed to parse the model's response: ${parseError.message}. Using fallback questions.`);

        // Fallback: provide default multiple choice questions
        setQuestions([
          {
            question: "Which of the following is a best practice for code maintainability?",
            options: {
              A: "Using single-letter variable names",
              B: "Writing comprehensive documentation",
              C: "Avoiding comments in code",
              D: "Keeping all code in a single file"
            },
            correctAnswer: "B"
          },
          {
            question: "What is the primary purpose of version control systems?",
            options: {
              A: "To make code run faster",
              B: "To automatically fix bugs",
              C: "To track changes and facilitate collaboration",
              D: "To encrypt source code"
            },
            correctAnswer: "C"
          },
          {
            question: "Which of these is NOT typically a part of the software development lifecycle?",
            options: {
              A: "Requirements analysis",
              B: "Design",
              C: "Marketing",
              D: "Testing"
            },
            correctAnswer: "C"
          },
          {
            question: "What is a key advantage of using a framework?",
            options: {
              A: "It makes code run slower but more reliably",
              B: "It reduces the need for documentation",
              C: "It provides proven, reusable components",
              D: "It ensures backward compatibility with all systems"
            },
            correctAnswer: "C"
          },
          {
            question: "Which approach is best for debugging complex issues?",
            options: {
              A: "Always start by rewriting the entire codebase",
              B: "Use logging and step-by-step verification",
              C: "Immediately ask colleagues without investigating",
              D: "Random code modifications until it works"
            },
            correctAnswer: "B"
          }
        ]);
      }
    }
    catch (apiError) {
      console.error("Full error:", apiError);
      setError(`API Error: ${apiError.message}`);
      // Sample multiple choice questions for demo
      setQuestions([
        {
          question: "Which of the following is a best practice for code maintainability?",
          options: {
            A: "Using single-letter variable names",
            B: "Writing comprehensive documentation",
            C: "Avoiding comments in code",
            D: "Keeping all code in a single file"
          },
          correctAnswer: "B"
        },
        {
          question: "What is the primary purpose of version control systems?",
          options: {
            A: "To make code run faster",
            B: "To automatically fix bugs",
            C: "To track changes and facilitate collaboration",
            D: "To encrypt source code"
          },
          correctAnswer: "C"
        },
        {
          question: "Which of these is NOT typically a part of the software development lifecycle?",
          options: {
            A: "Requirements analysis",
            B: "Design",
            C: "Marketing",
            D: "Testing"
          },
          correctAnswer: "C"
        },
        {
          question: "What is a key advantage of using a framework?",
          options: {
            A: "It makes code run slower but more reliably",
            B: "It reduces the need for documentation",
            C: "It provides proven, reusable components",
            D: "It ensures backward compatibility with all systems"
          },
          correctAnswer: "C"
        },
        {
          question: "Which approach is best for debugging complex issues?",
          options: {
            A: "Always start by rewriting the entire codebase",
            B: "Use logging and step-by-step verification",
            C: "Immediately ask colleagues without investigating",
            D: "Random code modifications until it works"
          },
          correctAnswer: "B"
        }
      ]);
    }
    finally {
      setIsAnalyzing(false);
    }
  };

 const handleAnswer = (answer) => {
  const currentQuestion = questions[currentQuestionIndex];
  if (currentQuestion) {
    setCompletedQuestions((prevCompleted) => [
      ...prevCompleted,
      {
        ...currentQuestion,
        userAnswer: answer,
      },
    ]);
  }
  setUserAnswers({
    ...userAnswers,
    [currentQuestionIndex]: answer,
  });

  if (currentQuestionIndex === questions.length -1) {
    setShowResults(true);
    // After showing results, log the combined data
    console.log("Combined Question and Answer Data:", completedQuestions);
  } else {
    setCurrentQuestionIndex(currentQuestionIndex +1);
  }
};


const handleNext = () => {
  if (userAnswers[currentQuestionIndex] === undefined) {
      alert("Please answer the current question before proceeding.");
      return;
  }

   // Removed for the check for showing results
  if (currentQuestionIndex < questions.length - 1) {
       setCurrentQuestionIndex(currentQuestionIndex + 1);
   }
};



  return (
    <>
    <div className='w-full h-[624px] bg-[#64b4a2cb]'>
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-serif font-extrabold text-center mb-10 mt-10">Skillify - AI Powered skill Analyzer</h1>

      {!resume && (
        <ResumeUploader onUpload={handleResumeUpload} />
      )}

      {resume && questions.length === 0 && (
        <ResumeAnalyzer
          resume={resume}
          resumeText={resumeText}
          onAnalyze={generateQuestions}
          isAnalyzing={isAnalyzing}
          error={error}
        />
      )}

      {questions.length > 0 && !showResults && (  //added !show results
        <QuestionDisplay
          questions={questions}
          currentIndex={currentQuestionIndex}
          userAnswers={userAnswers}
          onAnswer={handleAnswer}
        />
      )}

     {showResults && ( // Render ResultsDisplay when showResults is true
        <ResultsDisplay questions={questions} userAnswers={userAnswers} />
      )}
    </div>
    <Footer></Footer>
    </div>
    </>
  );
}

export default Main;    