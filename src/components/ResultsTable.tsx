import React from 'react';
import type { Customer } from '../types';

export const ResultsTable: React.FC<{ customers: Customer[] }> = ({ customers }) => {
  return (
    <table className="min-w-full border-collapse">
      <thead>
        <tr className="text-left">
          <th className="p-2 border-b">Name</th>
          <th className="p-2 border-b">DOB</th>
          <th className="p-2 border-b">Primary Phone</th>
          <th className="p-2 border-b">Primary Email</th>
        </tr>
      </thead>
      <tbody>
        {customers.map(c => (
          <tr key={c.id}>
            <td className="p-2 border-b">{c.firstName} {c.lastName}</td>
            <td className="p-2 border-b">{c.dateOfBirth}</td>
            <td className="p-2 border-b">{(c.phones?.find(p=>p.isPrimary) ?? c.phones?.[0])?.number ?? '-'}</td>
            <td className="p-2 border-b">{(c.emails?.find(e=>e.isPrimary) ?? c.emails?.[0])?.address ?? '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
