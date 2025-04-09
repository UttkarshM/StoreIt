import React from 'react';
import AuthForm from '@/app/components/AuthForm';
const SignInPage = () => <AuthForm type="sign-in" />;

export default SignInPage;

// import { login, signup } from '../actions';

// export default function LoginPage() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <form className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm space-y-4">
//         <h2 className="text-2xl font-semibold text-gray-800 text-center">
//           Welcome
//         </h2>

//         <div className="flex flex-col">
//           <label htmlFor="email" className="mb-1 text-sm text-gray-600">
//             Email
//           </label>
//           <input
//             id="email"
//             name="email"
//             type="email"
//             required
//             className="px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="flex flex-col">
//           <label htmlFor="password" className="mb-1 text-sm text-gray-600">
//             Password
//           </label>
//           <input
//             id="password"
//             name="password"
//             type="password"
//             required
//             className="px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div className="flex gap-3">
//           <button
//             formAction={login}
//             className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-150"
//           >
//             Log in
//           </button>
//           <button
//             formAction={signup}
//             className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition duration-150"
//           >
//             Sign up
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
