import { CheckoutProvider, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE;
const stripeTestPromise = loadStripe(PUBLIC_KEY || "");

const appearance = {
  theme: "stripe",
  variables: {
    colorPrimary: "#0570de",
    colorBackground: "#ffffff",
    colorText: "#30313d",
    colorDanger: "#df1b41",
    fontFamily: "Ideal Sans, system-ui, sans-serif",
    spacingUnit: "5px",
    borderRadius: "4px",
  },
};

const StripeContainer = () => {
  const options = {
    appearance,
    mode: "setup",
    currency: "inr",
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Elements stripe={stripeTestPromise} options={options}>
        <PaymentForm />
      </Elements>
    </div>
  );
};

export default StripeContainer;
