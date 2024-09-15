import Link from "next/link";
import { Button } from "@/components/ui";
import api from "@/lib/api";
import { tst } from "@/lib/utils";

const AddressCard = ({ address }) => {
    const handleRemoveAddress = async () => {
      try {
        await api.delete(`/addresses/${address._id}`);
      } catch (error) {
        console.log(error);
        tst.error(error);
      }
    };
  
    return (
      <div className="bg-white p-4 border  flex flex-col">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-2">{`${address.fname} ${address.lname}`}</h2>
          <div className="gap-2 flex">
            <Link variant="outline" href={`/address/edit/${address._id}`}>
              <Button>Edit</Button>
            </Link>
            <Button variant="destructive" onClick={handleRemoveAddress}>
              Remove
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-1">{address.email}</p>
        <p className="text-sm text-gray-600 mb-1">{address.phone}</p>
        <p className="text-sm text-gray-600 mb-1">{address.address}</p>
        <p className="text-sm text-gray-600 mb-1">{`${address.city}, ${address.state} ${address.zipcode}`}</p>
      </div>
  );
};

export default AddressCard;