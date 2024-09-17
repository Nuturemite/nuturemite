import Link from "next/link";
import { Button } from "@/components/ui";
import api from "@/lib/api";
import { tst } from "@/lib/utils";
import { useState } from "react";
import OutLoader from "@/components/ui/outloader";
import { useMyAddresses } from "@/lib/data";
const AddressCard = ({ address }) => {
  const [pending, setPending] = useState(false);
  const { mutate } = useMyAddresses();

  const handleRemoveAddress = async () => {
    try {
      setPending(true);
      await api.delete(`/addresses/${address._id}`);
      await mutate();
    } catch (error) {
      console.log(error);
      tst.error(error);
    } finally {
      setPending(false);
    }
  };

  return (
   <>
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
      <OutLoader loading={pending} />
    </>
  );
};

export default AddressCard;
