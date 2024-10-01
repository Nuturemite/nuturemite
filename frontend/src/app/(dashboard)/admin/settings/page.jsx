"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@mui/material";
import { useSettings } from "@/lib/data";
import Loader from "@/components/shared/loader";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { tst } from "@/lib/utils";

function SettingsPage() {
  const { settings: settingsData, isLoading } = useSettings();
  const [settingsFormData, setSettingsFormData] = useState(settingsData);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setSettingsFormData(settingsData);
  }, [settingsData]);

  if (isLoading) return <Loader />;

  const settings = {
    "Shipping Settings": [
      { label: "Shipping Charges", name: "shippingCharges", type: "text", value: settingsData?.shippingCharges },
      { label: "Free Shipping Threshold", name: "freeShippingThreshold", type: "text", value: settingsData?.freeShippingThreshold },
    ],
    "Vendor Settings": [
      { label: "Commission Rate (%)", name: "commissionRate", type: "number", value: settingsData?.commissionRate },
    ],
    "Xpress Settings": [
      { label: "Xpress Email", name: "xpressEmail", type: "text", value: settingsData?.xpressEmail },
      { label: "Xpress Password", name: "xpressPassword", type: "text", value: settingsData?.xpressPassword },
    ],
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettingsFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setPending(true);
      await api.put("/settings", settingsFormData);
      tst.success("Settings updated successfully");
    } catch (error) {
      tst.error(error.message);
    }
    finally{
      setPending(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <form className="space-y-4 mt-10" onSubmit={handleSubmit}>
        {Object.entries(settings).map(([key, settings]) => (
          <div key={key}>
            <h2 className="text-lg font-bold mb-2">{key}</h2>
            {settings.map(setting => (
              <div className="grid grid-cols-5 gap-8 mt-4  items-center" key={setting.name}>
                <Label className=" col-span-2">{setting.label}</Label>
                {setting.type === "textarea" ? (
                  <Textarea name={setting.name} className="col-span-3" value={settingsFormData[setting.name]} onChange={handleChange}></Textarea>
                ) : setting.type === "checkbox" ? (
                  <Switch name={setting.name} className="col-span-3" checked={settingsFormData[setting.name]} onChange={handleChange} />
                ) : (
                  <Input name={setting.name} className="col-span-3" value={settingsFormData[setting.name]} onChange={handleChange} />
                )}
              </div>
            ))}
          </div>
        ))}
        <Button type="submit" pending={pending}>Save Settings</Button>
      </form>
    </div>
  );
}
export default SettingsPage;
