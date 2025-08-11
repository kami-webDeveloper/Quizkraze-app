const FullPageSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen transition-colors bg-white dark:bg-gray-900">
      <div className="relative w-16 h-16">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-4 rounded-full border-t-blue-500 border-b-green-500 border-l-transparent border-r-transparent animate-spin"></div>

        {/* Inner Logo/Text */}
        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-blue-600 dark:text-blue-300">
          QK
        </div>
      </div>
    </div>
  );
};

export default FullPageSpinner;
