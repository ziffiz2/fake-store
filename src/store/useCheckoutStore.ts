import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { useCartStore } from "./useCartStore";
import { checkoutFormvalidators } from "@/lib/validators";
import {
  CheckoutOverlayType,
  type ICheckoutForm,
  type ICheckoutStore,
} from "@/types";

const initialFormData: ICheckoutForm = {
  name: "",
  email: "",
  address: "",
  cardNumber: "",
  cardName: "",
  cardExpiry: "",
  cardCvc: "",
};

export const useCheckoutStore = create<ICheckoutStore>()(
  devtools(
    (set, get) => ({
      formData: initialFormData,
      errors: {},
      isValid: false,
      isCheckoutOverlayOn: false,
      isLoading: false,
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
          const error = checkoutFormvalidators[field](state.formData[field]);
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

        set({ isLoading: true });

        actions.closeOverlay(CheckoutOverlayType.CHECKOUT);
        actions.openOverlay(CheckoutOverlayType.CONFIRM);
        cartActions.clearCart();

        set((state) => ({
          ...state,
          isLoading: false,
        }));
      },
    }),
    {
      name: "Checkout Store",
      enabled: process.env.NODE_ENV === "development",
    }
  )
);
