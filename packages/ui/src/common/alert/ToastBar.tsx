import React from 'react';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #333;
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  animation: ${slideIn} 0.3s ease-out;
  z-index: 1000;
`;

interface ToastBarProps {
  message: string;
  type?: 'success' | 'error' | 'info';
}

export const ToastBar: React.FC<ToastBarProps> = ({ message, type = 'info' }) => {
  return (
    <ToastContainer>
      {message}
    </ToastContainer>
  );
};
