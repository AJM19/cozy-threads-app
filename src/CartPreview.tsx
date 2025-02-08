import Layout from "./Layout";
import { useSelector } from "react-redux";
import { cartSelectors } from "./slices/cart.slice";
import { useMemo } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Product } from "./Carousel";

const CartPreview = () => {
  const items = useSelector(cartSelectors.getCartItems);
  const navigate = useNavigate();

  const formattedItems: any[] = useMemo(() => {
    return Object.values(
      items.reduce(
        (acc: Record<string, { count: number; id: string }>, item: Product) => {
          const { id, ...rest } = item;

          acc[item.id] = {
            id: id,
            count: acc[id] ? acc[id].count + 1 : 1,
            ...rest,
          };

          return acc;
        },
        {},
      ),
    );
  }, []);

  const total: number = useMemo(() => {
    return items.reduce((acc: number, item: Product) => {
      acc += item.default_price.unit_amount;

      return acc;
    }, 0);
  }, []);

  console.log("ITEMS: ", formattedItems);
  console.log("total: ", total / 100);

  return (
    <Layout>
      <StyledContainer>
        <div>
          {formattedItems.map((item, index) => (
            <ItemTile key={index}>
              <img src={item.images[0]} />
              <div>
                <p>COUNT: {item.count}</p>
                <p>Price: {item.default_price.unit_amount / 100}</p>
              </div>
            </ItemTile>
          ))}
          {formattedItems.length < 1 && <p>No items added yet.</p>}
        </div>
        <PricingSection>
          <button onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </button>
        </PricingSection>
      </StyledContainer>
    </Layout>
  );
};

export default CartPreview;

const StyledContainer = styled.div`
  display: grid;
  grid-templater-rows: 3fr 1.5fr;
  gap: 5px;
  height: 100%;
`;

const ItemTile = styled.div`
  width: 100%;
  background: #f1efee;

  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  align-items: center;
  padding: 10px;

  img {
    height: 150px;
    width: 150px;
    object-fit: cover;
    object-position: top;
    border-radius: 50%;
  }
`;

const PricingSection = styled.div`
  height: 100%;
  border-radius: 10px;
  background: #f4eae6;
`;
