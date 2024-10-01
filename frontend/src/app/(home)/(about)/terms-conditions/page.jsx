export const metadata = {
  title: "Terms and Conditions",
  description: "Read our Terms and Conditions to understand the rules and regulations for using our website.",
}

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Terms and Conditions</h1>
      <p className="mb-4 text-gray-600">Last updated: 12/09/2024</p>

      <p className="mb-4 text-gray-700">
        Welcome to Nuturemite! These terms and conditions outline the rules and regulations for using our website. By accessing or using our website, you accept these terms and conditions in full. If you disagree with any part of these terms and conditions, please do not use our website.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">1. Intellectual Property Rights</h2>
      <p className="mb-4 text-gray-700">
        Unless otherwise stated, Nuturemite and/or its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may access this content for personal use, subject to the restrictions set in these terms and conditions.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">2. Restrictions</h2>
      <p className="mb-4 text-gray-700">
        You are specifically restricted from the following:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>Publishing any website material in other media.</li>
        <li>Selling, sublicensing, or otherwise commercializing any website material.</li>
        <li>Publicly performing or showing any website material.</li>
        <li>Using this website in a damaging way or that may damage the website.</li>
        <li>Using this website contrary to applicable laws and regulations.</li>
        <li>Engaging in data mining, data harvesting, data extracting, or similar activities.</li>
        <li>Using this website for advertising or marketing purposes.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">3. User-Generated Content</h2>
      <p className="mb-4 text-gray-700">
        "User-Generated Content" refers to any audio, video, text, images, or other material that you choose to display on our website. By displaying your content, you grant Nuturemite a non-exclusive, worldwide, irrevocable, sublicensable license to use, reproduce, adapt, publish, translate, and distribute it in any media.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">4. Limitation of Liability</h2>
      <p className="mb-4 text-gray-700">
        In no event shall Nuturemite, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website. Nuturemite, including its officers, directors, and employees, shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this website.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">5. Indemnification</h2>
      <p className="mb-4 text-gray-700">
        You hereby indemnify to the fullest extent Nuturemite from and against any and all liabilities, costs, demands, causes of action, damages, and expenses arising in any way related to your breach of any of the provisions of these terms.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">6. Termination</h2>
      <p className="mb-4 text-gray-700">
        We may terminate or suspend access to our website immediately, without prior notice or liability, for any reason, including without limitation if you breach the terms and conditions.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">7. Governing Law</h2>
      <p className="mb-4 text-gray-700">
        These terms and conditions will be governed by and construed in accordance with the laws of [Your Country/State], and you submit to the non-exclusive jurisdiction of the state and federal courts located in [Your Country/State] for the resolution of any disputes.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">8. Changes to These Terms</h2>
      <p className="mb-4 text-gray-700">
        We reserve the right to update or change our terms and conditions at any time. You are encouraged to review this page periodically for any changes. Your continued use of the website following the posting of changes will mean that you accept and agree to the changes.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">9. Contact Us</h2>
      <p className="mb-4 text-gray-700">
        If you have any questions about these Terms and Conditions, please contact us at <a href="mailto:nuturemite.info" className="text-blue-500 hover:underline">nuturemite.info</a> or call us at <a href="tel:+918919993233" className="text-blue-500 hover:underline">+91 891 999 3233</a>.
      </p>
    </div>
  );
};

export default TermsAndConditions;
