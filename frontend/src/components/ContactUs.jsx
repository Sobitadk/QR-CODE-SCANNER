// src/components/ContactUs.jsx
import React, { useState } from "react";
import { 
  FaInstagram, 
  FaFacebook, 
  FaLinkedin, 
  FaGithub, 
  FaEnvelope 
} from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";

function ContactUs() {
  // State for contact form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isCopied, setIsCopied] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (simulated for now)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission (you can replace this with an API call)
    setSubmissionStatus("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmissionStatus(null), 3000); // Clear message after 3 seconds
  };

  // Handle email copy
  const email = "sobitadhk89@gmail.com"; // Updated email

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Contact Section */}
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">Contact Us</h2>
        <p className="text-gray-600 mb-8 text-lg">
          Feel free to reach out to us for any questions or suggestions.
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors duration-300 font-semibold"
          >
            Send Message
          </button>
          {submissionStatus && (
            <p className="text-green-500 text-center mt-4">{submissionStatus}</p>
          )}
        </form>

        {/* Contact Links (Icons with Usernames) */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Connect With Us</h3>
          <div className="flex flex-wrap items-center gap-6">
            {/* Email with Copy to Clipboard */}
            <CopyToClipboard text={email} onCopy={() => setIsCopied(true)}>
              <button
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-300"
                onMouseLeave={() => setIsCopied(false)}
                aria-label="Copy email to clipboard"
              >
                <FaEnvelope size={24} />
                <span className="text-sm">(sobitadhk89)</span>
                {isCopied && <span className="text-green-500 text-sm ml-2">Copied!</span>}
              </button>
            </CopyToClipboard>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/ti_v_os/"
              className="flex items-center space-x-2 text-pink-500 hover:text-pink-700 transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram size={24} />
              <span className="text-sm">(ti_v_os)</span>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/sovit.adhikari.73"
              className="flex items-center space-x-2 text-blue-800 hover:text-blue-900 transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook size={24} />
              <span className="text-sm">(sovit.adhikari.73)</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/sobit-adhikari/"
              className="flex items-center space-x-2 text-blue-700 hover:text-blue-900 transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={24} />
              <span className="text-sm">(sobit-adhikari)</span>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/Sobitadk"
              className="flex items-center space-x-2 text-gray-800 hover:text-gray-900 transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub size={24} />
              <span className="text-sm">(Sobitadk)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;