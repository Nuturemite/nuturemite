import React from 'react';
import Link from 'next/link';
const RegisterNotification = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold">Vendor Registration Successful</h1>
            <p className="mt-4 text-lg">Your vendor account has been registered successfully.</p>
            <p className="mt-2 text-lg">It will be verified shortly.</p>
            <Link href="/" className="mt-4 text-blue-500 hover:text-blue-700">Back to Home</Link>
        </div>
    );
};

export default RegisterNotification;
