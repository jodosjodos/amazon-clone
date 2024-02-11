import { FormEvent, useEffect, useState } from "react";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import { resetCart } from "../productSlice";
import { Button } from "@mui/material";
import axios from "axios";

const PaymentComponent = () => {
  const { cart } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (totalQty === 0 || paymentStatus !== "succeeded") return;
    dispatch(resetCart());
    // Optionally, navigate to a success page or display a modal
  }, [dispatch, totalQty, paymentStatus]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (totalQty === 0 || !stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    setIsProcessing(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API}/stripe`,
        { cart }
      );
      const { client_secret: clientSecret } = response.data;
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement! },
      });

      if (
        paymentResult.paymentIntent &&
        paymentResult.paymentIntent.status === "succeeded"
      ) {
        setPaymentStatus("Payment successful");
        // Here you can also navigate to a success page or update UI to reflect the payment success
      } else {
        setPaymentStatus("Payment failed");
      }
    } catch (error) {
      console.error(error);
      setPaymentStatus("Payment failed");
    }

    setIsProcessing(false);
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div style={{ fontSize: "20px", marginBottom: "24px" }}>
      <form id="payment-form" onSubmit={handleSubmit}>
        <label htmlFor="card-element">Place Order</label>
        <CardElement id="card-element" />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isProcessing}
          style={{ marginTop: "20px", width: "100%" }}
        >
          {isProcessing ? "Processing..." : "Pay"}
        </Button>
        {paymentStatus && (
          <div
            style={{
              marginTop: "20px",
              color: paymentStatus === "succeeded" ? "green" : "red",
            }}
          >
            Status: {paymentStatus}
          </div>
        )}
      </form>
    </div>
  );
};

export const PaymentGateway = () => {
  const stripePromise = loadStripe(
    "pk_test_51OiPsRJdLwLnpWUPY7k1nAGHjOgihpyGS3Hi1fDkhwXED4f1HUJBTMwcRAIDlrUfxVcoFCl7dQ3DV3kcO61eUcz300Dnqgc6By"
  );

  return (
    <Elements stripe={stripePromise}>
      <PaymentComponent />
    </Elements>
  );
};
