import React from 'react';
import { FieldRenderer } from './FieldRenderer';
import type { SearchFieldConfig } from '../config/searchConfig';

type Props = {
  fields: SearchFieldConfig[];
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
  onSubmit: () => void;
  onReset?: () => void;
  loading?: boolean;
};

export const ConfigForm: React.FC<Props> = ({ fields, values, onChange, onSubmit, onReset, loading }) => {
  const sorted = [...fields].sort((a,b)=> (a.renderOrder ?? 0) - (b.renderOrder ?? 0));
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sorted.map(f => (
          <FieldRenderer key={String(f.key)} config={f} value={values[f.key] ?? ''} onChange={onChange} />
        ))}
      </div>

      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
        <button type="button" className="px-4 py-2 rounded border" onClick={onReset}>Reset</button>
      </div>
    </form>
  );
};
