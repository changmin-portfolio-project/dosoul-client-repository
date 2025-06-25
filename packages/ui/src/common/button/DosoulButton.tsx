import React from 'react';
import styled from 'styled-components';

interface DosoulButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

const StyledButton = styled.button<{ variant: string }>`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background-color: ${props => props.variant === 'primary' ? '#007bff' : '#6c757d'};
  color: white;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

export const DosoulButton: React.FC<DosoulButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary' 
}) => {
  return (
    <StyledButton variant={variant} onClick={onClick}>
      {children}
    </StyledButton>
  );
};
