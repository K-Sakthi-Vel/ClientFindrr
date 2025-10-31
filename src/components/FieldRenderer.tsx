import React from 'react';
import type { SearchFieldConfig } from '../config/searchConfig';

type Props = {
  config: SearchFieldConfig;
  value: string;
  onChange: (name: string, value: string) => void;
};

export const FieldRenderer: React.FC<Props> = ({ config, value, onChange }) => {
  const name = config.key;
  const commonProps = {
    id: name,
    name,
    value: value ?? '',
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      onChange(name, e.target.value)
  };

  switch (config.uiType) {
    case 'input':
      return (
        <div className="flex flex-col">
          <label htmlFor={name} className="text-sm font-medium mb-1">{config.label}</label>
          <input
            type="text"
            placeholder={config.placeholder}
            {...commonProps}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring"
          />
        </div>
      );
    case 'date':
      return (
        <div className="flex flex-col">
          <label htmlFor={name} className="text-sm font-medium mb-1">{config.label}</label>
          <input type="date" {...commonProps} className="px-3 py-2 border rounded-md" />
        </div>
      );
    case 'select':
      return (
        <div className="flex flex-col">
          <label htmlFor={name} className="text-sm font-medium mb-1">{config.label}</label>
          <select {...commonProps} className="px-3 py-2 border rounded-md">
            <option value="">Any</option>
            {config.options?.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      );
    default:
      return null;
  }
};
