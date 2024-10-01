export const metadata  = {
  title: "FAQ",
  description: "Frequently Asked Questions (FAQ) about Nuturemite. Find answers to common questions about our products, services, and more.",
}

const FAQ = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions (FAQ)</h1>
      <p className="mb-4 text-gray-600">Last updated: 12/09/2024</p>

      <p className="mb-4 text-gray-700">
        Here are some of the most commonly asked questions by our customers. If you have a question that isn't listed here, feel free to contact us.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">1. What is the return policy?</h2>
      <p className="mb-4 text-gray-700">
        You have [30/60/90] days from the date of delivery to return an item. The item must be unused, in its original condition, and in its original packaging. Please refer to our <a href="/refund-and-return-policy" className="text-blue-500 hover:underline">Refund and Return Policy</a> for more details.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">2. How can I track my order?</h2>
      <p className="mb-4 text-gray-700">
        Once your order has been shipped, you will receive an email with a tracking number and a link to track your package. You can also log in to your account and check the "Orders" section for tracking information.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">3. What payment methods do you accept?</h2>
      <p className="mb-4 text-gray-700">
        We accept all major credit cards (Visa, MasterCard, American Express), debit cards, PayPal, and other secure payment gateways. All transactions are encrypted and secure.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">4. How do I contact customer support?</h2>
      <p className="mb-4 text-gray-700">
        You can contact our customer support team via email at <a href="mailto:nuturemite.info" className="text-blue-500 hover:underline">nuturemite.info</a> or call us at <a href="tel:+918919993233" className="text-blue-500 hover:underline">+91 891 999 3233</a>. Our support team is available Monday to Friday, 9:00 AM to 5:00 PM (IST).
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">5. Do you offer international shipping?</h2>
      <p className="mb-4 text-gray-700">
        Yes, we offer international shipping to select countries. Shipping costs and delivery times vary based on your location. Please refer to our <a href="/shipping-policy" className="text-blue-500 hover:underline">Shipping Policy</a> for more information.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">6. How do I cancel or change my order?</h2>
      <p className="mb-4 text-gray-700">
        If you need to cancel or change your order, please contact us as soon as possible. Once an order has been processed, we may not be able to make changes, but we will do our best to accommodate your request.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">7. Is my personal information secure?</h2>
      <p className="mb-4 text-gray-700">
        Yes, we take the security of your personal information very seriously. Please refer to our <a href="/security-policy" className="text-blue-500 hover:underline">Security Policy</a> for more details on how we protect your data.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">8. What if I receive a damaged or incorrect item?</h2>
      <p className="mb-4 text-gray-700">
        If you receive a damaged or incorrect item, please contact our customer support team immediately. We will arrange for a replacement or refund as per our policies.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">9. Can I exchange an item?</h2>
      <p className="mb-4 text-gray-700">
        Yes, exchanges are allowed within the return period. Please contact our customer support team to initiate an exchange and review our <a href="/return-and-refund" className="text-blue-500 hover:underline">Refund and Return Policy</a> for more details.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">10. How do I subscribe to your newsletter?</h2>
      <p className="mb-4 text-gray-700">
        You can subscribe to our newsletter by entering your email address in the subscription box located at the bottom of our homepage. Stay updated on the latest news, promotions, and offers!
      </p>

      <p className="mt-8 text-gray-700">
        Didn’t find the answer you were looking for? Contact us directly at <a href="mailto:nuturemite.info" className="text-blue-500 hover:underline">nuturemite.info</a> or call us at <a href="tel:+918919993233" className="text-blue-500 hover:underline">+91 891 999 3233</a>.
      </p>
    </div>
  );
};

export default FAQ;
