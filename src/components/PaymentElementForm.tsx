import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import styled from "styled-components";
import { MAIN_COLORS } from "../colors";

const PaymentElementForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin,
      },
    });
    setIsProcessing(false);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={isProcessing || !stripe}>
        {isProcessing ? "processing..." : "pay now"}
      </button>
    </StyledForm>
  );
};

export default PaymentElementForm;

const StyledForm = styled.form`
  padding: 0 20px;

  button {
    display: block;
    justify-self: center;
    margin: 10px 0;

    background: ${MAIN_COLORS.orange};
    color: white;

    &:hover {
      background: white;
      color: ${MAIN_COLORS.orange};
    }
  }
`;
