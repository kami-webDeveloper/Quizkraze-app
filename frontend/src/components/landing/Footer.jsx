function Footer() {
  return (
    <footer className="py-8 mt-12 text-sm text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-400">
      <div className="flex flex-col items-center justify-between max-w-6xl gap-4 px-4 mx-auto md:flex-row">
        {/* Left: Logo + App name */}
        <div className="flex items-center gap-2 text-2xl font-bold tracking-wide text-blue-600 uppercase">
          <a href="#">QUIZKRAZE</a>
        </div>

        {/* Middle: Quick Links */}
        <div className="flex gap-6">
          <a
            href="#categories"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            Categories
          </a>
          <a
            href="#features"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            Features
          </a>
          <a
            href="#testimonials"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            Testimonials
          </a>
        </div>

        {/* Right: Copyright */}
        <div className="text-xs text-center text-gray-500 dark:text-gray-400 md:text-right">
          © {new Date().getFullYear()} Kamran Froozanfar. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
