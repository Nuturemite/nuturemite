import React from "react";
import BrandForm from "@/components/forms/BrandForm";

function page({params}) {
  return <BrandForm params={params} update/>;
}

export default page;
