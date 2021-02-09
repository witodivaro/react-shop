import { Link } from "react-router-dom";
import styled from "styled-components";

export const PageNotFoundContainer = styled.div`
  width: 100%;
  height: 100%;
  height: 60vw;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const ImageContainer = styled.div`
  margin-top: 50px;
  display: block;
  height: 50%;
  width: 50%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: contain;
  background-image: url(${({ imageUrl }) => imageUrl});
`;

export const TitleContainer = styled.h1`
  margin: 0;
  color: #660a0a;
  text-align: center;
`;

export const TextContainer = styled.p`
  margin-bottom: 10px;

  text-align: center;
  width: 40%;
  font-size: 20px;
`;

export const LinkContainer = styled(Link)`
  text-decoration: underline;
  font-size: 18px;
`;
