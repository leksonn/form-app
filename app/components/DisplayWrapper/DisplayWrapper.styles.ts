import { styled } from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  max-width: 600px;
  margin: 0 auto;
  margin-top: 4rem;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #00b67e;
  margin-bottom: 0.5rem;
`;

export const Description = styled.p`
  color: darkslategray;
  margin-bottom: 1.5rem;
`;

export const DataList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const DataItem = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
  padding-bottom: 0.5rem;
`;

export const Label = styled.span`
  font-weight: 500;
  color: black;
  text-transform: capitalize;
`;

export const Value = styled.span`
  color: darkslategray;
  text-align: right;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;
