export enum CheckoutOverlayType {
  CHECKOUT = "isCheckoutOverlayOn",
  CONFIRM = "isConfirmOverlayOn",
}

export interface ICheckoutForm {
  name: string;
  email: string;
  address: string;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvc: string;
}

export interface IValidationErrors {
  name?: string;
  email?: string;
  address?: string;
  cardNumber?: string;
  cardName?: string;
  cardExpiry?: string;
  cardCvc?: string;
}

export interface ICheckoutStore {
  formData: ICheckoutForm;
  errors: IValidationErrors;
  isValid: boolean;
  isCheckoutOverlayOn: boolean;
  isConfirmOverlayOn: boolean;
  isLoading: boolean;
  updateField: (field: keyof ICheckoutForm, value: string) => void;
  validateField: (field: keyof ICheckoutForm) => void;
  clearErrors: () => void;
  resetForm: () => void;
  openOverlay: (field: CheckoutOverlayType) => void;
  closeOverlay: (field: CheckoutOverlayType) => void;
  confirmOrder: () => void;
}
