export const metadata = {
  title: "Shipping Policy",
  description: "Learn about our shipping policy for your purchases from Nuturemite.",
}

const ShippingPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Shipping Policy</h1>
      <p className="mb-4 text-gray-600">Last updated: 12/09/2024</p>

      <p className="mb-4 text-gray-700">
        At Nuturemite, we are committed to delivering your orders as quickly and efficiently as possible. This Shipping Policy outlines the details regarding shipping methods, costs, and delivery times for orders placed on our website.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Shipping Methods and Delivery Times</h2>
      <p className="mb-4 text-gray-700">
        We offer a variety of shipping options to meet your needs:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>
          <strong>Standard Shipping:</strong> Delivered within 5-7 business days.
        </li>
        <li>
          <strong>Express Shipping:</strong> Delivered within 2-3 business days.
        </li>
        <li>
          <strong>Overnight Shipping:</strong> Delivered within 1 business day.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Shipping Costs</h2>
      <p className="mb-4 text-gray-700">
        Shipping costs are calculated at checkout based on the shipping method selected and the destination of your order. 
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li><strong>Standard Shipping:</strong> Free on orders over ₹2000, otherwise a flat rate of ₹50.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Order Processing Time</h2>
      <p className="mb-4 text-gray-700">
        Orders are processed within 1-2 business days after they are placed. Orders placed on weekends or holidays will be processed on the next business day. You will receive an email confirmation once your order has been shipped, along with a tracking number.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">International Shipping</h2>
      <p className="mb-4 text-gray-700">
        We offer international shipping to select countries. Delivery times vary depending on the destination. Please note that international orders may be subject to additional customs fees or import taxes, which are the responsibility of the customer.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Shipping Restrictions</h2>
      <p className="mb-4 text-gray-700">
        Some items may have shipping restrictions based on destination and regulations. We are not able to ship to P.O. Boxes, APO/FPO addresses, or certain remote locations. 
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Delayed or Lost Shipments</h2>
      <p className="mb-4 text-gray-700">
        If your order is delayed or lost during shipping, please contact us at <a href="mailto:nuturemite.info" className="text-blue-500 hover:underline">nuturemite.info</a> or call us at <a href="tel:+918919993233" className="text-blue-500 hover:underline">+91 891 999 3233</a>. We will work with the carrier to resolve the issue as quickly as possible.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Tracking Your Order</h2>
      <p className="mb-4 text-gray-700">
        Once your order has been shipped, you will receive a confirmation email with a tracking number. You can use this tracking number to check the status of your order on the carrier's website.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Policy</h2>
      <p className="mb-4 text-gray-700">
        We may update our Shipping Policy from time to time to reflect changes in our services or to comply with applicable laws. Please review this page periodically for any updates.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
      <p className="mb-4 text-gray-700">
        If you have any questions about our Shipping Policy, please contact us at <a href="mailto:nuturemite.info" className="text-blue-500 hover:underline">nuturemite.info</a> or call us at <a href="tel:+918919993233" className="text-blue-500 hover:underline">+91 891 999 3233</a>.
      </p>
    </div>
  );
};

export default ShippingPolicy;
