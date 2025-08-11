import { Outlet } from "react-router-dom";
import { memo } from "react";

function MemoizedOutlet() {
  return <Outlet />;
}

export default memo(MemoizedOutlet);
