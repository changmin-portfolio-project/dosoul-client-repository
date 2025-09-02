import { DocumentFileContentType, UpdateFilePopup } from "@dosoul/ui";
import React, { useEffect, useState } from "react";

interface UseUploadFilePopupProps {
  onChangeTempDocumentList?: (list: any[]) => void;
}

interface UseUploadFilePopupReturn {
  isOpen: boolean;
  documentFileList: DocumentFileContentType[];
  onOpen: () => void;
  onSave: (documentFileList: DocumentFileContentType[]) => void;
  onClose: () => void;
  UploadFilePopup: React.ReactNode;
}

/**
 * 토스트 바 상태와 컴포넌트를 관리하는 custom hook
 * @param defaultMessage - 기본 메시지
 * @returns 토스트 바 제어 함수들과 컴포넌트를 포함한 객체
 */
export const useUploadFilePopup =
  ({}: UseUploadFilePopupProps = {}): UseUploadFilePopupReturn => {
    const [isOpen, setIsOpen] = useState(false);
    const [documentFileList, setDocumentFileList] = useState<
      DocumentFileContentType[]
    >([]);

    const onOpen = () => {
      setIsOpen(true);
    };

    const onClose = () => {
      setIsOpen(false);
    };

    const UploadFilePopup: React.ReactNode = React.createElement(
      UpdateFilePopup,
      {
        documentFileList: documentFileList,
        onChangeDocumentFileList: setDocumentFileList,
        isOpen: isOpen,
        onClose: onClose,
      },
    );

    useEffect(() => {
      return () => {
        setIsOpen(false);
        setDocumentFileList([]);
      };
    }, []);

    return {
      isOpen,
      documentFileList,
      onOpen,
      onSave: setDocumentFileList,
      onClose,
      UploadFilePopup,
    };
  };
