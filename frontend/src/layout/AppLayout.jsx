import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MemoizedOutlet from "./MemoizedOutlet";
import BottomNav from "./BottomNav";

export default function AppLayout() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="flex h-screen overflow-hidden text-gray-900 bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
      {/* Fixed Sidebar */}
      <div className="sticky top-0 hidden h-screen overflow-x-hidden overflow-y-auto bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 lg:block lg:w-64">
        <Sidebar />
      </div>

      {/* Main layout */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Fixed Topbar */}
        <div className="sticky top-0 z-20 border-b border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          <Topbar pathname={pathname} />
        </div>

        {/* Mobile Search Overlay */}
        {/* {isSearchOpen && showSearch && (
          <MobileSearchOverlay
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onClose={() => setIsSearchOpen(false)}
          />
        )} */}

        {/* Scrollable content */}
        <main className="flex-1 p-3 pb-20 overflow-y-auto md:pb-4">
          <MemoizedOutlet />
        </main>

        {/* Sticky Bottom Nav */}
        <div className="sticky bottom-0 z-20 lg:hidden">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
