import React, { useEffect } from 'react'
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

const Body = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArr, setPasswordArr] = useState([])
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    // get passwords from localStorage when the component mounts
    // and set it to passwordArr state
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArr(JSON.parse(passwords));
    }
  }, []);


  const savePassword = () => {
  let updatedPasswords = [...passwordArr];

  if (editingIndex !== null) {
    // Remove old entry before saving the updated one
    updatedPasswords.splice(editingIndex, 1);
  }

  // Add new/updated form entry
  updatedPasswords.push(form);

  // Update state and localStorage
  setPasswordArr(updatedPasswords);
  localStorage.setItem("passwords", JSON.stringify(updatedPasswords));

  // Reset form and editing state
  setform({ site: "", username: "", password: "" });
  setEditingIndex(null);
};



  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  // Helper to copy text to clipboard
  const handleCopy = (password) => {
    navigator.clipboard.writeText(password);
    toast.success('Password copied!!!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  // Helper to delete a password
  const handleDelete = (index) => {
    const updatedPasswords = passwordArr.filter((_, i) => i !== index);
    setPasswordArr(updatedPasswords);
    localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    toast('Deleted Sucessfully!!!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="w-[95vw] max-w-2xl md:w-[75vw] min-h-[70vh] md:h-[90vh] bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-2xl flex flex-col border border-gray-700">

          <div className="container py-6">
            <h1 className="text-4xl text-center font-extrabold mb-2 text-blue-400 drop-shadow-lg">Password Manager</h1>
            <p className="text-center text-gray-300 text-lg">Store your passwords securely and access them easily.</p>
          </div>

          <div className="container mx-auto w-full px-2 md:px-0 flex flex-col justify-center">
            <div className="text-white flex flex-col gap-5 p-6 bg-gray-700/60 rounded-xl shadow-inner">
              <input
                value={form.site}
                onChange={handleChange}
                type="text"
                className="rounded-lg p-3 w-full bg-gray-800 text-gray-100 placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition"
                placeholder="Enter the Website Name"
                name="site"
              />
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  value={form.username}
                  onChange={handleChange}
                  type="text"
                  className="rounded-lg p-3 flex-1 bg-gray-800 text-gray-100 placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="Username"
                  name="username"
                />
                <div className="relative flex-1">
                  <input
                    value={form.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    className="rounded-lg p-3 w-full bg-gray-800 text-gray-100 placeholder-gray-400 pr-12 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    placeholder="Password"
                    name="password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-400 transition"
                    onClick={() => setShowPassword((p) => !p)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-3.95M6.873 6.876A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.973 9.973 0 01-4.293 5.032M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                      </svg>
                    )}
                  </button>
                </div>
                <button
                  onClick={savePassword}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold flex flex-row items-center py-3 px-6 rounded-lg shadow transition-all duration-200"
                  type="button"
                >
                  <svg
                    className="mr-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Password
                </button>
              </div>
            </div>
          </div>
          <div className="passwords mt-8 px-6 pb-6">
            <h2 className="text-2xl font-bold text-blue-300 mb-4">Your Passwords</h2>
            <div className="password-list space-y-3 max-h-64 overflow-y-auto">
              {passwordArr.length > 0 ? (
                passwordArr.map((item, index) => {
                  // Ensure the site URL has a protocol
                  let url = item.site;
                  if (url && !/^https?:\/\//i.test(url)) {
                    url = 'https://' + url;
                  }
                    // Edit icon as a separate component
                    function EditIcon({ onClick }) {
                    return (
                      <button
                      title="Edit entry"
                      onClick={onClick}
                      className="text-gray-400 hover:text-yellow-400 transition p-1"
                      >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.828l-4 1a1 1 0 01-1.263-1.263l1-4a4 4 0 01.828-1.414z" />
                      </svg>
                      </button>
                    );
                    }

                    return (
                      <div key={index} className="password-item bg-gray-700/80 border border-gray-600 p-4 rounded-lg flex flex-col gap-1 shadow hover:shadow-lg transition">
                      <div className="flex items-center justify-between">
                        <h3 className="text-gray-100 font-semibold text-lg">
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline text-blue-400"
                        >
                          {item.site}
                        </a>
                        </h3>
                        <div className="flex gap-2">
                        <EditIcon
                          onClick={() => {
                          // Set form for editing and remember which index is being edited
                          setform(item);
                          setShowPassword(false);
                          setEditingIndex(index);
                          }}
                        />
                        <button
                          title="Delete password"
                          onClick={() => handleDelete(index)}
                          className="text-gray-400 hover:text-red-500 transition p-1"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-gray-300 text-sm">
                        Username: <span className="font-mono">{item.username}</span>
                        </p>
                        <button
                        title="Copy username"
                        onClick={() => handleCopy(item.username)}
                        className="text-gray-400 hover:text-blue-400 transition p-1"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
                          <rect x="3" y="3" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-gray-300 text-sm">
                        Password: <span className="font-mono tracking-wider">{item.password}</span>
                        </p>
                        <button
                        title="Copy password"
                        onClick={() => handleCopy(item.password)}
                        className="text-gray-400 hover:text-blue-400 transition p-1"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
                          <rect x="3" y="3" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        </button>
                      </div>
                      </div>
                    );
                })
              ) : (
                <p className="text-gray-400 text-center">No passwords saved yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default Body
