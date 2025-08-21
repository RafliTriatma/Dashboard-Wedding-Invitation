import React from 'react';
import { InvitationForm } from '@/types';
import Button from '../ui/Button';
import Textarea from '../ui/TextArea';

interface InvitationTextFormProps {
  formData: InvitationForm;
  onChange: (field: keyof InvitationForm, value: string) => void;
}

const InvitationTextForm: React.FC<InvitationTextFormProps> = ({ formData, onChange }) => {
  const textStyles = ['Formal', 'Muslim', 'Nasrani'] as const;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Silahkan Masukan Text Pengantar :
      </label>
      <p className="text-xs text-red-500 mb-4">
        *Isi text [link-undangan] pada text pengantar agar dapat tercantumkan secara otomatis pada undangan
      </p>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pilih Ucapan Text Pengantar :
        </label>
        <div className="flex gap-2 mb-4">
          {textStyles.map((style) => (
            <Button
              key={style}
              variant={formData.textStyle === style ? 'success' : 'secondary'}
              size="sm"
              onClick={() => onChange('textStyle', style)}
              type="button"
            >
              {style}
            </Button>
          ))}
        </div>
      </div>

      <Textarea
        placeholder="Kata Pengantar"
        value={formData.invitationText}
        onChange={(e) => onChange('invitationText', e.target.value)}
        rows={6}
        className="border-2 border-blue-400"
      />
    </div>
  );
};

export default InvitationTextForm;
