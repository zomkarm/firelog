import React from 'react';
import { Card, CardContent } from '../../ui/card';
import { Copy } from 'lucide-react';

const ClientApiDocsPage = () => {
  const apiKey = 'YOUR_CLIENT_API_KEY'; // Replace with dynamic token if available

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Client API Documentation</h1>

      <Card className="mb-6">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">Base URL</h2>
          <code className="block bg-gray-100 p-2 rounded">
            https://api.yourdomain.com/api
          </code>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">Authentication</h2>
          <p>All API requests must include your API key:</p>
          <code className="block bg-gray-100 p-2 rounded mt-2">
            x-api-key: <span className="text-blue-600">{apiKey}</span>
            <button onClick={copyToClipboard} className="ml-2 text-sm text-gray-500 hover:text-black inline-flex items-center">
              <Copy size={16} className="mr-1" /> Copy
            </button>
          </code>
        </CardContent>
      </Card>

      {/* LOG APIs */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">Log APIs</h2>

          <div className="mb-4">
            <h3 className="font-semibold">POST /api/logs</h3>
            <p className="text-sm text-gray-700">Create a new log entry</p>
            <pre className="bg-gray-100 p-2 mt-2 rounded text-sm overflow-auto">
{`Headers:
  x-api-key: YOUR_API_KEY
  Content-Type: application/json

Body:
{
  "ip": "192.168.1.1",
  "type": "suspicious",
  "message": "Suspicious login detected",
  "meta": {
    "userAgent": "Mozilla/5.0",
    "url": "/login"
  }
}`}
            </pre>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold">GET /api/logs</h3>
            <p className="text-sm text-gray-700">Fetch all logs for your account</p>
            <pre className="bg-gray-100 p-2 mt-2 rounded text-sm">
{`Headers:
  x-api-key: YOUR_API_KEY`}
            </pre>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold">GET /api/logs/:id</h3>
            <p className="text-sm text-gray-700">Get a specific log entry by ID</p>
            <pre className="bg-gray-100 p-2 mt-2 rounded text-sm">
{`Headers:
  x-api-key: YOUR_API_KEY`}
            </pre>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold">GET /api/logs/ip/:ip</h3>
            <p className="text-sm text-gray-700">Get all logs for a specific IP address</p>
            <pre className="bg-gray-100 p-2 mt-2 rounded text-sm">
{`Headers:
  x-api-key: YOUR_API_KEY`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* ALERT APIs */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">Alert APIs</h2>

          <div className="mb-4">
            <h3 className="font-semibold">GET /api/alerts</h3>
            <p className="text-sm text-gray-700">Fetch all active alerts for your account</p>
            <pre className="bg-gray-100 p-2 mt-2 rounded text-sm">
{`Headers:
  x-api-key: YOUR_API_KEY`}
            </pre>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold">GET /api/alerts/:id</h3>
            <p className="text-sm text-gray-700">Get details of a specific alert by ID</p>
            <pre className="bg-gray-100 p-2 mt-2 rounded text-sm">
{`Headers:
  x-api-key: YOUR_API_KEY`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientApiDocsPage;
