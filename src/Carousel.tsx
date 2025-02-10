import { useDispatch } from "react-redux";
import styled from "styled-components";
import { cartActions } from "./slices/cart.slice";
import { useState } from "react";
import { MAIN_COLORS } from "./colors";
import { ANIMATIONS } from "./animation";

export type Product = {
  id: string;
  name: string;
  images: string[];
  default_price: {
    unit_amount: 8500;
  };
  description: string;
};

type Props = {
  index: number;
  setIndex: (x: number) => void;
  itemsPerPage: number;
  items: Product[];
};

const Carousel = ({ index, itemsPerPage, items }: Props) => {
  const dispatch = useDispatch();
  const [showAdded, setShowAdded] = useState<Product | null>();
  const [hovering, setHovering] = useState(Array.from(items, () => false));

  const addToCart = (product: Product) => {
    dispatch(cartActions.addItemToCart({ item: product }));
  };

  const handleClick = (product: Product) => {
    addToCart(product);
    setShowAdded(product);
    setTimeout(() => setShowAdded(null), 1500);
  };

  return (
    <CarouselContainer>
      <CarouselWrapper
        style={{ transform: `translateX(-${index * (100 / itemsPerPage)}%)` }}
      >
        {items.map((item, i) => (
          <ProductTile
            onMouseLeave={() =>
              setHovering((prev) =>
                prev.map((val, index) => (index === i ? false : val)),
              )
            }
            onMouseEnter={() =>
              setHovering((prev) =>
                prev.map((val, index) => (index === i ? true : val)),
              )
            }
            key={i}
          >
            <img src={item.images[0]} />
            <div className="info">
              <label className="title"> {item.name}</label>
              <label className="price">
                {"$"}
                {item.default_price.unit_amount / 100}
              </label>
            </div>
            <AddButton
              $isAdded={showAdded === item}
              onClick={() => handleClick(item)}
            >
              {showAdded === item ? <p>Added!</p> : <p>Add to Cart</p>}
            </AddButton>
            <DecriptionSlide $isShowing={hovering[i]}>
              <p>{item.description}</p>
            </DecriptionSlide>
          </ProductTile>
        ))}
      </CarouselWrapper>
    </CarouselContainer>
  );
};

export default Carousel;

const CarouselContainer = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;

  @media (max-width: 900px) {
    overflow: auto;
  }
`;

const CarouselWrapper = styled.div`
  display: flex;
  transition: transform 0.3s ease-in-out;
  width: 100%;
  height: 100%;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const ProductTile = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  position: relative;

  min-width: calc(25% - 20px);
  box-sizing: border-box;
  padding: 5px;
  text-align: center;
  border: 1px solid #ddd;
  margin: 0 10px;
  justify-content: space-between;
  height: 500px;

  ${ANIMATIONS.fadeIn};

  img {
    height: 400px;
    object-fit: cover;
    object-position: top;
  }

  .title {
    text-align: start;
    font-size: 12pt;

    font-weight: bold;
    color: black;
  }

  .price {
    font-size: 10pt;
  }

  .description {
    font-size: 8pt;
  }

  .price {
    font-size: 12pt;
  }

  .info {
    display: inline-flex;
    justify-content: space-between;
  }
`;

const AddButton = styled.button<{ $isAdded: boolean }>`
  animation: fadeIn 0.5s ease-in forwards;
  transition:
    background-color 0.3s ease-in-out,
    opacity 0.3s ease-in-out;

  background: ${({ $isAdded }) => ($isAdded ? "white" : MAIN_COLORS.orange)};
  border: ${({ $isAdded }) =>
    $isAdded ? `1px solid ${MAIN_COLORS.orange}` : "none"};

  p {
    color: ${({ $isAdded }) => ($isAdded ? MAIN_COLORS.orange : "white")};
  }
`;

const DecriptionSlide = styled.div<{ $isShowing: boolean }>`
  position: absolute;
  width: calc(100% - 10px);
  height: ${({ $isShowing }) => ($isShowing ? "calc(100% - 90px)" : "0")};
  background: white;

  p {
    color: ${MAIN_COLORS.orange};
    font-weight: 600;
    text-align: center;

    height: ${({ $isShowing }) => ($isShowing ? "100%" : "0")};
    overflow: clip;
  }

  animation: fadeIn 0.5s ease-in forwards;
  transition: height 0.5s ease-in-out;

  opacity: 0.75 !important;
`;
