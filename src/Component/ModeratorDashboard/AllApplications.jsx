import React from 'react';
export default function AllApplications() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Applied Scholarships</h2>
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-amber-100">
            <th className="p-2">University Name</th>
            <th className="p-2">Degree</th>
            <th className="p-2">Scholarship Category</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Placeholder row */}
          <tr>
            <td className="p-2">Harvard University</td>
            <td className="p-2">Masters</td>
            <td className="p-2">Need-based</td>
            <td className="p-2">pending</td>
            <td className="p-2 flex gap-2">Details | Feedback | Cancel</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
} 