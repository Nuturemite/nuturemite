"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function BusinessDetails() {
  const [pending, setPending] = useState(false);
  const [values, setValues] = useState({
    licenseNumber: "",
    issuedBy: "",
    issuedDate: "",
    expiryDate: "",
    documentUrl: "",
  });

  const handleSubmit = async e => {
    e.preventDefault();
    setPending(true);
    try {
      const response = await fetch(`${api.baseUrl}/auth/vendor/business-details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      setPending(false);
      setValues({
        licenseNumber: "",
        issuedBy: "",
        issuedDate: "",
        expiryDate: "",
        documentUrl: "",
      });
      toast.success("Details submitted successfully");
    } catch (error) {
      setPending(false);
      toast.error("Something went wrong. Please try again");
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="w-full mb-40  max-w-3xl mt-10 mx-auto">
      <h2 className="h3-primary">Business Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-10 ">
          <div>
            <Label htmlFor="licenseNumber">License Number</Label>
            <Input
              id="licenseNumber"
              type="text"
              placeholder="License Number"
              name="licenseNumber"
              required
              value={values.licenseNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="issuedBy">Issued By</Label>
            <Input
              id="issuedBy"
              type="text"
              placeholder="Issued By"
              name="issuedBy"
              required
              value={values.issuedBy}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="issuedDate">Issued Date</Label>
            <Input
              id="issuedDate"
              type="date"
              placeholder="Issued Date"
              name="issuedDate"
              required
              value={values.issuedDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input
              id="expiryDate"
              type="date"
              placeholder="Expiry Date"
              name="expiryDate"
              required
              value={values.expiryDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="documentUrl">Document URL</Label>
            <Input
              id="documentUrl"
              type="text"
              placeholder="Document URL"
              name="documentUrl"
              required
              value={values.documentUrl}
              onChange={handleChange}
            />
          </div>
        </div>{" "}
        <Button  className="px-20 " type="submit"  disabled={pending} pending={pending}>
          {"Submit"}
        </Button>
      </form>
    </div>
  );
}

