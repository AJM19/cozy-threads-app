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
    return (
      <p>
        Please wait for API server to boot up. This process can take up to 1
        minute so please sit tight.
      </p>
    );
  }

  if (!products) {
    return null;
  }

  return (
    <Layout>
      <div style={{ padding: "10px 0" }}>
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

              <button onClick={() => setIndex(index + 1)}>
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

            <button onClick={() => setIndex2(index2 + 1)}>
              <img src="./arrow.png" />
            </button>
          </div>
        </BannerActions>
        <Banner>
          <Carousel
            index={index2}
            setIndex={setIndex2}
            items={products}
            itemsPerPage={4}
          />
        </Banner>
      </div>
      <ConfirmationPopup
        isOpen={isConfirmShowing}
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
  }

  p {
    font-size: 18pt;
    font-weight: 600;

    color: ${MAIN_COLORS.yellow};
  }
`;
