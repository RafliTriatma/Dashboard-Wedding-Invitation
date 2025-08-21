export interface Guest {
  id: number;
  name: string;
  createdAt: Date;
  status?: 'pending' | 'sent' | 'delivered' | 'read';
}

export interface InvitationText {
  type: 'Formal' | 'Muslim' | 'Nasrani';
  content: string;
}

export interface InvitationForm {
  guestName: string;
  selectedType: 'to' | 'untuk' | 'kepada';
  invitationText: string;
  textStyle: 'Formal' | 'Muslim' | 'Nasrani';
}

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';