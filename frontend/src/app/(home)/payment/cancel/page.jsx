import Link from 'next/link';
import React from 'react';

export default function PaymentCancel() {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Payment Canceled</h1>
        <p className="text-gray-600 mb-4">
          We're sorry, but your payment was canceled. If you have any questions or need assistance, please contact our support team.
        </p>
        <p className="text-gray-600 mb-6">
          You can try making the payment again or return to the homepage.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
            Return to Homepage
          </Link>
          <a href="/" className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
