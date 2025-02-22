import React from "react";
import { 
  FaFacebookF, 
  FaTwitter, // Using FaTwitter as a fallback (you can switch to FaXTwitter if available)
  FaInstagram, 
  FaLinkedinIn, 
  FaGithub 
} from "react-icons/fa";

function Footer() {
  return (
    <footer 
      className="bg-gray-900 text-white pt-12 pb-6 mt-auto"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand & Description */}
          <div className="max-w-xs">
            <h2 className="text-3xl font-bold">QR Snack System</h2>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              Revolutionizing snack management with innovative QR technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="/" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="/dashboard" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a 
                  href="/generate" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
                >
                  Generate QR
                </a>
              </li>
              <li>
                <a 
                  href="/contact" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Follow Us</h3>
            <div className="flex space-x-6">
              <a 
                href="https://www.facebook.com/sovit.adhikari.73" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-300"
                aria-label="Facebook"
              >
                <FaFacebookF size={24} />
              </a>
              <a 
                href="https://x.com/SobitAdk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-300"
                aria-label="X (Twitter)"
              >
                <FaTwitter size={24} />
              </a>
              <a 
                href="https://www.instagram.com/ti_v_os/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
              <a 
                href="https://www.linkedin.com/in/sobit-adhikari/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={24} />
              </a>
              <a 
                href="https://github.com/Sobitadk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors duration-300"
                aria-label="GitHub"
              >
                <FaGithub size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center">
          <p className="text-sm text-gray-500">
            © 2025 QR Snack System. All rights reserved.
          </p>
          <p className="text-sm mt-2">
            Developed by <span className="font-medium text-gray-300">Sobit Adhikari</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;