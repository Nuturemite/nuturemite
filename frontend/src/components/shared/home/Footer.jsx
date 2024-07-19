import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Phone, MapPin, Twitter, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <div className="container-fluid bg-back-primary text-secondary mt-5 p-10">
            <div className="flex flex-wrap justify-center px-4 lg:px-0">
                {/* Left Column */}
                <div className="w-full lg:w-1/3 mb-5 lg:mb-0 pr-4">
                    <h5 className="text-secondary text-uppercase mb-4">Get In Touch</h5>
                    <p className="mb-4">No dolore ipsum accusam no lorem. Invidunt sed clita kasd clita et et dolor sed dolor. Rebum tempor no vero est magna amet no</p>
                    <p className="mb-2 flex items-center"><MapPin className="text-primary mr-3" />123 Street, New York, USA</p>
                    <p className="mb-2 flex items-center"><Mail className="text-primary mr-3" />info@example.com</p>
                    <p className="mb-0 flex items-center"><Phone className="text-primary mr-3" />+012 345 67890</p>
                </div>

                {/* Right Columns */}
                <div className="w-full lg:w-2/3 flex flex-wrap">
                    {/* Quick Shop and My Account Columns */}
                    {[{ title: "Quick Shop", links: ["Home", "Our Shop", "Shop Detail", "Shopping Cart", "Checkout", "Contact Us"] },
                      { title: "My Account", links: ["Home", "Our Shop", "Shop Detail", "Shopping Cart", "Checkout", "Contact Us"] },
                      { title: "Newsletter", links: [] }].map(({ title, links }, index) => (
                        <div key={index} className="w-full md:w-1/2 lg:w-1/3 mb-5">
                            <h5 className="text-secondary text-uppercase mb-4">{title}</h5>
                            {links.length > 0 ? (
                                <div className="flex flex-col">
                                    {links.map((link, idx) => (
                                        <a key={idx} href="#" className="text-secondary mb-2 flex items-center"><i className="fa fa-angle-right mr-2"></i>{link}</a>
                                    ))}
                                </div>
                            ) : (
                                <>
                                    <p className="mb-2">Duo stet tempor ipsum sit amet magna ipsum tempor est</p>
                                    <form action="" className="mb-4">
                                        <div className="flex items-center">
                                            <Input type="text" className="form-control flex-1" placeholder="Your Email Address" />
                                            <Button className="btn bg-primary text-white ml-2">Sign Up</Button>
                                        </div>
                                    </form>
                                    <h6 className="text-secondary text-uppercase mb-3">Follow Us</h6>
                                    <div className="flex">
                                        <a href="#" className="btn bg-primary btn-square mr-2"><Twitter /></a>
                                        <a href="#" className="btn bg-primary btn-square mr-2"><Facebook /></a>
                                        <a href="#" className="btn bg-primary btn-square mr-2"><Instagram /></a>
                                        <a href="#" className="btn bg-primary btn-square"><Instagram /></a>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="border-top mx-4 lg:mx-5 py-4" style={{ borderColor: "rgba(256, 256, 256, .1) !important" }}>
                <div className="w-full lg:w-1/2 px-4 mb-4 lg:mb-0">
                    <p className="text-center lg:text-left text-secondary mb-0">
                        &copy; <a href="#" className="text-primary">Domain</a>. All Rights Reserved. Designed
                        by
                        <a href="https://htmlcodex.com" className="text-primary">HTML Codex</a>
                    </p>
                </div>
                <div className="w-full lg:w-1/2 px-4 text-center lg:text-right">
                    <img className="img-fluid" src="img/payments.png" alt="" />
                </div>
            </div>
        </div>
    );
}

export default Footer;
