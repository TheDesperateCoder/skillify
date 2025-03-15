import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold border-b-2 border-blue-500 inline-block pb-1 mb-3">
              About Us
            </h3>
            <p className="text-gray-400">
              Skillify is the AI-powered skill assessment platform to evaluate candidates efficiently with the help of the team THE CONQUERORS.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold border-b-2 border-blue-500 inline-block pb-1 mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400">Dashboard</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400">Contact Us</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold border-b-2 border-blue-500 inline-block pb-1 mb-3">
              Follow Us
            </h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 text-xl"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-xl"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-xl"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="text-center border-t border-gray-700 mt-6 pt-4">
          <p className="text-gray-500">&copy; 2025 Skillify | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
