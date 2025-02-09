import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCreatePaymentIntentQuery } from "./queries/stripeAPI";
import PaymentElementForm from "./PaymentElementForm";
import Layout from "./Layout";
import { useSelector } from "react-redux";
import { cartSelectors } from "./slices/cart.slice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";

const Checkout = () => {
  const stripePromise = loadStripe(
    "pk_test_51QqGSSR2DNe9874Hk2drEa18aS3G3CKFrOVKDTJW0IfAMA3T4rHmhn3dTNNYnUmW2IFIuPk5GUK9QrL8LzJWdEo800yZxHBxdX",
  );
  const items = useSelector(cartSelectors.getCartItems);
  const navigate = useNavigate();

  const { data } = useCreatePaymentIntentQuery(
    { items },
    { skip: !items || items.length < 1 },
  );

  useEffect(() => {
    if (items.length < 1) {
      navigate("/");
    }
  }, []);

  if (!data) {
    return null;
  }

  const { client_secret, amount } = data;

  const options = {
    clientSecret: client_secret as string,
  };

  return (
    <Layout>
      <div style={{ width: "100%" }}>
        <Logo src="./logo.png" />
        <p style={{ padding: "10px 20px", fontSize: "18pt" }}>
          amount: <b>${amount}</b>
        </p>
        <Elements options={options} stripe={stripePromise}>
          <PaymentElementForm />
        </Elements>
      </div>
    </Layout>
  );
};

export default Checkout;

const Logo = styled.img`
  height: 150px;
  width: 150px;
  object-fit: cover;
  object-position: top;

  display: block;
  justify-self: anchor-center;
`;
