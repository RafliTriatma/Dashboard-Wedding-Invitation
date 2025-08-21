import React from 'react';
import { InvitationForm } from '@/types';
import Input from '../ui/Input';
import Textarea from '../ui/TextArea';
import Select from '../ui/Select';


interface GuestNameFormProps {
  formData: InvitationForm;
  onChange: (field: keyof InvitationForm, value: string) => void;
}

const GuestNameForm: React.FC<GuestNameFormProps> = ({ formData, onChange }) => {
  const typeOptions = [
    { value: 'to', label: 'to' },
    { value: 'untuk', label: 'untuk' },
    { value: 'kepada', label: 'kepada' },
  ];

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Masukan Nama Tamu :
        </label>
        <p className="text-xs text-red-500 mb-2">
          *Gunakan (⏎) untuk memisahkan nama yang akan Anda undang
        </p>
        
        <Select
          label="Pilih"
          options={typeOptions}
          value={formData.selectedType}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange('selectedType', e.target.value)}
        />
        
        <Textarea
          placeholder="Nama Tamu"
          value={formData.guestName}
          onChange={(e) => onChange('guestName', e.target.value)}
          rows={3}
        />
      </div>
    </div>
  );
};

export default GuestNameForm;