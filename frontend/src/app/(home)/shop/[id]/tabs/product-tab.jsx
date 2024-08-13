import Tabs from "@/components/ui/tabs";
import ProductDesc from "./product-desc";
import ProductInfo from "./product-info";
import ReviewComponent from "./review";

const ProductTab = ({ product }) => {
  const reviews = [
    {
      rating: 4,
      date: "July 28, 2024",
      title: "Great Product!",
      content: "I really liked this product. It has great features.",
      author: "Anoop Singh",
    },
  ];

  const tabsData = [
    { id: 1, label: "Description", content: <ProductDesc product={product} /> },
    { id: 2, label: "Information", content: <ProductInfo product={product} /> },
    { id: 3, label: "Reviews", content: <ReviewComponent reviews={reviews} product={product} /> },
  ];
  return <Tabs tabs={tabsData} />;
};

export default ProductTab;
