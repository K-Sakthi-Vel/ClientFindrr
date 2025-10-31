import type { Customer } from '../types';

type UIType = 'input' | 'date' | 'select';

export type SearchFieldConfig = {
  key: keyof Customer | string; // allow extension (e.g., "middleName")
  uiType: UIType;
  label: string;
  placeholder?: string;
  renderOrder?: number;
  options?: { value: string; label: string }[]; // for select
  // any other metadata can be added here
};

export const searchConfig: { fields: SearchFieldConfig[] } = {
  fields: [
    {
      key: 'firstName',
      uiType: 'input',
      label: 'First Name',
      placeholder: 'Enter first name',
      renderOrder: 1
    },
    {
      key: 'lastName',
      uiType: 'input',
      label: 'Last Name',
      placeholder: 'Enter last name',
      renderOrder: 2
    },
    {
      key: 'dateOfBirth',
      uiType: 'date',
      label: 'Date of Birth',
      placeholder: 'YYYY-MM-DD',
      renderOrder: 3
    },
    {
      key: 'maritalStatus',
      uiType: 'select',
      label: 'Marital Status',
      renderOrder: 4,
      options: [
        { value: 'Single', label: 'Single' },
        { value: 'Married', label: 'Married' },
        { value: 'Divorced', label: 'Divorced' },
        { value: 'Widowed', label: 'Widowed' }
      ]
    }
  ]
};
