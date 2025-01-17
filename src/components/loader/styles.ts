import styled, { keyframes } from 'styled-components';

const bouncing = keyframes`
  0% {
    transform: translateY(0px);
  }

  100% {
    transform: translateY(20px);
  }
`;

export const LoaderContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 20px 140px;

  &.loader-enter {
    opacity: 0;
  }

  &.loader-enter-active {
    opacity: 1;
    transition: opacity var(--loader-transition);
  }

  &.loader-exit {
    opacity: 1;
  }

  &.loader-exit-active {
    opacity: 0;
    transition: opacity var(--loader-transition);
  }
  
  & img {
    position: absolute;
    animation: ${bouncing} 1s cubic-bezier(0.28, 1.21, 0.35, 1.2) infinite alternate;
  }

  & img:nth-child(5) {
    animation-delay: 0.2s;
  }

  & img:nth-child(4) {
    animation-delay: 0.4s;
  }

  & img:nth-child(3) {
    animation-delay: 0.6s;
  }

  & img:nth-child(2) {
    animation-delay: 0.8s;
  }

  & img:nth-child(1) {
    animation-delay: 1s;
  }
`; 
