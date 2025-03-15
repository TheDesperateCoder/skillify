import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState('Candidate');
  const [contactNumber, setContactNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate()

  const handleSendOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/auth/sendotp", { email });

      if (response.data.success) {
        setMessage('OTP sent successfully! Check your email.');
        setIsError(false);
        setOtpSent(true);
      } else {
        setMessage(response.data.message || 'Failed to send OTP.');
        setIsError(true);
      }
    } catch (error) {
      setMessage('Error sending OTP: ' + (error.response?.data?.message || error.message));
      setIsError(true);
      console.error('Error sending OTP:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setIsError(true);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/v1/auth/signup", {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        contactNumber,
        otp,
      });

      if (response.data.success) {
        setMessage('Signup successful!');
        setIsError(false);
        navigate("/login")
        // Optionally, redirect the user to the login page or a success page
      } else {
        setMessage(response.data.message || 'Signup failed.');
        setIsError(true);
      }
    } catch (error) {
      setMessage('Signup error: ' + (error.response?.data?.message || error.message));
      setIsError(true);
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Signup</h2>
      {message && (
        <p className={`text-center mt-2 ${isError ? 'text-red-500' : 'text-green-500'}`}>{message}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
            First Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="firstName"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
            Last Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lastName"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
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
          {!otpSent && (
            <button
              type="button"
              onClick={handleSendOtp}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
            >
              Send OTP
            </button>
          )}
        </div>
        {otpSent && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
              OTP
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="otp"
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        )}
        <div className="mb-4">
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
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="accountType">
            Account Type
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="accountType"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
          >
            <option value="Candidate">Candidate</option>
            <option value="Recruiter">Recruiter</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactNumber">
            Contact Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="contactNumber"
            type="text"
            placeholder="Contact Number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;