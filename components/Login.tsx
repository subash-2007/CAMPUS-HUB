
import React, { useState } from 'react';
import { User } from '../types';

interface LoginComponentProps {
  onLogin: (user: User) => void;
  mockUsers: User[];
}

const LoginComponent: React.FC<LoginComponentProps> = ({ onLogin, mockUsers }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = mockUsers.find(u => u.email === email && u.passwordHash === password);
    if (user) {
      onLogin(user);
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-campus-blue-dark">Campus Engagement Hub</h1>
          <p className="mt-2 text-gray-600">Please sign in to continue</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-t-md focus:outline-none focus:ring-campus-blue focus:border-campus-blue focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-b-md focus:outline-none focus:ring-campus-blue focus:border-campus-blue focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md group bg-campus-blue hover:bg-campus-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-campus-blue-light"
            >
              Sign in
            </button>
          </div>
        </form>
         <div className="text-xs text-center text-gray-500">
            <p className="font-semibold">Demo Accounts:</p>
            <p>Student: student1@campus.edu / stu123</p>
            <p>Admin: admin@campus.edu / admin123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
