import { Button } from "@mui/material";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { URLMapping } from "@/lib/constants";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const CheckoutForm = () => {
  const [isReady, setIsReady] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    const res = await fetch(`${API_URL}/${URLMapping.campaigns}payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 2000 }), // $20.00
    });

    const { clientSecret } = await res.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setMessage(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      setMessage("Payment successful!");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 700, margin: "auto" }}>
      <PaymentElement
        onLoaderStart={() => {}}
        onReady={() => setIsReady(true)}
      />
      {isReady && (
        <Button
          variant="contained"
          sx={{ width: "100%", marginTop: "0.2em" }}
          onClick={handleSubmit}
          disabled={!stripe || loading}
        >
          {loading ? "Processing…" : "Pay $20"}
        </Button>
      )}
      {message && <p>{message}</p>}
    </form>
  );
};

export default CheckoutForm;
