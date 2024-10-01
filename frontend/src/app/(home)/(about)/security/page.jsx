export const metadata = {
  title: "Security Policy",
  description: "Learn about our security policy for your purchases from Nuturemite.",
}

const Security = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Security Policy</h1>
      <p className="mb-4 text-gray-600">Last updated: 12/09/2024</p>

      <p className="mb-4 text-gray-700">
        At Nuturemite, we prioritize the security of our customers’ information. We are committed to protecting the confidentiality, integrity, and availability of your data by implementing industry-standard security measures. This Security Policy outlines how we protect your data and ensure a safe and secure shopping experience.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Data Protection</h2>
      <p className="mb-4 text-gray-700">
        We use a variety of security measures to protect your personal information, including:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li><strong>Encryption:</strong> All sensitive information transmitted to and from our website is encrypted using Secure Socket Layer (SSL) technology to prevent unauthorized access.</li>
        <li><strong>Access Control:</strong> Access to your personal information is restricted to authorized personnel only. We enforce strict policies to ensure that your data is handled securely and confidentially.</li>
        <li><strong>Data Storage:</strong> We store your data on secure servers that are protected against unauthorized access, use, or disclosure. Our data centers are monitored 24/7 for security breaches.</li>
        <li><strong>Regular Audits:</strong> We conduct regular security audits and vulnerability assessments to identify and address potential security risks.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Account Security</h2>
      <p className="mb-4 text-gray-700">
        You are responsible for maintaining the confidentiality of your account information, including your password. We recommend using a strong password and changing it regularly to enhance security.
      </p>
      <p className="mb-4 text-gray-700">
        If you suspect any unauthorized access to your account, please contact us immediately at <a href="mailto:nuturemite.info" className="text-blue-500 hover:underline">nuturemite.info</a>.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Payment Security</h2>
      <p className="mb-4 text-gray-700">
        We use secure payment gateways to process your payments. Your payment information is encrypted and processed securely. We do not store your credit card information on our servers.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Reporting Security Issues</h2>
      <p className="mb-4 text-gray-700">
        If you find any security vulnerabilities or have concerns about the security of our website, please contact our security team at <a href="mailto:security@nuturemite.com" className="text-blue-500 hover:underline">security@nuturemite.com</a>. We take all reports seriously and will investigate and respond promptly.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to Our Security Policy</h2>
      <p className="mb-4 text-gray-700">
        We may update our Security Policy periodically to reflect changes in our practices or to comply with regulatory requirements. We encourage you to review this page regularly to stay informed about how we protect your data.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
      <p className="mb-4 text-gray-700">
        If you have any questions about our Security Policy, please contact us at <a href="mailto:nuturemite.info" className="text-blue-500 hover:underline">nuturemite.info</a> or call us at <a href="tel:+918919993233" className="text-blue-500 hover:underline">+91 891 999 3233</a>.
      </p>
    </div>
  );
};

export default Security;
