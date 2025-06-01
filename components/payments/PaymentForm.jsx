import { Button } from "@mui/material";
import { useCheckout, PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutForm = () => {
  // const checkout = useCheckout();
  const [isReady, setIsReady] = useState(false);

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    const result = await checkout.confirm();

    if (result.type === "error") {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 700, margin: "auto" }}>
      <PaymentElement
        onLoaderStart={() => console.log("On load start")}
        onReady={() => setIsReady(true)}
      />
      {isReady && (
        <Button variant="contained" sx={{ width: "100%", marginTop: "0.2em" }}>
          Submit
        </Button>
      )}
    </form>
  );
};

export default CheckoutForm;
