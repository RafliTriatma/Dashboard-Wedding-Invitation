import React, { useState, useCallback } from 'react';
import { InvitationForm, Guest } from '@/types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import GuestNameForm from '../forms/GuestNameForm';
import InvitationTextForm from '../forms/InvitationTextForm';
import GuestTable from '../tables/GuestTable';
import { useGuests } from '@/hooks/useGuest';
import { sendWhatsAppMessage, generateInvitationMessage } from '@/utils/whatsapp';
import { copyToClipboard, generateInvitationLink } from '@/utils/clipboard';

const InvitationDashboard: React.FC = () => {
  const { guests, addGuest, updateGuestStatus } = useGuests();
  
  const [formData, setFormData] = useState<InvitationForm>({
    guestName: '',
    selectedType: 'to',
    invitationText: '',
    textStyle: 'Muslim',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormChange = useCallback((field: keyof InvitationForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleAddGuest = useCallback(async () => {
    if (!formData.guestName.trim()) {
      alert('Silakan masukkan nama tamu');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Split guest names by email symbol (✉) if multiple names
      const guestNames = formData.guestName.split('⏎').map(name => name.trim()).filter(Boolean);
      
      for (const name of guestNames) {
        addGuest(name);
      }
      
      // Reset form
      setFormData(prev => ({
        ...prev,
        guestName: ''
      }));
      
      alert(`Berhasil menambahkan ${guestNames.length} tamu`);
    } catch (error) {
      console.error('Error adding guests:', error);
      alert('Terjadi kesalahan saat menambahkan tamu');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData.guestName, addGuest]);

  const handleSendWhatsApp = useCallback(async (guest: Guest) => {
    try {
      updateGuestStatus(guest.id, 'sent');
      
      const invitationLink = generateInvitationLink(guest.id, guest.name);
      const message = generateInvitationMessage(
        guest.name,
        formData.invitationText || getDefaultInvitationText(formData.textStyle),
        invitationLink
      );

      // In a real app, you'd get the phone number from guest data
      // For demo purposes, we'll show the message
      alert(`WhatsApp message for ${guest.name}:\n\n${message}`);
      
      // Uncomment this line to actually send via WhatsApp
      // sendWhatsAppMessage('', message);
      
    } catch (error) {
      console.error('Error sending WhatsApp:', error);
      alert('Terjadi kesalahan saat mengirim WhatsApp');
    }
  }, [formData.invitationText, formData.textStyle, updateGuestStatus]);

  const handleCopyLink = useCallback(async (guest: Guest) => {
    try {
      const invitationLink = generateInvitationLink(guest.id, guest.name);
      const success = await copyToClipboard(invitationLink);
      
      if (success) {
        alert(`Link undangan untuk ${guest.name} berhasil disalin!`);
      } else {
        alert('Gagal menyalin link');
      }
    } catch (error) {
      console.error('Error copying link:', error);
      alert('Terjadi kesalahan saat menyalin link');
    }
  }, []);

  const getDefaultInvitationText = (style: InvitationForm['textStyle']): string => {
    const templates = {
      'Formal': 'Dengan hormat, Anda diundang untuk menghadiri acara kami. Silakan klik link berikut: [link-undangan]',
      'Muslim': 'Assalamualaikum, dengan penuh rasa syukur, kami mengundang Anda untuk menghadiri acara kami. Barakallahu fiikum. Link undangan: [link-undangan]',
      'Nasrani': 'Salam kasih dalam Kristus, dengan sukacita kami mengundang Anda untuk menghadiri acara kami. Tuhan memberkati. Link undangan: [link-undangan]'
    };
    
    return templates[style];
  };

  return (
    <div className="space-y-6">
      {/* Main Invitation Form */}
      <Card title="SEND YOUR INVITATION">
        <div className="space-y-6">
          <GuestNameForm
            formData={formData}
            onChange={handleFormChange}
          />
          
          <InvitationTextForm
            formData={formData}
            onChange={handleFormChange}
          />

          <Button
            variant="success"
            size="lg"
            onClick={handleAddGuest}
            loading={isSubmitting}
            className="w-full"
          >
            Buat Daftar Tamu Undangan
          </Button>
        </div>
      </Card>

      {/* Guest List */}
      <Card title="Daftar Nama Tamu :">
        <GuestTable
          guests={guests}
          onSendWhatsApp={handleSendWhatsApp}
          onCopyLink={handleCopyLink}
        />
      </Card>
    </div>
  );
};

export default InvitationDashboard;