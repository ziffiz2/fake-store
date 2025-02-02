"use client";
import { ICheckoutStore, useCheckoutStore } from "@/store/useCheckoutStore";
import useStore from "@/store/useStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CheckoutOverlay() {
  const checkoutStore = useStore<ICheckoutStore, ICheckoutStore>(
    useCheckoutStore,
    (state: any) => state
  );

  if (!checkoutStore) return <></>;

  const { formData, errors, updateField, validateField } = checkoutStore;

  const handleBlur = (field: keyof typeof formData) => {
    validateField(field);
  };

  return (
    <div className="space-y-4 mb-6">
      <h2 className="text-lg font-semibold">Shipping Information</h2>
      <div className="space-y-2 px-1">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          className="px-2"
          value={formData.name}
          onChange={(e) => updateField("name", e.target.value)}
          onBlur={() => handleBlur("name")}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>
    </div>
  );
}
