"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Twitter, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import { useCategories } from "@/lib/data";
import Link from "next/link";
import api from "@/lib/api";
import { useState } from "react";
import { tst } from "@/lib/utils";
const Footer = () => {
  const { categories, isLoading } = useCategories();
  const [email, setEmail] = useState("");

  const socialMedia = [
    {
      id: 1,
      icon: <Twitter className="text-tert-100" />,
      title: "Twitter",
      link: "https://twitter.com/nuturemite",
    },
    {
      id: 2,
      icon: <Facebook className="text-tert-100" />,
      title: "Facebook",
      link: "https://www.facebook.com/Nuturemite/",
    },
    {
      id: 3,
      icon: <Instagram className="text-tert-100" />,
      link: "https://www.instagram.com/nuturemite_blog/",
    },
    {
      id: 4,
      icon: <Youtube className="text-tert-100" />,
      link: "https://www.youtube.com/channel/UCX1EgOA4GP0PJO893cHtbbA",
    },
    {
      id: 5,
      icon: <Linkedin className="text-tert-100" />,
      link: "https://www.linkedin.com/showcase/nuturemite/about/",
    },
  ];
  const customerServices = [
    {
      name: "Help & FAQs",
      link: "/faq",
    },
    {
      name: "Return Policy",
      link: "/return-and-refund",
    },
    {
      name: "Shipping Policy",
      link: "/shipping-policy",
    },
    {
      name: "Privacy Policy",
      link: "/privacy-policy",
    },
    {
      name: "Terms & Conditions",
      link: "/terms-conditions",
    },
  ];

  const aboutLinks = [
    {
      name: "About Us",
      link: "/about-us",
    },
    {
      name: "Our Story",
      link: "/our-story",
    },
    {
      name: "Contact Us",
      link: "/contact-us",
    },
    {
      name: "Blogs",
      link: "/blogs",
    },
  ];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/subscribe", { email });
      tst.success("Subscribed successfully");
      console.log(res);
    } catch (error) {
      tst.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="container-fluid bg-primary text-secondary mt-5 p-10  text-sm ">
      <div className="flex flex-wrap justify-center px-4 lg:px-0">
        {/* Left Column */}
        <div className="w-full  mb-5 lg:mb-0 pr-4 lg:w-1/5">
          <div className="flex gap-2 ">
            <MapPin className="text-tert-100 mr-3" />
            <span className="text-secondary text-uppercase mb-4">Get In Touch</span>
          </div>
          <p className="mb-2 flex items-center">
            NUTUREMITE 5-5-35/201/NR.PRASHANTI NAGER, NEAR GANESH KANTA, Hyderabad, Telangana-500072
          </p>
          <p className="mb-2 flex items-center">
            5-5-35/201/NR.PRASHANTI NAGER, NEAR GANESH KANTA, Kukatpally Circle No 24, Hyderabad,
            Telangana-500072
          </p>
        </div>
        <div className="w-full lg:w-4/5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Customer Service",
              links: customerServices ?? [],
            },
            {
              title: "About",
              links: aboutLinks,
            },
            {
              title: "Popular categories",
              links:
                categories?.map(cat => ({ link: `/shop?categoryId=${cat._id}`, name: cat.name })) ??
                [],
            },
            { title: "Newsletter", links: [] },
          ].map(({ title, links }, index) => (
            <div key={index} className="w-full  mb-5">
              <h5 className="text-secondary text-uppercase mb-4">{title}</h5>
              {links.length > 0 ? (
                <div className="flex flex-col">
                  {links.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.link}
                      className="text-secondary mb-2 flex items-center"
                    >
                      <i className="fa fa-angle-right mr-2"></i>
                      {link.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <>
                  <p className="mb-2">
                    Get all the latest information on Events, Sales and Offers.
                  </p>
                  <form action="" className="mb-4">
                    <div className="flex items-center">
                      <Input
                        type="text"
                        className="text-slate-900"
                        placeholder="Your Email Address"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                      <Button className="btn bg-tert-100 text-white ml-2" onClick={handleSubscribe}>
                        Subscribe
                      </Button>
                    </div>
                  </form>
                  <h6 className="text-secondary text-uppercase mb-3">Follow Us</h6>
                  <div className="flex">
                    {socialMedia.map((item, index) => (
                      <a
                        key={index}
                        href={item.link}
                        rel="nofollow noopener noreferrer"
                        target="_blank"
                        className="btn text-tert-100 btn-square mr-2"
                        title={item.title}
                      >
                        {item.icon}
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
