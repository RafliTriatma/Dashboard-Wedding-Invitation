import React from 'react';
import { Guest } from '@/types';
import Button from '../ui/Button';

interface GuestRowProps {
  guest: Guest;
  index: number;
  onSendWhatsApp: (guest: Guest) => void;
  onCopyLink: (guest: Guest) => void;
}

const GuestRow: React.FC<GuestRowProps> = ({
  guest,
  index,
  onSendWhatsApp,
  onCopyLink,
}) => {
  return (
    <tr className="border-b border-gray-200">
      <td className="px-4 py-3 text-gray-700">{index + 1}</td>
      <td className="px-4 py-3 text-gray-700">{guest.name}</td>
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <Button
            variant="success"
            size="sm"
            onClick={() => onSendWhatsApp(guest)}
          >
            <span className="mr-1">📱</span>
            Kirim
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onCopyLink(guest)}
          >
            <span className="mr-1">🔗</span>
            Link
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default GuestRow;