export const checkoutFormvalidators = {
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
    const monthNum = Number(month);
    if (monthNum < 1 || monthNum > 12) return "Invalid month";

    const currentYear = new Date().getFullYear() % 100;
    const yearNum = Number(year);
    if (yearNum < currentYear) return "Card has expired";
    return "";
  },
  cardCvc: (value: string) => {
    if (!value.trim()) return "CVC is required";
    if (!/^\d{3,4}$/.test(value)) return "CVC must be 3 or 4 digits";
    return "";
  },
};
