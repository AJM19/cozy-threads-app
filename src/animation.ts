export const ANIMATIONS = {
  fadeIn: `
      @keyframes fadeIn {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
  
      animation: fadeIn 1.5s ease-out;   
  `,
  topDownReveal: `
  @keyframes revealTopDown {
    0% {
      clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
    }
    100% {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
  }

  animation: revealTopDown .75s ease-out;   

`,
  sideReveal: `
@keyframes reveal {
  0% {
    clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
  }
  100% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
}

    animation: reveal 0.5s ease-out;   
`,
};
