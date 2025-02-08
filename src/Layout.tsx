import { ComponentPropsWithoutRef, useState } from "react";
import styled from "styled-components";
import { MAIN_COLORS } from "./colors";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { cartSelectors } from "./slices/cart.slice";
import CartPopup from "./CartPopup";

type Props = ComponentPropsWithoutRef<"div">;

const Layout = ({ children }: Props) => {
  const navigate = useNavigate();
  const items = useSelector(cartSelectors.getCartItems);
  const [isCartShowing, setCartShowing] = useState(false);

  return (
    <Container>
      <Promo>free shipping on orders over $150</Promo>
      <Header>
        <Icon onClick={() => navigate("/")} src="./logo.png" />
        <Title>cozy threads</Title>
        <div style={{ position: "relative" }}>
          <Bubble>
            <p>{items.length}</p>
          </Bubble>
          <Icon
            onClick={() => setCartShowing(true)}
            src="src/assets/shopping-cart.png"
          />
        </div>
      </Header>
      <div className="content">{children}</div>
      <CartPopup
        isOpen={isCartShowing}
        closePopup={() => setCartShowing(false)}
      />
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  width: 100vw;
  height: 100%;
  position: fixed;
  overflow: auto;

  .content {
    padding: 10px;
    height: calc(100% - 70px);
  }
`;

const Header = styled.header`
  height: 50px;
  width: calc(100% - 20px);
  background: white;

  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #f1ebe9;
`;

const Icon = styled.img`
  height: 30px;
  width: 30px;
  cursor: pointer;

  &:hover {
    scale: 1.1;
  }
`;

export const Title = styled.p`
  font-size: 24pt;
  font-weight: bold;
  color: ${MAIN_COLORS.orange};

  letter-spacing: -2px;
}
`;

const Bubble = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: ${MAIN_COLORS.yellow};

  position: absolute;
  top: -5px;
  right: -5px;

  display: flex;
  align-items: center;
  justify-content: center;

  p {
    color: white;
    font-size: 8pt;
  }
`;

const Promo = styled.div`
  height: 20px;
  background: ${MAIN_COLORS.orange};
  width: 100%;

  color: white;

  text-align: center;
  padding: 2px 0;
  font-size: 10pt;
`;
