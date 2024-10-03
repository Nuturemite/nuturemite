export const metadata = {
  title: "Refund and Return Policy",
  description: "Learn about our refund and return policy for your purchases from Nuturemite.",
}

const RefundAndReturnPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Refund and Return Policy</h1>
      <p className="mb-4 text-gray-600">Last updated: 12/09/2024</p>

      <p className="mb-4 text-gray-700">
        At Nuturemite, we strive to provide the best shopping experience and stand behind the
        quality of our products. If you are not entirely satisfied with your purchase, we're here to
        help.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Returns</h2>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>
          <strong>Eligibility for Returns:</strong> You have 7 days from the date of
          delivery to return an item. To be eligible for a return, your item must be unused, in the
          same condition that you received it, and in its original packaging.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Refunds</h2>
      <p className="mb-4 text-gray-700">
        Once we receive your returned item, we will inspect it and notify you that we have received
        your returned item. We will immediately notify you of the status of your refund after
        inspecting the item.
      </p>
      <p className="mb-4 text-gray-700">
        If your return is approved, we will initiate a refund to your original method of payment.
        The time it takes for the refund to be processed is 7 days.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Exchanges</h2>
      <p className="mb-4 text-gray-700">
        If you need to exchange an item, please contact our customer service team to arrange a
        replacement.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Shipping</h2>
      <p className="mb-4 text-gray-700">
        You will be responsible for paying for your own shipping costs for returning your item.
        Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will
        be deducted from your refund.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
      <p className="mb-4 text-gray-700">
        If you have any questions about our Refund and Return Policy, please contact us at
        nuturemite.info or +91 891 999 3233 .
      </p>
    </div>
  );
};

export default RefundAndReturnPolicy;
