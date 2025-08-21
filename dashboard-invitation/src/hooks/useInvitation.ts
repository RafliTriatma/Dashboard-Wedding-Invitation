import { useState, useCallback } from 'react';
import { InvitationForm } from '@/types';

interface UseInvitationReturn {
  formData: InvitationForm;
  updateField: (field: keyof InvitationForm, value: string) => void;
  resetForm: () => void;
  validateForm: () => { isValid: boolean; errors: Partial<InvitationForm> };
}

const initialFormData: InvitationForm = {
  guestName: '',
  selectedType: 'to',
  invitationText: '',
  textStyle: 'Muslim',
};

export const useInvitation = (): UseInvitationReturn => {
  const [formData, setFormData] = useState<InvitationForm>(initialFormData);

  const updateField = useCallback((field: keyof InvitationForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
  }, []);

  const validateForm = useCallback((): { isValid: boolean; errors: Partial<InvitationForm> } => {
    const errors: Partial<InvitationForm> = {};

    if (!formData.guestName.trim()) {
      errors.guestName = 'Nama tamu wajib diisi';
    }

    if (!formData.invitationText.trim()) {
      errors.invitationText = 'Text pengantar wajib diisi';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }, [formData]);

  return {
    formData,
    updateField,
    resetForm,
    validateForm,
  };
};