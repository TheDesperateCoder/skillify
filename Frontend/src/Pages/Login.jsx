import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useCookies } from 'react-cookie';

const Login = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
//   const [cookies, setCookie] = useCookies(['token']);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/v1/auth/login", { email, password });
//    console.log(response?.data?.token)
      if (response.data.success) {
        setMessage('Login successful!');
        setIsError(false);
        window.location.reload(); 
        // Store the token in a cookie or local storage
        // Example using cookies:
        // setCookie('token', response.data.token, { path: '/', maxAge: 604800 });
      } else {
        setMessage(response.data.message || 'Login failed.');
        setIsError(true);
      }

      localStorage.setItem("user", JSON.stringify(response?.data))
    } catch (error) {
      setMessage('Login error: ' + (error.response?.data?.message || error.message));
      setIsError(true);
      console.error('Login error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Login</h2>
      {message && (
        <p className={`text-center mt-2 ${isError ? 'text-red-500' : 'text-green-500'}`}>{message}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log In
          </button>
          
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
           onClick={()=>navigate("/signup")}
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;