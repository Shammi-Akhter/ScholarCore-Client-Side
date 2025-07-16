import React from 'react';

export default function ConfirmModal({ open, onConfirm, onCancel, message }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xs flex flex-col items-center">
        <div className="mb-4 text-center text-lg font-semibold">{message || 'Are you sure?'}</div>
        <div className="flex gap-4">
          <button className="btn bg-red-500 text-white px-4 py-1 rounded" onClick={onConfirm}>Yes</button>
          <button className="btn bg-gray-200 text-gray-700 px-4 py-1 rounded" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
} 