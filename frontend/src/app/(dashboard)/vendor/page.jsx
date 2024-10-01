"use client";

import OrderTable from "./OrderTable";
import RevPerUserTable from "./RevPerUserTable";
import CardSection from "./CardSection";
import NewReviews from "./NewReviews";
export default function Dashboard() {
  return (
    <div>
      <CardSection />
      <div className="w-full flex gap-4 p-2 md:p-6 ">
        <div className="w-1/2">
          <h2 className="h4-primary">Today's Orders</h2>
          <OrderTable />
        </div>
        <div className="w-1/2">
          <h2 className="h4-primary">Revenue Per User</h2>
          <RevPerUserTable />
        </div>
      </div>
      <NewReviews />
    </div>
  );
}
