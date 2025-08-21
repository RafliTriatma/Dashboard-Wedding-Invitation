export const sendWhatsAppMessage = (phoneNumber: string, message: string) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};

export const generateInvitationMessage = (
  guestName: string, 
  invitationText: string, 
  invitationLink: string
) => {
  return invitationText
    .replace('[nama-tamu]', guestName)
    .replace('[link-undangan]', invitationLink);
};
