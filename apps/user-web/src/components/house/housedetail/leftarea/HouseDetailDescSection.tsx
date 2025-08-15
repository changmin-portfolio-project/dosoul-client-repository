import theme from "@dosoul/styles";
import React from "react";
import styled from "styled-components";

interface HouseDetailDescSectionProps {
  text: string;
}

export const HouseDetailDescSection: React.FC<HouseDetailDescSectionProps> = ({
  text,
}) => {
  return (
    <IntroductionContainer>
      <IntroductionText>{text}</IntroductionText>
    </IntroductionContainer>
  );
};

const IntroductionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const IntroductionText = styled.p`
  color: black;
  font: ${theme.fontSizes.Body2};
  white-space: pre-wrap;
  margin: 0;
`;
