import { Link } from "react-router-dom";
import { MessageCircle, Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-muted border-t border-border mt-20">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                     <div className="flex items-center space-x-2 justify-start">
  <div className="w-8 h-8 rounded-lg bg-gradient-primary" />

  <img 
    src="/manovaidya-logo.png"
    alt="Manovaidya Logo"
    className="w-50 h-10 object-contain ml-[-30px]"
  />
</div>

                        <p className="text-sm text-muted-foreground">
                            Structured support for parents of neurodivergent and emotionally struggling children.
                        </p>
                        <div className="flex space-x-3">
                            <a href="#" className="p-2 rounded-lg bg-background hover:bg-primary-light transition-smooth">
                                <MessageCircle className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 rounded-lg bg-background hover:bg-primary-light transition-smooth">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 rounded-lg bg-background hover:bg-primary-light transition-smooth">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 rounded-lg bg-background hover:bg-primary-light transition-smooth">
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Learn</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/courses" className="text-muted-foreground hover:text-foreground transition-smooth">
                                    All Courses
                                </Link>
                            </li>
                            <li>
                                <Link to="/resources" className="text-muted-foreground hover:text-foreground transition-smooth">
                                    Free Resources
                                </Link>
                            </li>
                            <li>
                                <Link to="/community" className="text-muted-foreground hover:text-foreground transition-smooth">
                                    Community
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-smooth">
                                    About Doctors
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
                                    WhatsApp Support
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-muted-foreground hover:text-foreground transition-smooth">
                                    Refund Policy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Manovaidya Parent Academy. All rights reserved.</p>
                    <p className="mt-2">
                        A safe, judgment-free zone for parents navigating Autism, ADHD, and emotional health challenges.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
