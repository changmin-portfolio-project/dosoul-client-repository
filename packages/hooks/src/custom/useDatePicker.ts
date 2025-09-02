import { DATE_PICKER_DATE_SELECT_EVENT } from "@dosoul/consts";
import { datePickerPopupStateAtom } from "@dosoul/states";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

interface UseDatePickerProps {
  title?: string;
  onDateSelect: (date: string) => void;
}

interface UseDatePickerReturn {
  onOpen: (initialDate?: string) => void;
  onClose: () => void;
}

/**
 * 날짜 선택 이벤트와 팝업 상태를 처리하는 custom hook
 * @param onDateSelect - 날짜가 선택되었을 때 호출될 콜백 함수
 * @param eventName - 사용할 이벤트 이름 (기본값: DATE_PICKER_DATE_SELECT_EVENT)
 * @returns 팝업 열기/닫기 함수들을 포함한 객체
 */
export const useDatePicker = ({
  onDateSelect,
  title,
}: UseDatePickerProps): UseDatePickerReturn => {
  const setDatePickerPopupState = useSetRecoilState(datePickerPopupStateAtom);

  useEffect(() => {
    const handleDatePickerDateSelect = (event: Event) => {
      const customEvent = event as CustomEvent<{ date: string }>;
      if (customEvent.detail?.date) {
        onDateSelect(customEvent.detail.date);
      }
    };

    window.addEventListener(
      DATE_PICKER_DATE_SELECT_EVENT,
      handleDatePickerDateSelect,
    );

    return () => {
      window.removeEventListener(
        DATE_PICKER_DATE_SELECT_EVENT,
        handleDatePickerDateSelect,
      );
    };
  }, [onDateSelect]);

  const onOpen = (initialDate?: string) => {
    setDatePickerPopupState({
      isOpen: true,
      dateString: initialDate,
      title: title,
    });
  };

  const onClose = () => {
    setDatePickerPopupState({
      isOpen: false,
      dateString: undefined,
      title: undefined,
    });
  };

  return {
    onOpen,
    onClose,
  };
};
