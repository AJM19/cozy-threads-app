import { useDispatch } from "react-redux";
import styled from "styled-components";
import { cartActions } from "./slices/cart.slice";
import { useState } from "react";
import { MAIN_COLORS } from "./colors";

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

  const addToCart = (product: Product) => {
    dispatch(cartActions.addItemToCart({ item: product }));
  };

  const handleClick = (product: Product) => {
    addToCart(product);
    setShowAdded(product);
    setTimeout(() => setShowAdded(null), 1500);
  };

  console.log("ITEMS: ", items);

  return (
    <CarouselContainer>
      <CarouselWrapper
        style={{ transform: `translateX(-${index * (100 / itemsPerPage)}%)` }}
      >
        {items.map((item, i) => (
          <ProductTile key={i}>
            <img src={item.images[0]} />
            <div className="info">
              <label className="title"> {item.name}</label>
              <label className="price">
                {"$"}
                {item.default_price.unit_amount / 100}
              </label>
            </div>
            <AddButton
              isAdded={showAdded === item}
              onClick={() => handleClick(item)}
            >
              {showAdded === item ? <p>Added!</p> : <p>Add to Cart</p>}
            </AddButton>
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
`;

const CarouselWrapper = styled.div`
  display: flex;
  transition: transform 0.3s ease-in-out;
  width: 100%;
  height: 100%;
`;

const ProductTile = styled.div`
  display: flex;
  flex-direction: column;

  min-width: calc(25% - 20px);
  box-sizing: border-box;
  padding: 5px;
  text-align: center;
  border: 1px solid #ddd;
  margin: 0 10px;

  justify-content: space-between;

  height: 500px;

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

const AddButton = styled.button<{ isAdded: boolean }>`
  animation: fadeIn 0.5s ease-in forwards;
  transition:
    background-color 0.3s ease-in-out,
    opacity 0.3s ease-in-out;

  background-color: ${({ isAdded }) =>
    isAdded ? MAIN_COLORS.orange : "transparent"};

  p {
    color: ${({ isAdded }) => (isAdded ? "white" : "black")};
  }
`;
