function EmailSentPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Email Verification</h1>
      <p className="text-lg mb-4">
        An email has been sent to your email address. Please click the link in the email to verify
        your account.
      </p>
    </div>
  );
}

export default EmailSentPage;
