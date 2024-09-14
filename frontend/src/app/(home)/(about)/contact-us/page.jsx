const ContactUs = () => {
  const socialMedia = [
    {
      id: 1,
      title: "Twitter",
      link: "https://twitter.com/nuturemite",
    },
    {
      id: 2,
      title: "Facebook",
      link: "https://www.facebook.com/Nuturemite/",
    },
    {
      id: 3,
      title: "Instagram",
      link: "https://www.instagram.com/nuturemite_blog/",
    },
    {
      id: 4,
      title: "Youtube",
      link: "https://www.youtube.com/channel/UCX1EgOA4GP0PJO893cHtbbA",
    },
    {
      id: 5,
      title: "Linkedin",
      link: "https://www.linkedin.com/showcase/nuturemite/about/",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <p className="mb-4 text-gray-600">Last updated: 12/09/2024</p>

      <p className="mb-4 text-gray-700">
        At Nuturemite, we are committed to providing exceptional service and support to our
        customers. If you have any questions, feedback, or concerns, please feel free to reach out
        to us through any of the methods listed below.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Our Contact Information</h2>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>
          <strong>Email:</strong>{" "}
          <a href="mailto:nuturemite.info" className="text-blue-500 hover:underline">
            nuturemite.info
          </a>
        </li>
        <li>
          <strong>Phone:</strong>{" "}
          <a href="tel:+918919993233" className="text-blue-500 hover:underline">
            +91 891 999 3233
          </a>
        </li>
        <li>
          <strong>Address:</strong> NUTUREMITE 5-5-35/201/NR.PRASHANTI NAGER, NEAR GANESH KANTA,
          Hyderabad, Telangana-500072
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Business Hours</h2>
      <p className="mb-4 text-gray-700">
        Our customer service team is available Monday to Friday, 9:00 AM to 5:00 PM (IST). We strive
        to respond to all inquiries within 24-48 hours.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Follow Us</h2>
      <p className="mb-4 text-gray-700">
        Stay connected with us on social media for the latest updates, promotions, and wellness
        tips:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        {socialMedia.map(({ id, title, link }) => (
          <li key={id}>
            <strong>{title}:</strong>{" "}
            <a href={link} className="text-blue-500 hover:underline">
              {title}
            </a>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">General Inquiries</h2>
      <p className="mb-4 text-gray-700">
        For general questions or feedback, please email us at{" "}
        <a href="mailto:nuturemite.info" className="text-blue-500 hover:underline">
          nuturemite.info
        </a>{" "}
        or call us at{" "}
        <a href="tel:+918919993233" className="text-blue-500 hover:underline">
          +91 891 999 3233
        </a>
        .
      </p>
    </div>
  );
};

export default ContactUs;
