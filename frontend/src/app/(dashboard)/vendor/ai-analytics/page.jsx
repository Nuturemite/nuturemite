"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import api from "@/lib/api";
import DashTable from "../DashTable";
const AiAnalytics = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      setResponse("");
      const res = await api.post("/ai-analytics", { query: prompt });
      setResponse(res.data);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">AI Analytics</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="response">Response</Label>
          <AIResult response={response} isLoading={loading} />
        </div>
        <div>
          <Label htmlFor="prompt">Prompt</Label>
          <Input
            type="text"
            id="prompt"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            required
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

const AIResult = ({ response, isLoading }) => {
  if (isLoading) return <div>Loading...</div>;
  if (!response.resStructure || !response.tableConfig || !response.data)
    return <div>Something went wrong: Try again</div>;

  if (response.resStructure === "Table") {
    return (
      <DashTable
        columns={response.tableConfig.columns}
        data={response.data}
        isLoading={false}
        caption={response.prompt}
      />
    );
  }
};

export default AiAnalytics;
