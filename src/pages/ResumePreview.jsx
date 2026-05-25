import React, { useState } from "react";
import { Link } from "react-router-dom";
import ClassicTemplate from "../components/resume-templates/ClassicTemplate";
import ModernTemplate from "../components/resume-templates/ModernTemplate";
import CreativeTemplate from "../components/resume-templates/CreativeTemplate";
import { LayoutTemplate, AlignLeft, Sparkles, Printer } from "lucide-react";

const ResumePreview = ({ resumeData }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  if (!resumeData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No resume data found.</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Please fill in the resume form first.</p>
        <Link
          to="/resume-form"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition shadow-sm font-medium"
        >
          Go to Resume Form
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const templates = {
    classic: <ClassicTemplate resumeData={resumeData} />,
    modern: <ModernTemplate resumeData={resumeData} />,
    creative: <CreativeTemplate resumeData={resumeData} />
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] overflow-y-auto p-4 sm:p-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      
      {/* Template Switcher UI (Hidden on Print) */}
      <div className="max-w-4xl mx-auto mb-8 print:hidden">
        <div className="bg-white dark:bg-[#111116] rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 p-5 flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <LayoutTemplate className="w-6 h-6 text-blue-500" /> Choose Design
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Select a premium template that fits your profile</p>
          </div>
          
          <div className="flex bg-gray-50 dark:bg-black/20 p-1.5 rounded-xl gap-1 border border-gray-100 dark:border-white/5 overflow-x-auto w-full md:w-auto">
            <button 
              onClick={() => setSelectedTemplate('classic')}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${selectedTemplate === 'classic' ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm border border-gray-200 dark:border-gray-700' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50'}`}
            >
              <AlignLeft className="w-4 h-4" /> Classic
            </button>
            <button 
              onClick={() => setSelectedTemplate('modern')}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${selectedTemplate === 'modern' ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm border border-gray-200 dark:border-gray-700' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50'}`}
            >
              <LayoutTemplate className="w-4 h-4" /> Modern
            </button>
            <button 
              onClick={() => setSelectedTemplate('creative')}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${selectedTemplate === 'creative' ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm border border-gray-200 dark:border-gray-700' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50'}`}
            >
              <Sparkles className="w-4 h-4" /> Creative
            </button>
          </div>
          
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 font-bold whitespace-nowrap w-full md:w-auto"
          >
            <Printer className="w-5 h-5" /> Download / Print
          </button>
        </div>
      </div>

      {/* Print Styles */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }

            .resume-printable, .resume-printable * {
              visibility: visible;
            }

            .resume-printable {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              margin: 0;
              padding: 0;
              box-shadow: none !important;
            }

            /* Force background colors for print */
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            /* Hide everything else */
            .sidebar, .footer, .navbar, .header, .app-container, .print\\:hidden {
              display: none !important;
            }
          }
        `}
      </style>

      {/* Selected Template Render */}
      <div className="w-full flex justify-center pb-12">
        {templates[selectedTemplate]}
      </div>
    </div>
  );
};

export default ResumePreview;
