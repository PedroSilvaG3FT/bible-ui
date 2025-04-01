import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function AppFooterComponent() {
  return (
    <footer className="bg-secondary py-8">
      <div className="app-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img
              src="/logo.svg"
              alt="iBiblia"
              className="mb-4 object-contain h-6 transition-all duration-300 brightness-0"
            />

            <p className="text-sm">
              iBiblia is your go-to platform for finding the best flight deals
              worldwide.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-primary">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-primary">
                  Search Flights
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-primary">
                  Destinations
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-primary">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-sm">Email: info@ibiblia.com</p>
            <p className="text-sm">Phone: +1 (123) 456-7890</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className=" hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className=" hover:text-primary">
                <Twitter size={20} />
              </a>
              <a href="#" className=" hover:text-primary">
                <Instagram size={20} />
              </a>
              <a href="#" className=" hover:text-primary">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-sm ">
            © {new Date().getFullYear()} iBiblia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
