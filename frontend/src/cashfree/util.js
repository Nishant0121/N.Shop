import { load } from "@cashfreepayments/cashfree-js";

let cashfreeInstance = null;

export const initializeCashfree = async () => {
  if (!cashfreeInstance) {
    cashfreeInstance = await load({
      mode: "sandbox", // or "production"
    });
  }
  return cashfreeInstance;
};
