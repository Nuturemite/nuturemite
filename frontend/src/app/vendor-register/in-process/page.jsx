import Navbar from "../navbar";

export default function VerifyPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Navbar/>
      <div className="bg-white p-8 rounded-lg shadow-md w-full">
        <h2 className="text-2xl font-bold mb-4">Verify Vendor Details</h2>
        <p className="text-gray-600">
          Your vendor details have been registered and sent for verification.
          Please wait for our team to verify your details.
        </p>
      </div>
    </div>
  );
}
