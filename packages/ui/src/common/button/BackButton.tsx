import React from 'react';
import styled from 'styled-components';

const StyledBackButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 8px;
  
  &:hover {
    opacity: 0.7;
  }
`;

interface BackButtonProps {
  onClick: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <StyledBackButton onClick={onClick}>
      ← 뒤로가기
    </StyledBackButton>
  );
};
