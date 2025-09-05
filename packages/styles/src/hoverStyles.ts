import { css } from "styled-components";

export const hoverFilterBrigntnessStyle = css`
  @media (hover: hover) {
    &:hover {
      filter: brightness(0.7);
    }
  }
`;

export const filterBrigntnessStyle = css`
  cursor: pointer;
  transition: filter 0.2s ease-in-out;
  @media (hover: hover) {
    &:hover {
      filter: brightness(0.9);
    }
  }

  @media (hover: none) {
    &:active {
      filter: brightness(0.9);
    }
  }
`;

export const hoverComponentStyle = css`
  cursor: pointer;

  border-radius: 16px;

  transition: background 0.2s ease-in-out;
  @media (hover: hover) {
    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }

  @media (hover: none) {
    &:active {
      background: rgba(0, 0, 0, 0.05);
    }
  }
`;

export const hoverComponentNotRoundStyle = css`
  cursor: pointer;

  transition: background 0.2s ease-in-out;
  @media (hover: hover) {
    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }

  @media (hover: none) {
    &:active {
      background: rgba(0, 0, 0, 0.05);
    }
  }
`;

export const hoverRoundCoverStyle = css`
  cursor: pointer;

  &:hover {
    border-radius: 20px;

    // box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* 원형 테두리 느낌 */
    background-color: rgba(0, 0, 0, 0.1); /* 어두운 오버레이 */
  }
`;

export const borderShadowStyle_prop = `
rgba(0, 0, 0, 0.1) 0px 1px 20px 0px`;

// 새로운 아름다운 애니메이션 스타일들
export const hoverCardStyle = css`
  cursor: pointer;
  position: relative;
  overflow: hidden;

  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.5) 0%,
      transparent 60%
    );
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  @media (hover: hover) {
    &:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 3px 7px rgba(0, 0, 0, 0.04);

      &::after {
        width: 300px;
        height: 300px;
        opacity: 0;
      }
    }
  }

  @media (hover: none) {
    &:active {
      background: rgba(0, 0, 0, 0.04);
      transform: translateY(-2px) scale(1.01);
      box-shadow: 0 0px 7px rgba(0, 0, 0, 0.08);
    }
  }
`;
