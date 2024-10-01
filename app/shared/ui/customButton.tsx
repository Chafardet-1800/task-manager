"use client";
import { Tooltip } from "@nextui-org/tooltip";
import { useTheme } from "next-themes";
import { HiMiniPencil, HiMiniTrash } from "react-icons/hi2";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosAdd,
  IoIosMenu,
  IoIosClose,
  IoIosCheckmark,
} from "react-icons/io";
const CustomButton = ({
  text,
  tooltip,
  icon,
  custonIconColor,
  size = 30,
  onClick,
  type,
  disabled,
  classButton,
}: {
  text: string;
  tooltip?: string;
  icon?:
    | "back"
    | "forward"
    | "add"
    | "menu"
    | "close"
    | "check"
    | "edit"
    | "delete";
  custonIconColor?: string;
  size?: number;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  classButton?:
    | ""
    | "icon"
    | "white"
    | "confirm"
    | "cancel"
    | "warning"
    | "outline-confirm"
    | "outline-cancel"
    | "outline-warning";
}) => {
  const { resolvedTheme } = useTheme();
  let iconColor;

  switch (resolvedTheme) {
    case "light":
      iconColor = "#111827";
      break;
    case "dark":
      iconColor = "#fff";
      break;
    default:
      break;
  }
  let iconButton;

  switch (icon) {
    case "back":
      iconButton = (
        <IoIosArrowBack size={size} color={custonIconColor || iconColor} />
      );
      break;
    case "forward":
      iconButton = (
        <IoIosArrowForward size={size} color={custonIconColor || iconColor} />
      );
      break;
    case "add":
      iconButton = (
        <IoIosAdd size={size} color={custonIconColor || iconColor} />
      );
      break;
    case "menu":
      iconButton = (
        <IoIosMenu size={size} color={custonIconColor || iconColor} />
      );
      break;
    case "edit":
      iconButton = (
        <HiMiniPencil size={size} color={custonIconColor || iconColor} />
      );
      break;
    case "delete":
      iconButton = (
        <HiMiniTrash size={size} color={custonIconColor || iconColor} />
      );
      break;
    case "close":
      iconButton = (
        <IoIosClose size={size} color={custonIconColor || iconColor} />
      );
      break;
    case "check":
      iconButton = (
        <IoIosCheckmark size={size} color={custonIconColor || iconColor} />
      );
      break;
  }

  switch (classButton) {
    case "confirm":
      return (
        <Tooltip
          key={tooltip}
          placement={"bottom"}
          color={"foreground"}
          content={tooltip}
          className="capitalize"
        >
          <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className="flex justify-center gap-3 
            focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 
            font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 
            dark:focus:ring-green-800"
          >
            {iconButton} {text}
          </button>
        </Tooltip>
      );

    case "outline-confirm":
      return (
        <Tooltip
          key={tooltip}
          placement={"bottom"}
          color={"foreground"}
          content={tooltip}
          className="capitalize"
        >
          <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className="flex justify-center gap-3 text-green-700 hover:text-white border border-green-700 hover:bg-green-800 
          focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xl px-5 py-2.5 
          text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white 
          dark:hover:bg-green-600 dark:focus:ring-green-800"
          >
            {iconButton} {text}
          </button>
        </Tooltip>
      );

    case "cancel":
      return (
        <Tooltip
          key={tooltip}
          placement={"bottom"}
          color={"foreground"}
          content={tooltip}
          className="capitalize"
        >
          <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className="flex justify-center gap-3 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 
          font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 
          dark:focus:ring-red-900"
          >
            {iconButton} {text}
          </button>
        </Tooltip>
      );

    case "outline-cancel":
      return (
        <Tooltip
          key={tooltip}
          placement={"bottom"}
          color={"foreground"}
          content={tooltip}
          className="capitalize"
        >
          <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className="flex justify-center gap-3 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 
          focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2 
          dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            {iconButton} {text}
          </button>
        </Tooltip>
      );

    case "warning":
      return (
        <Tooltip
          key={tooltip}
          placement={"bottom"}
          color={"foreground"}
          content={tooltip}
          className="capitalize"
        >
          <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className="flex justify-center gap-3 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 
          focus:ring-yellow-300 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
          >
            {iconButton} {text}
          </button>
        </Tooltip>
      );

    case "outline-warning":
      return (
        <Tooltip
          key={tooltip}
          placement={"bottom"}
          color={"foreground"}
          content={tooltip}
          className="capitalize"
        >
          <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className="flex justify-center gap-3 text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 
          focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 
          dark:focus:ring-yellow-900"
          >
            {iconButton} {text}
          </button>
        </Tooltip>
      );

    case "white":
      return (
        <Tooltip
          key={tooltip}
          placement={"bottom"}
          color={"foreground"}
          content={tooltip}
          className="capitalize"
        >
          <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className="flex justify-center gap-3 text-black bg-white hover:bg-gray-900 hover:text-white focus:outline-none 
          focus:ring-2 focus:ring-purple-950 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 dark:bg-white
          dark:hover:bg-gray-900 dark:hover:text-white dark:focus:ring-purple-950 dark:border-purple-950"
          >
            {iconButton} {text}
          </button>
        </Tooltip>
      );

    case "icon":
      return (
        <Tooltip
          key={tooltip}
          placement={"bottom"}
          color={"foreground"}
          content={tooltip}
          className="capitalize"
        >
          <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className="flex justify-center bg-transparent text-black dark:text-white
          focus:outline-none focus:ring-1 focus:ring-purple-950 rounded-full p-1"
          >
            {iconButton}
          </button>
        </Tooltip>
      );

    default:
      return (
        <Tooltip
          key={tooltip}
          placement={"bottom"}
          color={"foreground"}
          content={tooltip}
          className="capitalize"
        >
          <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className="flex justify-center gap-3 text-white bg-gray-900 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-950 
          font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 dark:bg-gray-900 dark:hover:bg-purple-600
          dark:focus:ring-purple-950 dark:border-purple-950"
          >
            {iconButton} {text}
          </button>
        </Tooltip>
      );
  }
};

export default CustomButton;
