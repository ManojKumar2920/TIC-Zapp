import React, { useState } from "react";
import Navbar from "./Navbar";
import LetterImg from "../assets/letter-img.png";
import logo from "../assets/logo.png";

const Letter = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    agreed: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx28KyHOaxMAUdN5GShhAATRHynOWT-hpxzy-_Hv7POS-dsw4zIZ0KAz_C5eg6hKBm2/exec'; // Replace with your deployed script URL

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const saveToGoogleSheets = async (data) => {
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Due to no-cors mode, we can't actually read the response
      // We'll assume success if no error was thrown
      return true;
    } catch (error) {
      console.error('Submission error:', error);
      throw new Error('Failed to save to Google Sheets');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreed) {
      setMessage("Please agree to the terms before proceeding");
      return;
    }
    
    setIsSubmitting(true);
    setMessage("");

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    try {
      await saveToGoogleSheets(formData);
      
      setMessage("Thank you for subscribing to our newsletter!");
      setFormData({ name: "", email: "", agreed: false });
      
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-screen overflow-hidden">
      <Navbar />

      <div className="w-full flex items-center justify-center mt-[20%] md:mt-[10%]">
        <img src={LetterImg} alt="" width={600} />
      </div>
      <div className="w-full min-h-screen bg-[#B9D432] py-20 px-10 flex flex-col items-center">
        <div>
          <img src={logo} alt="logo" className="h-16 rounded-b-xl" />
        </div>
        <div className="text-black flex flex-col items-center justify-center">
          <h1 className="my-6">ENERGY COMMITMENT AGREEMENT</h1>
          <p className="max-w-2xl uppercase my-4">
            Welcome to the Zapp Energy Revolution! By subscribing to our
            newsletter, you're not just signing up for emails; you're joining a
            movement that's more exciting than the first sip of your morning
            coffee (which, let's be honest, could use a little competition).
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-xl mt-8">
            <div className="flex gap-4">
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500"
                />
              </div>

              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500"
                />
              </div>
            </div>

            <div className="flex items-start gap-2 mb-4">
              <input
                type="checkbox"
                name="agreed"
                checked={formData.agreed}
                onChange={handleChange}
                className="mt-1"
                required
              />
              <label className="text-[12px]">
              You agree to be supercharged by Zapp’s electrifying updates through rare (but absurdly entertaining) emails. By creating an account, I confirm that I’m ready for a boost of greatness and accept the Terms & Conditions / Privacy Policy… because who actually reads those anyway?
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white uppercase py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 disabled:bg-gray-400"
            >
              {isSubmitting ? "Killing lazy soul..." : "kill your lazy soul"}
            </button>

            {message && (
              <p
                className={`mt-4 text-center ${
                  message.includes("error") || message.includes("Please") ? "text-red-600" : "text-green-700"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Letter;