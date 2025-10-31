import React, { useState } from 'react';
import { searchConfig } from '../config/searchConfig';
import { ConfigForm } from '../components/ConfigForm';
import { fetchCustomers } from '../services/customers';
import type { Customer } from '../types';

function getPrimaryPhone(c: Customer) {
  const p = c.phones?.find(p => p.isPrimary) ?? c.phones?.[0];
  return p?.number ?? '-';
}
function getPrimaryEmail(c: Customer) {
  const e = c.emails?.find(e => e.isPrimary) ?? c.emails?.[0];
  return e?.address ?? '-';
}

export const SearchPage: React.FC = () => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (name: string, value: string) => {
    setValues(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const onReset = () => {
    setValues({});
    setResults([]);
    setError(null);
  };

  const onSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      // prepare filters: convert empty strings to undefined
      const filters: Record<string,string> = {};
      searchConfig.fields.forEach(f => {
        const v = (values[f.key] ?? '').trim();
        if (v) {
          // For name partial matches: add ^ to match prefix (optional)
          if (f.uiType === 'input') {
            filters[f.key] = `^${v}`; // prefix match using JSON Server _like
          } else {
            filters[f.key] = v;
          }
        }
      });

      const customers = await fetchCustomers(filters);
      setResults(customers);
    } catch (err: any) {
      setError(err?.message ?? 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Customer Search</h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <ConfigForm
          fields={searchConfig.fields}
          values={values}
          onChange={onChange}
          onSubmit={onSubmit}
          onReset={onReset}
          loading={loading}
        />
      </div>

      <div>
        {loading && <div className="py-4">Loading results…</div>}
        {error && <div className="text-red-600 py-2">{error}</div>}
        {!loading && !error && (
          <>
            <div className="mb-3 text-sm text-gray-600">{results.length} result(s)</div>

            <div className="grid gap-4">
              {/* Card layout */}
              {results.map(c => (
                <div key={c.id} className="p-4 border rounded-md bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-semibold">{c.firstName} {c.lastName}</div>
                      <div className="text-sm text-gray-600">DOB: {c.dateOfBirth}</div>
                    </div>
                    <div className="text-right text-sm">
                      <div>Phone: {getPrimaryPhone(c)}</div>
                      <div>Email: {getPrimaryEmail(c)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Optionally, a table view (driven by config for displayed columns) */}
          </>
        )}
      </div>
    </div>
  );
};
