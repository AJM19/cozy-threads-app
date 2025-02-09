import styled from "styled-components";
import Layout from "./Layout";
import { useGetProdcutsQuery } from "./queries/stripeAPI";
import Carousel from "./Carousel";
import { useEffect, useState } from "react";
import { MAIN_COLORS } from "./colors";
import ConfirmationPopup from "./ConfirmationPopup";
import useQuery from "./useQuery";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const { data: products, isLoading } = useGetProdcutsQuery();

  const [index, setIndex] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [isConfirmShowing, setConfirmShowing] = useState(false);

  const redirect_status = query.get("redirect_status");

  useEffect(() => {
    if (redirect_status === "succeeded") {
      setConfirmShowing(true);
    }
  }, [redirect_status]);

  const clearConfirmation = () => {
    navigate("/");
    setConfirmShowing(false);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!products) {
    return null;
  }

  return (
    <Layout>
      <div style={{ padding: "10px 0" }}>
        <Intro>
          <img src="./bonfire.jpg" />
          <div className="intro">
            <p>stay cozy.</p>
          </div>
        </Intro>
        <Banner>
          <BannerActions>
            <p>new items.</p>
            <div>
              <button
                disabled={index === 0}
                onClick={() => setIndex(index - 1)}
              >
                <img
                  style={{ transform: "rotateY(180deg)" }}
                  src="./arrow.png"
                />
              </button>

              <button
                disabled={index === 4}
                onClick={() => setIndex(index + 1)}
              >
                <img src="./arrow.png" />
              </button>
            </div>
          </BannerActions>
          <Carousel
            index={index}
            setIndex={setIndex}
            items={products}
            itemsPerPage={4}
          />
        </Banner>
        <BannerActions>
          <p>popular.</p>
          <div>
            <button
              disabled={index2 === 0}
              onClick={() => setIndex2(index2 - 1)}
            >
              <img style={{ transform: "rotateY(180deg)" }} src="./arrow.png" />
            </button>

            <button
              disabled={index2 === 4}
              onClick={() => setIndex2(index2 + 1)}
            >
              <img src="./arrow.png" />
            </button>
          </div>
        </BannerActions>
        <Banner>
          <Carousel
            index={index2}
            setIndex={setIndex2}
            items={[...products].reverse()}
            itemsPerPage={4}
          />
        </Banner>
      </div>
      <ConfirmationPopup
        $isOpen={isConfirmShowing}
        closeModal={clearConfirmation}
      />
    </Layout>
  );
};

export default Home;

const Banner = styled.div`
  background: white;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const BannerActions = styled.div`
  background: white;

  width: calc(100% - 10px);
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  padding: 0 10px;

  gap: 10px;

  img {
    height: 20px;
    width: 18px;
  }

  button {
    border: none;
    background: none;
    width: fit-content;
    height: fit-content;

    &:disabled {
      opacity: 0.5;
    }

    @media (max-width: 900px) {
      display: none;
    }
  }

  p {
    font-size: 18pt;
    font-weight: 600;

    color: ${MAIN_COLORS.yellow};
  }
`;

const Intro = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 5px;

  overflow: hidden;

  height: 200px;
  width: 100%;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
  }

  img {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .intro {
    position: relative;
    padding: 10px 5px;
    background: ${MAIN_COLORS.orange};

    @media (max-width: 900px) {
      height: 50px;
    }

    p {
      line-height: 100%;
      color: white;
      font-size: 20pt;
      position: absolute;
      bottom: 10px;
      right: 10px;
    }

    label {
      font-size: 12pt;
      color: black;
    }
  }
`;
