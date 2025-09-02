import { REQUEST_TOAST_EVENT } from "@dosoul/consts";
import { ApiWithToastDispatchType } from "@dosoul/services";
import { useState } from "react";

interface UseToastBarProps {
  message?: string;
}

interface UseToastBarReturn {
  isToastOpen: boolean;
  showToast: (message: string) => void;
  hideToast: () => void;
}

/**
 * 토스트 바 상태와 컴포넌트를 관리하는 custom hook
 * @param defaultMessage - 기본 메시지
 * @returns 토스트 바 제어 함수들과 컴포넌트를 포함한 객체
 */
export const useToastBar = ({
  message: defaultMessage,
}: UseToastBarProps = {}): UseToastBarReturn => {
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [message, setMessage] = useState(defaultMessage || "");

  const showToast = (newMessage?: string) => {
    setMessage(newMessage || message);
    setIsToastOpen(true);

    window.dispatchEvent(
      new CustomEvent(REQUEST_TOAST_EVENT, {
        detail: {
          isOpen: true,
          message: newMessage || message,
        },
      } as {
        detail: ApiWithToastDispatchType;
      }),
    );
  };

  const hideToast = () => {
    setIsToastOpen(false);

    window.dispatchEvent(
      new CustomEvent(REQUEST_TOAST_EVENT, {
        detail: {
          isOpen: false,
          message: "",
        },
      } as {
        detail: ApiWithToastDispatchType;
      }),
    );
  };

  return {
    isToastOpen,
    showToast,
    hideToast,
  };
};
