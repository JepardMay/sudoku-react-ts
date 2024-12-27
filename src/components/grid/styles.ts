import styled from 'styled-components';

export const GridSection = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 20px;

  @media (max-width: 768px) {
    display: block;
    padding: 20px 5px;
  }
`;
