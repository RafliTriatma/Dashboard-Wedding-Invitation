export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};

export const generateInvitationLink = (guestId: number, guestName: string) => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const encodedName = encodeURIComponent(guestName);
  return `${baseUrl}/invitation?guest=${guestId}&name=${encodedName}`;
};