"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import {
  Dialog,
  DialogPortal,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label, Input } from "@/components/ui";
import { Edit } from "lucide-react";
import { tst } from "@/lib/utils";
import CustomSelect from "@/components/ui/custrom-select";

const statusOptions = [
  { id: "picked", name: "Picked" },
  { id: "shipped", name: "Shipped" },
  { id: "in_transit", name: "In transit" },
  { id: "out_for_delivery", name: "Out for delivery" },
  { id: "returned", name: "Returned" },
  { id: "delivered", name: "Delivered" },
  { id: "cancelled", name: "Cancelled" },
];

const UpdateShipmentDialog = ({ shipmentId, mutate }) => {
  const [state, setState] = useState({
    pending: false,
    trackingId: "",
    carrier: "",
    status: "",
    shipment: null,
  });

  useEffect(() => {
    const fetchShipment = async () => {
      try {
        const response = await api.get(`/shipments/${shipmentId}`);
        const shipmentData = response.data.data;
        setState(prevState => ({
          ...prevState,
          shipment: shipmentData,
          trackingId: shipmentData.trackingId,
          carrier: shipmentData.carrier,
          status: shipmentData.status,
        }));
      } catch (error) {
        console.error(error);
        tst.error(error);
      }
    };

    if (shipmentId) {
      fetchShipment();
    }
  }, [shipmentId]);

  const handleUpdate = async () => {
    try {
      setState(prevState => ({ ...prevState, pending: true }));
      await api.put(`/shipments/${shipmentId}`, {
        trackingId: state.trackingId,
        carrier: state.carrier,
        status: state.status,
      });
      mutate();
      tst.success("Shipment updated successfully");
    } catch (error) {
      console.error(error);
      tst.error(error);
    } finally {
      setState(prevState => ({ ...prevState, pending: false }));
    }
  };

  if (!state.shipment) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit className="text-green-500 cursor-pointer" />
      </DialogTrigger>
      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Shipment Details</DialogTitle>
            <DialogDescription>
              Update the tracking ID, carrier, and status for the shipment.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={e => e.preventDefault()}>
            <div className="my-4 grid grid-cols-4">
              <Label>Tracking ID</Label>
              <Input
                type="text"
                value={state.trackingId}
                onChange={e =>
                  setState(prevState => ({ ...prevState, trackingId: e.target.value }))
                }
                className="col-span-3"
              />
            </div>
            <div className="my-4 grid grid-cols-4">
              <Label>Carrier</Label>
              <Input
                type="text"
                value={state.carrier}
                onChange={e => setState(prevState => ({ ...prevState, carrier: e.target.value }))}
                className="col-span-3"
              />
            </div>
            <div className="my-4 grid grid-cols-4">
              <Label>Status</Label>
              <CustomSelect
                options={statusOptions}
                value={state.status}
                onChange={value => setState(prevState => ({ ...prevState, status: value }))}
                placeholder="Select status"
                className="col-span-3"
              />
            </div>
            <DialogFooter>
              <DialogClose>
                <Button variant="destructive">Cancel</Button>
              </DialogClose>
              <Button pending={state.pending} type="submit" onClick={handleUpdate}>
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default UpdateShipmentDialog;
