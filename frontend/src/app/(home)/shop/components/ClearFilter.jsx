import { Button } from "@/components/ui/button";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React from "react";

const ClearFilter = ({ isChild, children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const clearQuery = () => {
    const urlWithoutQueryParams = pathname.split("?")[0];
    router.replace(urlWithoutQueryParams);
  };

  if (isChild && React.isValidElement(children)) {
    return React.cloneElement(children, { onClick: clearQuery });
  }

  return (
    <Button onClick={clearQuery} className="bg-red-600">
      Clear filters
    </Button>
  );
};

export default ClearFilter;
