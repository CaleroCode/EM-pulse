import React from 'react';
import { X, AlertCircle } from 'lucide-react';

export default function AlertModal({ isOpen, onClose, title, message, type = 'error' }) {
  if (!isOpen) return null;

  const bgColor = type === 'error' ? 'from-red-500/20 to-red-600/20' : 'from-blue-500/20 to-blue-600/20';
  const borderColor = type === 'error' ? 'border-red-500/50' : 'border-blue-500/50';
  const textColor = type === 'error' ? 'text-red-400' : 'text-blue-400';
  const buttonBgColor = type === 'error' ? 'from-red-500 to-red-600' : 'from-blue-500 to-blue-600';

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`bg-empulseBg border-2 ${borderColor} rounded-2xl max-w-md w-full shadow-2xl`}>
        {/* Header */}
        <div className={`bg-gradient-to-r ${bgColor} border-b ${borderColor} p-6 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <AlertCircle className={textColor} size={28} />
            <h2 className={`text-2xl font-bold ${textColor}`}>
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-300 transition-colors duration-200 p-1"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <p className="text-slate-300 text-center text-lg leading-relaxed">
            {message}
          </p>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-700/50 bg-slate-900/30 p-6 flex justify-end">
          <button
            onClick={onClose}
            className={`px-6 py-2 bg-gradient-to-r ${buttonBgColor} text-white font-bold rounded-lg hover:shadow-lg transition-all duration-200`}
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
