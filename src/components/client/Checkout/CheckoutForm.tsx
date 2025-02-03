"use client";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import useStore from "@/hooks/useStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ICheckoutStore } from "@/types";

export default function CheckoutOverlay() {
  const checkoutStore = useStore<ICheckoutStore, ICheckoutStore>(
    useCheckoutStore,
    (state) => state
  );

  if (!checkoutStore) return <></>;

  const { formData, errors, updateField, validateField } = checkoutStore;

  const handleBlur = (field: keyof typeof formData) => {
    validateField(field);
  };

  return (
    <>
      <div className="space-y-4 mb-6">
        <h2 className="text-lg font-semibold">Shipping Information</h2>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            onBlur={() => handleBlur("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            className="px-2"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            onBlur={() => handleBlur("name")}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => updateField("address", e.target.value)}
            onBlur={() => handleBlur("address")}
          />
          {errors.address && (
            <p className="text-sm text-red-500">{errors.address}</p>
          )}
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Payment</h2>
        <div className="space-y-2">
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input
            id="cardNumber"
            value={formData.cardNumber}
            onChange={(e) =>
              updateField(
                "cardNumber",
                e.target.value.replace(/\D/g, "").slice(0, 16)
              )
            }
            onBlur={() => handleBlur("cardNumber")}
            maxLength={16}
          />
          {errors.cardNumber && (
            <p className="text-sm text-red-500">{errors.cardNumber}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cardName">Card Name</Label>
          <Input
            id="cardName"
            value={formData.cardName}
            onChange={(e) => updateField("cardName", e.target.value)}
            onBlur={() => handleBlur("cardName")}
          />
          {errors.cardName && (
            <p className="text-sm text-red-500">{errors.cardName}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cardExpiry">Expiry Date</Label>
            <Input
              id="cardExpiry"
              placeholder="MM/YY"
              value={formData.cardExpiry}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 4) {
                  const formatted =
                    value.length > 2
                      ? value.slice(0, 2) + "/" + value.slice(2)
                      : value;
                  updateField("cardExpiry", formatted);
                }
              }}
              onBlur={() => handleBlur("cardExpiry")}
              maxLength={5}
            />
            {errors.cardExpiry && (
              <p className="text-sm text-red-500">{errors.cardExpiry}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardCvc">CVC</Label>
            <Input
              id="cardCvc"
              value={formData.cardCvc}
              onChange={(e) =>
                updateField(
                  "cardCvc",
                  e.target.value.replace(/\D/g, "").slice(0, 4)
                )
              }
              onBlur={() => handleBlur("cardCvc")}
              maxLength={4}
            />
            {errors.cardCvc && (
              <p className="text-sm text-red-500">{errors.cardCvc}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
