import React from "react";
import styled from "styled-components";

// 사용자 아이콘
export const UsersIcon: React.FC = () => (
  <IconWrapper>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M16 4C16 6.21 14.21 8 12 8C9.79 8 8 6.21 8 4C8 1.79 9.79 0 12 0C14.21 0 16 1.79 16 4ZM4 20V16C4 13.79 5.79 12 8 12H16C18.21 12 20 13.79 20 16V20H4Z"
        fill="currentColor"
      />
    </svg>
  </IconWrapper>
);

// 집 아이콘
export const HomeIcon: React.FC = () => (
  <IconWrapper>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z"
        fill="currentColor"
      />
    </svg>
  </IconWrapper>
);

// 문서 아이콘
export const DocumentIcon: React.FC = () => (
  <IconWrapper>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z"
        fill="currentColor"
      />
    </svg>
  </IconWrapper>
);

// 차트 아이콘
export const ChartIcon: React.FC = () => (
  <IconWrapper>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 13H7V23H3V13ZM10 9H14V23H10V9ZM17 5H21V23H17V5Z"
        fill="currentColor"
      />
    </svg>
  </IconWrapper>
);

// 위쪽 화살표 아이콘
export const ArrowUpIcon: React.FC = () => (
  <IconWrapper>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M7.41 15.41L12 10.83L16.59 15.41L18 14L12 8L6 14L7.41 15.41Z"
        fill="currentColor"
      />
    </svg>
  </IconWrapper>
);

// 아래쪽 화살표 아이콘
export const ArrowDownIcon: React.FC = () => (
  <IconWrapper>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z"
        fill="currentColor"
      />
    </svg>
  </IconWrapper>
);

// 달력 아이콘
export const CalendarIcon: React.FC = () => (
  <IconWrapper>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19ZM7 10H12V15H7V10Z"
        fill="currentColor"
      />
    </svg>
  </IconWrapper>
);

// 벨 아이콘
export const BellIcon: React.FC = () => (
  <IconWrapper>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z"
        fill="currentColor"
      />
    </svg>
  </IconWrapper>
);

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
`;
