import React from "react";

const UploadHeader: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <h1 className="text-xl font-semibold text-slate-800">PixPort</h1>
          </div>
          <nav className="flex items-center space-x-6">
            <a
              href="#"
              className="text-slate-600 hover:text-slate-800 transition-colors"
            >
              Gallery
            </a>
            <a
              href="#"
              className="text-slate-600 hover:text-slate-800 transition-colors"
            >
              My Images
            </a>
            <button className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors">
              Sign In
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default UploadHeader;
