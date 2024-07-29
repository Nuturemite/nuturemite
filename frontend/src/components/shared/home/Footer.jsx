"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCategories } from "@/lib/data";
import {
  Mail,
  Phone,
  MapPin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  const { categories } = useCategories();
  return (
    <div className="container-fluid bg-primary text-secondary mt-5 p-10  text-sm ">
      <div className="flex flex-wrap justify-center px-4 lg:px-0">
        {/* Left Column */}
        <div className="w-full  mb-5 lg:mb-0 pr-4 lg:w-1/5">
          <h5 className="text-secondary text-uppercase mb-4">Get In Touch</h5>
          <p className="mb-2 flex items-center">
            <MapPin className="text-tert-100 mr-3" />
            Plot No. 37/Part S.No376/A
          </p>
          <p className="mb-2 flex items-center">
            2nd Floor, Rajiv Ganghi Nagar, IDA Kukatpally - 500072
          </p>
          <p className="mb-0 flex items-center">Telangana,India</p>
        </div>

        {/* Right Columns */}
        <div className="w-full lg:w-4/5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* Quick Shop and My Account Columns */}
          {[
            {
              title: "Customer Service",
              links: [
                "Help & FAQs",
                "Order Tracking",
                "Shipping & Delivery",
                "Orders History",
                "Advanced Search",
                "Login",
              ],
            },
            {
              title: "",
              links: [
                "About Us",
                "Careers",
                "Our Stores",
                "Corporate Sales",
                "Careers",
              ],
            },
            {
              title: "Popular categories",
              links: categories
                ? categories?.map((category) => category.name)
                : [],
            },
            { title: "Newsletter", links: [] },
          ].map(({ title, links }, index) => (
            <div key={index} className="w-full  mb-5">
              <h5 className="text-secondary text-uppercase mb-4">{title}</h5>
              {links.length > 0 ? (
                <div className="flex flex-col">
                  {links.map((link, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="text-secondary mb-2 flex items-center"
                    >
                      <i className="fa fa-angle-right mr-2"></i>
                      {link}
                    </a>
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
                        className="form-control flex-1"
                        placeholder="Your Email Address"
                      />
                      <Button className="btn bg-tert-100 text-white ml-2">
                        Sign Up
                      </Button>
                    </div>
                  </form>
                  <h6 className="text-secondary text-uppercase mb-3">
                    Follow Us
                  </h6>
                  <div className="flex">
                    <a
                      href="https://facebook.com/nuturemite"
                      rel="nofollow noopener noreferrer"
                      target="_blank"
                      className="btn text-tert-100 btn-square mr-2"
                      title="Facebook"
                    >
                      <Facebook />
                    </a>
                    <a
                      href="https://twitter.com/nuturemite"
                      rel="nofollow noopener noreferrer"
                      target="_blank"
                      className="btn text-tert-100 btn-square mr-2"
                      title="Twitter"
                    >
                      <Twitter />
                    </a>
                    <a
                      href="https://www.youtube.com/c/Nuturemitehealth"
                      rel="nofollow noopener noreferrer"
                      target="_blank"
                      className="btn text-tert-100 btn-square mr-2"
                      title="Youtube"
                    >
                      <Youtube />
                    </a>
                    <a
                      href="https://www.instagram.com/nuturemite_blog"
                      rel="nofollow noopener noreferrer"
                      target="_blank"
                      className="btn text-tert-100 btn-square mr-2"
                      title="Instagram"
                    >
                      <Instagram />
                    </a>
                    <a
                      href="https://www.linkedin.com/showcase/nuturemite/"
                      rel="nofollow noopener noreferrer"
                      target="_blank"
                      className="btn text-tert-100 btn-square"
                      title="LinkedIn"
                    >
                      <Linkedin />
                    </a>
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
