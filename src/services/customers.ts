import type { Customer } from '../types';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

function encodeQueryParams(params: Record<string, string | undefined>) {
  const qp = Object.entries(params)
    .filter(([_k,v]) => v !== undefined && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v as string)}`);
  return qp.length ? `?${qp.join('&')}` : '';
}

/**
 * Build JSON Server query:
 * - for partial matches we use _like (regex). For firstName/lastName use e.g. firstName_like=^An  to match prefix
 */
export async function fetchCustomers(filters: Record<string, string>): Promise<Customer[]> {
  // Map filter keys to JSON Server query params
  const params: Record<string,string | undefined> = {};

  if (filters.firstName) params['firstName_like'] = filters.firstName;
  if (filters.lastName) params['lastName_like'] = filters.lastName;
  if (filters.dateOfBirth) params['dateOfBirth'] = filters.dateOfBirth;
  if (filters.maritalStatus) params['maritalStatus'] = filters.maritalStatus;

  // Use _sort/_order, limit etc as needed
  const q = encodeQueryParams(params);

  const res = await fetch(`${API_BASE}/customers${q}`);
  if (!res.ok) throw new Error('Failed to fetch customers');
  const data = await res.json();
  return data as Customer[];
}
