import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function error(error) {
  console.log(error);
  toast.error(
    error?.response?.data?.message ? error.response.data.message : "Something went wrong"
  );
}

function success(message) {
  toast.success(message);
}

export const tst = { error, success };

export const asyncHandler = async (callback, message) => {
  try {
    await callback();
    tst.success(message);
  } catch (error) {
    console.log(error);
    tst.error(error);
  }
};
export const formatString = (str) => {
  return str
    .replace(/([A-Z])/g, ' $1') // Insert space before uppercase letters
    .replace(/[_-]/g, ' ') // Replace underscores and hyphens with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
};


const downloadInvoice = async (id) => {
  const res = await api.get(`/api/orders/invoice/${id}`);
  console.log(res);
};