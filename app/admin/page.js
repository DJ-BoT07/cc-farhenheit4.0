"use client";
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const router = useRouter();

  const handleFileUpload = async (event) => {
    try {
      const file = event.target.files[0];
      setUploading(true);
      setMessage({ type: 'info', text: 'Processing file...' });

      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);

          // Transform and sort data by Points
          const transformedData = jsonData
            .map(row => ({
              Department: row.Department || row.department,
              "First Places": parseInt(row["First Places"] || row.first || 0),
              "Second Places": parseInt(row["Second Places"] || row.second || 0),
              "Total Wins": parseInt(row["Total Wins"] || row.totalWins || 0),
              Points: parseInt(row.Points || row.points || 0)
            }))
            .sort((a, b) => b.Points - a.Points)
            .map((row, index) => ({
              ...row,
              Ranking: index + 1
            }));

          // Upload to API
          const response = await fetch('/api/uploadPoints', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: transformedData }),
          });

          const result = await response.json();

          if (result.error) {
            throw new Error(result.error);
          }

          setMessage({ type: 'success', text: 'Data uploaded successfully!' });
        } catch (error) {
          console.error('Error processing file:', error);
          setMessage({ type: 'error', text: `Error processing file: ${error.message}` });
        }
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Error handling file:', error);
      setMessage({ type: 'error', text: `Error handling file: ${error.message}` });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="mb-8 flex items-center space-x-2 text-orange-500 hover:text-orange-400 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>Back to Home</span>
        </button>

        <h1 className="text-4xl font-bold mb-8 text-center">Admin Dashboard</h1>
        
        {/* Upload Section */}
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-orange-500/20 p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Upload Points Data</h2>
          
          <div className="space-y-4">
            <div className="relative">
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className={`block w-full p-4 text-center rounded-lg border-2 border-dashed border-orange-500/50 hover:border-orange-500 transition-colors cursor-pointer ${
                  uploading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {uploading ? 'Uploading...' : 'Click to upload Excel file'}
              </label>
            </div>

            {message.text && (
              <div
                className={`p-4 rounded-lg ${
                  message.type === 'error'
                    ? 'bg-red-500/20 text-red-200'
                    : message.type === 'success'
                    ? 'bg-green-500/20 text-green-200'
                    : 'bg-blue-500/20 text-blue-200'
                }`}
              >
                {message.text}
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-orange-500/20 p-8">
          <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Upload an Excel file (.xlsx or .xls)</li>
            <li>The file should have the following columns:
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Department</li>
                <li>First Places</li>
                <li>Second Places</li>
                <li>Total Wins</li>
                <li>Points</li>
              </ul>
            </li>
            <li>Rankings will be automatically calculated based on points</li>
            <li>Departments will be automatically sorted by Total Points</li>
            <li>All existing data will be replaced with the new data</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 