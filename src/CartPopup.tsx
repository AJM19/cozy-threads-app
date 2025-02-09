import {
  ComponentPropsWithoutRef,
  memo,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { cartSelectors } from "./slices/cart.slice";
import { useSelector } from "react-redux";
import { Product } from "./Carousel";
import { MAIN_COLORS } from "./colors";

type Props = ComponentPropsWithoutRef<"div"> & {
  isOpen: boolean;
  closePopup: () => void;
};

const CartPopup = ({ isOpen, closePopup, ...props }: Props) => {
  const rootDiv = document.getElementById("root");
  const popupRef = useRef<HTMLDivElement>(null);

  const items = useSelector(cartSelectors.getCartItems);
  const navigate = useNavigate();

  const formattedItems: (Product & { count: number })[] = useMemo(() => {
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
  }, [items]);

  const total: number = useMemo(() => {
    return items.reduce((acc: number, item: Product) => {
      acc += item.default_price.unit_amount;

      return acc;
    }, 0);
  }, [items]);

  useEffect(() => {
    if (rootDiv) {
      rootDiv.style.pointerEvents = isOpen ? "none" : "";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        closePopup && closePopup();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePopup && closePopup();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closePopup]);

  return createPortal(
    <StyledContainer ref={popupRef} isOpen={isOpen} {...props}>
      <CartContainer>
        <div style={{ height: "100%", overflow: "hidden auto" }}>
          {formattedItems.map((item, index) => (
            <ItemTile key={index}>
              <img src={item.images[0]} />
              <div style={{ height: "100%" }}>
                <p style={{ color: MAIN_COLORS.orange }}>
                  <b>{item.name}</b>
                </p>
                <p style={{ color: MAIN_COLORS.yellow }}>
                  ${item.default_price.unit_amount / 100}
                </p>
                <p>Quantity: {item.count}</p>
              </div>
            </ItemTile>
          ))}
          {formattedItems.length < 1 && <p>No items added yet.</p>}
        </div>
        <PricingSection>
          <div className="subtotal">
            <p>Subtotal</p>
            <p>${total / 100}</p>
          </div>
          <button
            disabled={items.length < 1}
            onClick={() => navigate("/checkout")}
          >
            checkout
          </button>
        </PricingSection>
      </CartContainer>
    </StyledContainer>,
    document.body,
  );
};

const StyledContainer = styled.div<{ isOpen: boolean }>`
  width: 500px;
  height: 100%;
  position: fixed;
  right: ${({ isOpen }) => (isOpen ? "0" : "-200%")};
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.3);
  background: #ffffff;
  box-shadow: 0px -2px 2px rgba(0, 0, 0, 0.2);
  border-radius: 5px 0 0 5px;
  box-sizing: border-box;
  padding: 10px;
  z-index: 500;
  transition: right 0.5s ease;

  @media (max-width: 900px) {
    width: 75%;
  }
`;

const CartContainer = styled.div`
  display: grid;
  grid-template-rows: 3fr 1.5fr;
  gap: 5px;
  height: 100%;
`;

const ItemTile = styled.div`
  width: 100%;
  background: white;
  color: black;

  border-bottom: 1px solid #f1ebe9;

  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  align-items: center;
  gap: 10px;
  padding: 10px;

  img {
    height: 150px;
    width: 150px;
    object-fit: cover;
    object-position: top;
  }
`;

const PricingSection = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  border-top: 1px solid #f1ebe9;

  button {
    background: ${MAIN_COLORS.orange};
    color: white;

    &:hover {
      background: white;
      color: ${MAIN_COLORS.orange};
    }

    &:disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  .subtotal {
    display: inline-flex;
    justify-content: space-between;
    width: 100%;
  }
`;

export default memo(CartPopup);
