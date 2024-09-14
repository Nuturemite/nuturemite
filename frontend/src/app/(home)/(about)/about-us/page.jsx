const sections = [
  {
    title: "Nuturemite",
    content: `Nuturemite is a website that offers credible information, which helps you in making healthy eating choices. It serves as a gateway and provides reliable information on nutrition, healthy eating, physical activity, and food safety for consumers. Our website receives guidance from professionals like doctors, nutritionists, dietitians, fitness gurus, and the best nutrition counselors, who work as a team for making a healthy society.`,
  },
  {
    title: "What We Do?",
    content: `Nuturemite is the site that gives you information regarding the foods that boost up the health of an individual, their effects on different systems of our body, various food recipes, food safety, health, and fitness, food based on different age groups. We expose you to experts and professionals in fitness and health, whose suggestions can answer your queries, available in different languages as per customer requests. We also provide high-quality food supplements if required, based on prescriptions.`,
  },
  {
    title: "Who We Are?",
    content: `We, through our website Nuturemite, bring experts in nutrition and health care to guide you on proper nutrition, food choices to keep yourself fit and healthy, owing to disease symptoms or chronic suffering. We provide nutritional benefits about foods, and guide you to have the right food, at the right time, in the right way as per your body requirements. Our registered dietitians and nutritionists design various nutrition programs to raise awareness about nutritious foods and their role in preventing chronic diseases. We help alleviate chronic disease symptoms and promote a healthy lifestyle.`,
  },
  {
    title: "Vision",
    content: `We at Nuturemite respect and appreciate all health care professionals who dedicate time to their clients. We believe in partnerships with health care professionals and focus on our mission, which is truly important and meaningful to us. We are eager to hear from you regarding health queries and strive to achieve our vision through customer and employee satisfaction.`,
  },
  {
    title: "Mission",
    content: `Nuturemite aims to support individual health by recommending appropriate foods based on body acceptability, contributing to a healthier society. We provide expert advice and timely delivery of quality food supplements to clients, ensuring their well-being.`,
  },
  {
    title: "Consultation",
    content: `We offer online consultations with high-profile professionals in health care, diet, fitness, etc., who address your concerns and provide appropriate guidance. Our timely response ensures your health is not neglected.`,
  },
  {
    title: "Nutritional Health Supplements",
    content: `We provide high-quality nutrition supplements as per our professionals' suggestions, ensuring quick delivery. We are committed to helping you enjoy delicious foods with caution and maintaining a healthy lifestyle.`,
  },
  {
    title: "Customer Service",
    content: (
      <ul className="list-disc list-inside pl-5 text-gray-700 mb-4">
        <li>Help & FAQs</li>
        <li>Order Tracking</li>
        <li>Shipping & Delivery</li>
        <li>Orders History</li>
        <li>Advanced Search</li>
        <li>Login</li>
      </ul>
    ),
  },
  {
    title: "More Information",
    content: (
      <ul className="list-disc list-inside pl-5 text-gray-700 mb-4">
        <li>Affiliates</li>
        <li>Refer a Friend</li>
        <li>Student Beans Offers</li>
        <li>Gift Vouchers</li>
      </ul>
    ),
  },
  {
    title: "Social Media",
    content: (
      <div className="flex space-x-4">
        <a
          href="https://twitter.com/nuturemite"
          rel="nofollow noopener noreferrer"
          target="_blank"
          className="text-blue-400 hover:underline"
        >
          Twitter
        </a>
        <a
          href="https://www.facebook.com/Nuturemite/"
          rel="nofollow noopener noreferrer"
          target="_blank"
          className="text-blue-600 hover:underline"
        >
          Facebook
        </a>
        <a
          href="https://www.instagram.com/nuturemite_blog/"
          rel="nofollow noopener noreferrer"
          target="_blank"
          className="text-pink-500 hover:underline"
        >
          Instagram
        </a>
        <a
          href="https://www.youtube.com/channel/UCX1EgOA4GP0PJO893cHtbbA"
          rel="nofollow noopener noreferrer"
          target="_blank"
          className="text-red-600 hover:underline"
        >
          YouTube
        </a>
        <a
          href="https://www.linkedin.com/showcase/nuturemite/about/"
          rel="nofollow noopener noreferrer"
          target="_blank"
          className="text-blue-800 hover:underline"
        >
          LinkedIn
        </a>
      </div>
    ),
  },
];

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
      {sections.map((section, index) => (
        <section key={index} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
          <div className="text-lg mb-4">
            {typeof section.content === "string" ? section.content : section.content}
          </div>
        </section>
      ))}
      <footer className="text-center mt-8">
        <p className="text-lg text-gray-600">&copy; 2024 Nuturemite. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;
