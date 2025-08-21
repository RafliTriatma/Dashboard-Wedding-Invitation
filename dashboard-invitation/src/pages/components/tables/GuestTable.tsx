import React from 'react';
import { Guest } from '@/types';
import GuestRow from './GuestRow';

interface GuestTableProps {
  guests: Guest[];
  onSendWhatsApp: (guest: Guest) => void;
  onCopyLink: (guest: Guest) => void;
}

const GuestTable: React.FC<GuestTableProps> = ({
  guests,
  onSendWhatsApp,
  onCopyLink,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-yellow-500 text-white">
            <th className="px-4 py-3 text-left font-medium">No</th>
            <th className="px-4 py-3 text-left font-medium">Nama Tamu</th>
            <th className="px-4 py-3 text-left font-medium">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest, index) => (
            <GuestRow
              key={guest.id}
              guest={guest}
              index={index}
              onSendWhatsApp={onSendWhatsApp}
              onCopyLink={onCopyLink}
            />
          ))}
          {guests.length === 0 && (
            <tr>
              <td colSpan={3} className="px-4 py-8 text-center text-gray-500">
                Belum ada tamu yang ditambahkan
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GuestTable;