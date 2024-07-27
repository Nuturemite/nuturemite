"use client"
import { Car, CheckCircle, Phone, Truck } from "lucide-react";

export const Featured = () => {
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
          {[
            { id: 1, icon: CheckCircle, title: "Quality Product" },
            { id: 2, icon: Truck, title: "Free Shipping" },
            { id: 3, icon: Car, title: "14-Day Return" },
            { id: 4, icon: Phone, title: "24/7 Support" },
          ].map(({ id, icon: Icon, title }) => (
            <div key={id} className="bg-white p-8 mb-4 flex justify-center items-center  ">
              <Icon className="text-primary mr-2 text-center" size={56} />
              <h5 className="font-semibold">{title}</h5>
            </div>
          ))}
        </div>
      </div>
    );
  };
  