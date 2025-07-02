import React from "react";
import { TrashIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from "react";

export default function ALert ({message, type, onClose}) {
    const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [message]);
    if(!message) return null;
     const base = "w-full max-w-xl mx-auto mb-4 px-4 py-3 rounded-md flex justify-between items-center transition-opacity duration-300";

  const styles = {
    error: "bg-red-100 border border-red-400 text-red-700",
    success: "bg-green-100 border border-green-400 text-green-700",
    warning: "bg-yellow-100 border border-yellow-400 text-yellow-700",
  };

  return (
    <div className={`${base} ${styles[type]}`}>
      <span className="font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-xl font-bold hover:text-black"
      >
        ✖
      </button>
    </div>
  );
}

