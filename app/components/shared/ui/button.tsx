import React from "react";

const button = ({
  text,
  onClick,
  type,
  disabled,
  classButton,
}: {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  classButton:
    | "confirm"
    | "cancel"
    | "warning"
    | "outline-confirm"
    | "outline-cancel"
    | "outline-warning";
}) => {
  switch (classButton) {
    case "confirm":
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          type={type}
          className="
          focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 
          font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 
          dark:focus:ring-green-800"
        >
          {text}
        </button>
      );

    case "outline-confirm":
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          type={type}
          className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 
          focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 
          text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white 
          dark:hover:bg-green-600 dark:focus:ring-green-800"
        >
          {text}
        </button>
      );

    case "cancel":
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          type={type}
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 
          font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 
          dark:focus:ring-red-900"
        >
          {text}
        </button>
      );

    case "outline-cancel":
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          type={type}
          className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 
          focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 
          dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
        >
          {text}
        </button>
      );

    case "warning":
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          type={type}
          className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 
          focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
        >
          {text}
        </button>
      );

    case "outline-warning":
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          type={type}
          className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 
          focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 
          dark:focus:ring-yellow-900"
        >
          {text}
        </button>
      );

    default:
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          type={type}
          className="text-white bg-gray-900 hover:bg-gray-950 focus:outline-none focus:ring-4 focus:ring-gray-300 
          font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-900 dark:hover:bg-gray-800 
          dark:focus:ring-gray-700 dark:border-gray-700"
        >
          {text}
        </button>
      );
  }
};

export default button;
