import React, { useState } from 'react';
import { HiDocumentDuplicate, HiCheck } from 'react-icons/hi';

const CodeBlock = ({ code, language = 'javascript' }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="
      relative rounded-lg overflow-hidden my-4 border
      bg-gray-100 border-gray-300
    ">
      {/* Language badge */}
      <div className="
        absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-semibold
        bg-gray-300 text-gray-800
      ">
        {language.toUpperCase()}
      </div>

      {/* Copy button */}
      <button
        onClick={copyToClipboard}
        className="
          absolute top-2 right-2 p-2 rounded-md transition-all duration-200
          bg-gray-300 text-gray-800 hover:bg-gray-400
        "
        title="Copy code"
      >
        {copied ? (
          <HiCheck size={18} />
        ) : (
          <HiDocumentDuplicate size={18} />
        )}
      </button>

      {/* Code content */}
      <pre className="
        p-4 pt-12 pb-4 overflow-x-auto text-sm font-mono
        text-gray-900
      ">
        <code className="text-sm leading-relaxed">
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
