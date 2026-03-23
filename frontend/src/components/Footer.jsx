import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 mt-auto">

      {/* Top section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">

        {/* Brand */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-base shadow">
              🍔
            </span>
            <span className="text-white font-extrabold text-lg tracking-tight">FoodStartup</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Fresh food delivered fast. Quality ingredients, straight to your door.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-1">Quick Links</h4>
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About Us" },
            { to: "/contact", label: "Contact" },
            { to: "/login", label: "Login" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className="text-sm text-gray-400 hover:text-emerald-400 transition-colors w-fit"
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Contact / Social */}
        <div className="flex flex-col gap-2">
          <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-1">Contact</h4>
          <p className="text-sm text-gray-400">📧 hello@foodstartup.com</p>
          <p className="text-sm text-gray-400">📞 +91 98765 43210</p>
          <p className="text-sm text-gray-400">📍 Ludhiana, Punjab, India</p>

          {/* Social icons */}
          <div className="flex gap-3 mt-3">
            {[
              { label: "TW", href: "#" },
              { label: "IG", href: "#" },
              { label: "FB", href: "#" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-emerald-600 text-gray-300 hover:text-white text-xs font-bold flex items-center justify-center transition-all duration-200"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800" />

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-gray-500">© 2025 FoodStartup. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="text-xs text-gray-500 hover:text-emerald-400 transition-colors">Privacy Policy</a>
          <a href="#" className="text-xs text-gray-500 hover:text-emerald-400 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}