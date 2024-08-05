import React from "react";
// import CategoryForm from "../../form";
import CategoryForm from "@/components/forms/CategoryForm";

function page({params}) {
  return <CategoryForm params={params} update/>;
}

export default page;
