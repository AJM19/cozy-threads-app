import { ComponentPropsWithoutRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { MAIN_COLORS } from "./colors";

type Props = ComponentPropsWithoutRef<"div"> & {
  isOpen: boolean;
  width?: any;
  closeModal: () => void;
  height?: any;
};

const ConfirmationPopup = ({ isOpen, closeModal, ...props }: Props) => {
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <StyledContainer onClick={closeModal} {...props}>
      <StyledWindow {...props} onClick={(event) => event.stopPropagation()}>
        <StyledHeader>
          <p>order processed</p>
        </StyledHeader>
        <StyledContent>
          <p>
            Thanks for choosing{" "}
            <b style={{ color: MAIN_COLORS.orange }}>cozy threads</b>. Shop
            again soon!
          </p>
        </StyledContent>
      </StyledWindow>
    </StyledContainer>,
    document.body,
  );
};

export default ConfirmationPopup;

const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 100;
`;

const StyledWindow = styled.div<{ width?: number; height?: string }>`
  width: 50%;
  background: white;
  box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: auto;
  overflow-y: auto;
`;

const StyledHeader = styled.div`
  background: ${MAIN_COLORS.orange};

  box-sizing: border-box;
  padding: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  p {
    color: white;
    text-align: center;
    font-size: 20pt;
  }
`;

const StyledContent = styled.div`
  box-sizing: border-box;
  padding: 20px 10px;

  display: flex;
  flex-direction: column;

  p {
    text-align: center;
    color: black;
    font-size: 16pt;
  }
`;
