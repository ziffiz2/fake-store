import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { useCartStore } from "./useCartStore";

import type { ICheckoutForm, ICheckoutStore} from "@/types"

const initialFormData: ICheckoutForm = {
  name: "",
  email: "",
  address: "",
  cardNumber: "",
  cardName: "",
  cardExpiry: "",
  cardCvc: "",
};

const validators = {
  name: (value: string) => {
    if (!value.trim()) return "Name is required";
    return "";
  },
  email: (value: string) => {
    if (!value.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Invalid email format";
    return "";
  },
  address: (value: string) => {
    if (!value.trim()) return "Address is required";
    if (value.trim().length < 10) return "Please enter a complete address";
    return "";
  },
  cardNumber: (value: string) => {
    if (!value.trim()) return "Card number is required";
    const digits = value.replace(/\D/g, "");
    if (digits.length !== 16) return "Card number must be 16 digits";
    return "";
  },
  cardName: (value: string) => {
    if (!value.trim()) return "Card name is required";
    return "";
  },
  cardExpiry: (value: string) => {
    if (!value.trim()) return "Expiry date is required";
    const [month, year] = value.split("/");
    if (!month || !year || month.length !== 2 || year.length !== 2) {
      return "Please use MM/YY format";
    }
    const monthNum = parseInt(month);
    if (monthNum < 1 || monthNum > 12) return "Invalid month";

    const currentYear = new Date().getFullYear() % 100;
    const yearNum = parseInt(year);
    if (yearNum < currentYear) return "Card has expired";
    return "";
  },
  cardCvc: (value: string) => {
    if (!value.trim()) return "CVC is required";
    if (!/^\d{3,4}$/.test(value)) return "CVC must be 3 or 4 digits";
    return "";
  },
};

export const useCheckoutStore = create<ICheckoutStore>()(
  devtools(
    (set, get) => ({
      formData: initialFormData,
      errors: {},
      isValid: false,
      isCheckoutOverlayOn: false,
      openOverlay: (field) => set((state) => ({ ...state, [field]: true })),
      closeOverlay: (field) => {
        set((state) => ({ ...state, [field]: false }));
        if (field === "isCheckoutOverlayOn") {
          get().resetForm();
        }
      },
      updateField: (field, value) =>
        set((state) => ({
          ...state,
          formData: {
            ...state.formData,
            [field]: value,
          },
        })),

      validateField: (field) =>
        set((state) => {
          const error = validators[field](state.formData[field]);
          const newErrors = {
            ...state.errors,
            [field]: error,
          };

          // Make sure all fields are filled and error free
          const isValid =
            Object.values(newErrors).every((error) => !error) &&
            Object.values(state.formData).every((value) => value.trim() !== "");

          return {
            ...state,
            errors: newErrors,
            isValid,
          };
        }),
      clearErrors: () => {
        set((state) => ({
          ...state,
          errors: {},
        }));
      },
      resetForm: () => {
        set((state) => ({
          ...state,
          errors: {},
          formData: initialFormData,
          isValid: false,
        }));
      },
      confirmOrder: () => {
        const actions = get();
        const cartActions = useCartStore.getState();

        actions.closeOverlay("isCheckoutOverlayOn");
        actions.openOverlay("isConfirmOverlayOn");
        cartActions.clearCart();

        set((state) => ({
          ...state,
        }));
      },
    }),
    {
      name: "Checkout Store",
      enabled: process.env.NODE_ENV === "development",
    }
  )
);
