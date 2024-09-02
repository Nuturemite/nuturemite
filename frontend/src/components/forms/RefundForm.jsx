import { useState } from "react";
import api from "@/lib/api";
import { tst } from "@/lib/utils";
import { Label, Input, Button } from "@/components/ui";
import { Textarea } from "../ui/textarea";
import OutLoader from "../ui/outloader";

export default function RefundForm({ order, onClose }) {
  const [refundData, setRefundData] = useState({ reason: "", refundAmount: order.total });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setRefundData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setPending(true);

    try {
      await api.post(`/orders/${order._id}/refund`, refundData);
      tst.success("Refund created successfully");
      onClose();
    } catch (err) {
      tst.error(err.message || "Failed to create refund");
      setError(err);
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid gap-6 py-4">
          <div>
            <Label htmlFor="reason" className="mb-2 block">
              Reason
            </Label>
            <Textarea
              type="text"
              name="reason"
              value={refundData.reason}
              onChange={handleChange}
              id="reason"
              disabled={pending}
              placeholder="Reason for refund"
              required
              minLength="3"
            />
          </div>

          <div>
            <Label htmlFor="refundAmount" className="mb-2 block">
              Refund Amount
            </Label>
            <Input
              type="number"
              name="refundAmount"
              value={refundData.refundAmount}
              onChange={handleChange}
              id="refundAmount"
              disabled={pending}
              placeholder="Refund amount"
              required
              min="1"
            />
          </div>

          {error && <p className="text-red-600">{error.message}</p>}

          <div className="flex justify-end">
            <Button type="submit" disabled={pending}>
              {pending ? "Creating refund..." : "Create Refund"}
            </Button>
          </div>
        </div>
      </form>
      <OutLoader loading={pending} />
    </>
  );
}
