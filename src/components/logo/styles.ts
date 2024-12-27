import styled from 'styled-components';

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  & img {
    width: 200px;
    height: auto;
  }

  &.big img {
    width: 384px;
    margin-bottom: 50px;
  }

  @media (max-width: 768px) {
    & img {
      width: 160px;
    } 

    &.big img {
      width: calc(100% - 10px);
    }
  }
`; 
