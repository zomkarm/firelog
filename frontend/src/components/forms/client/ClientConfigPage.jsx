import React, { useEffect, useState } from 'react';

export default function ClientConfigPage() {
  const [config, setConfig] = useState({
    webhookUrl: '',
    alertThresholds: {
      failedLogin: 10,
      rateLimit: 100
    }
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [apikey,setApiKey] = useState("");
  const [keyVisibility,setVisibility] = useState("Show");
  const [apiInputType,setApiInputType] = useState("password");
  
  const handleApiSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/client/apikey`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Update failed');
      setMessage({ type: 'success', text: 'X-Api-Key updated!' });
      fetchApiKey();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  }

  function apiKeyToggle(){
    if(keyVisibility === "Show") {
      setVisibility("Hide");
      setApiInputType("text");
      
    }else{
      setVisibility("Show");
      setApiInputType("password");
    }
  }

  const fetchApiKey = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/client/apikey`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      setApiKey(data.apiKey);
    } catch (err) {
      console.error('Error fetching X-Api-key', err);
    }
  };

  // Load config on mount
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/client/config`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
        setConfig(data);
      } catch (err) {
        console.error('Error fetching config', err);
      }
    };
    fetchConfig();
    fetchApiKey();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'webhookUrl') {
      setConfig((prev) => ({ ...prev, webhookUrl: value }));
    } else {
      setConfig((prev) => ({
        ...prev,
        alertThresholds: {
          ...prev.alertThresholds,
          [name]: Number(value)
        }
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/client/config`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(config),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Update failed');
      setMessage({ type: 'success', text: 'Configuration updated!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };
  function copyApiKey(){
    navigator.clipboard.writeText(apikey);
    alert("Api Key Copied !")
  }

  return (
    <div className="max-w-xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4">Alert & Webhook Settings</h2>

      {message && (
        <div className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Webhook URL</label>
          <input
            type="url"
            name="webhookUrl"
            className="w-full border rounded p-2"
            value={config.webhookUrl}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Failed Login Threshold</label>
          <input
            type="number"
            name="failedLogin"
            className="w-full border rounded p-2"
            value={config.alertThresholds?.failedLogin ?? 0}
            onChange={handleChange}
            min={1}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Rate Limit Threshold</label>
          <input
            type="number"
            name="rateLimit"
            className="w-full border rounded p-2"
            value={config.alertThresholds?.rateLimit ?? 0}
            onChange={handleChange}
            min={1}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Configuration'}
        </button>
      </form>

      <h2 className="text-2xl font-semibold mt-4 mb-4">X-Api-key KEY </h2>
      <form onSubmit={handleApiSubmit} className="space-y-4">
        <input type={apiInputType} onChange={(e)=> setApiKey(e.target.value)} name="xapikey" value={apikey} className="w-full border rounded p-2"></input>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
         onClick={handleApiSubmit}
        >Change X-Api-key KEY</button>
        <button
          type="button"
          onClick={apiKeyToggle}
          className="bg-blue-600 text-white px-4 py-2 m-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >{keyVisibility}</button>
        <button
          type="button"
          onClick={copyApiKey}
          className="bg-blue-600 text-white px-4 py-2 m-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >Copy</button>
      </form>
    </div>
  );
}
