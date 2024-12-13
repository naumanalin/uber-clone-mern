import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('password');
  const [userInfo, setUserInfo] = useState({})

  const submitHandler = async (e) => {
    e.preventDefault();
    setUserInfo({
      email: email,
      password: password,
    });
    console.log(`hello-::- ${userInfo}`)

    setEmail('')
    setPassword('')
  }

  return (
    <div className="p-7 container mx-auto">
      <div className="lg:w-1/2 mx-auto">
        <form onSubmit={(e)=>submitHandler(e)}>
          <img
            className="w-16 mb-10"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
            alt=""
          />
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            required
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            type={type}
            placeholder="password"
            className="bg-[#eeeeee] mb-2 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
          />
          <div className="mb-7">
            <input
              type="checkbox"
              id="checkbox"
              onChange={(e) =>
                setType(e.target.checked ? 'text' : 'password')
              }
            />
            <label htmlFor="checkbox" className="ml-2">
              Show password
            </label>
          </div>
          <button
            className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
          >
            Login
          </button>
        </form>
        <p className="text-left">
          New here?{' '}
          <Link to="/signup" className="text-blue-600">
            Create new Account
          </Link>
        </p>

        <div>
          <Link
            to="/captain-login"
            className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
          >
            Sign in as Captain
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
