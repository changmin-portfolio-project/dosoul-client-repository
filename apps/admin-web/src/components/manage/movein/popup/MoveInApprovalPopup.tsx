import { QueryStateAdminRoomMoveinList } from "@/hooks/query/QueryStateAdminRoomMoveinList";
import { QueryStateRoomMoveinDetail } from "@/hooks/query/QueryStateRoomMoveinDetail";
import { postRoomMoveinApprove } from "@/services/room/postRoomMoveinAprove";
import { ROOM_MOVE_IN_DOMAIN_STATUS } from "@dosoul/consts";
import theme from "@dosoul/styles";
import { DynamicPopupTemplate } from "@dosoul/ui";
import React, { useState } from "react";
import styled from "styled-components";

interface MoveInApprovalPopupProps {
  onClose: () => void;
  moveinId: string;
  residentName: string;
  roomName: string;
}

export const MoveInApprovalPopup: React.FC<MoveInApprovalPopupProps> = ({
  onClose,
  moveinId,
  residentName,
  roomName,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [rejectionReason, setRejectionReason] = useState<string>("");

  const { refetch: refetchRoomMoveinList } = QueryStateAdminRoomMoveinList();
  const { refetch: refetchRoomDetail } = QueryStateRoomMoveinDetail(moveinId);

  const handleApprovalComplete = () => {
    refetchRoomMoveinList();
    refetchRoomDetail();
  };

  const isRejectionLength = () => {
    return rejectionReason.trim().length < 10;
  };

  const handleApproval = async () => {
    if (!selectedStatus) {
      alert("승인 상태를 선택해주세요.");
      return;
    }

    // 거절인 경우 거절 사유 필수 입력
    if (selectedStatus === ROOM_MOVE_IN_DOMAIN_STATUS.DISAPPROVED.value) {
      if (!rejectionReason.trim()) {
        alert("거절 사유를 입력해주세요.");
        return;
      }
      if (rejectionReason.trim().length < 10) {
        alert("거절 사유는 최소 10자 이상 입력해주세요.");
        return;
      }
    }

    setIsLoading(true);
    try {
      await postRoomMoveinApprove(
        moveinId,
        selectedStatus,
        selectedStatus === ROOM_MOVE_IN_DOMAIN_STATUS.DISAPPROVED.value
          ? rejectionReason
          : undefined,
      );
      handleApprovalComplete();
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    // 상태가 변경되면 거절 사유 초기화
    if (status !== ROOM_MOVE_IN_DOMAIN_STATUS.DISAPPROVED.value) {
      setRejectionReason("");
    }
  };

  const options = [
    {
      label: ROOM_MOVE_IN_DOMAIN_STATUS.APPROVED.label,
      value: ROOM_MOVE_IN_DOMAIN_STATUS.APPROVED.value,
      color: theme.mainColor.Blue,
    },
    {
      label: ROOM_MOVE_IN_DOMAIN_STATUS.WAITING.label,
      value: ROOM_MOVE_IN_DOMAIN_STATUS.WAITING.value,
      color: theme.grey.Grey6,
    },
    {
      label: ROOM_MOVE_IN_DOMAIN_STATUS.DISAPPROVED.label,
      value: ROOM_MOVE_IN_DOMAIN_STATUS.DISAPPROVED.value,
      color: theme.mainColor.Red,
    },
  ];

  return (
    <DynamicPopupTemplate title="입주 승인" onClose={onClose}>
      <PopupContainer>
        <PopupContent>
          <InfoSection>
            <InfoRow>
              <InfoLabel>입주자:</InfoLabel>
              <InfoValue>{residentName}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>방 이름:</InfoLabel>
              <InfoValue>{roomName}</InfoValue>
            </InfoRow>
          </InfoSection>

          <StatusSection>
            <StatusLabel>승인 상태 선택:</StatusLabel>
            <StatusOptions>
              <>
                {options.map(option => (
                  <StatusOption
                    key={option.value}
                    $isSelected={selectedStatus === option.value}
                    onClick={() => handleStatusChange(option.value)}
                  >
                    <StatusText
                      style={{
                        color: option.color,
                      }}
                    >
                      {option.label}
                    </StatusText>
                  </StatusOption>
                ))}
              </>
            </StatusOptions>
          </StatusSection>

          {/* 거절 사유 입력 필드 */}
          {selectedStatus === ROOM_MOVE_IN_DOMAIN_STATUS.DISAPPROVED.value && (
            <RejectionSection>
              <RejectionLabel>거절 사유 *</RejectionLabel>
              <RejectionReasonWrapper>
                <RejectionTextarea
                  placeholder="거절 사유를 입력해주세요. (최소 10자 이상)"
                  value={rejectionReason}
                  onChange={e => setRejectionReason(e.target.value)}
                  rows={4}
                  maxLength={500}
                />
              </RejectionReasonWrapper>
              <RejectionCharCount>
                {rejectionReason.length}/500
                {isRejectionLength() && (
                  <span style={{ color: theme.mainColor.Red }}>
                    {" "}
                    (최소 10자 이상 필요)
                  </span>
                )}
              </RejectionCharCount>
            </RejectionSection>
          )}
        </PopupContent>

        <ButtonSection>
          <CancelButton onClick={onClose} disabled={isLoading}>
            취소
          </CancelButton>
          <ConfirmButton
            onClick={handleApproval}
            disabled={
              isLoading ||
              !selectedStatus ||
              (selectedStatus ===
                ROOM_MOVE_IN_DOMAIN_STATUS.DISAPPROVED.value &&
                isRejectionLength())
            }
          >
            {isLoading ? "처리 중..." : "확인"}
          </ConfirmButton>
        </ButtonSection>
      </PopupContainer>
    </DynamicPopupTemplate>
  );
};

const PopupContainer = styled.div`
  padding: 24px;
`;

const PopupContent = styled.div`
  margin-bottom: 24px;
`;

const InfoSection = styled.div`
  margin-bottom: 20px;
  padding: 16px;
  background-color: ${theme.grey.Grey1};
  border-radius: 8px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.span`
  font: ${theme.fontSizes.Body2};
  color: ${theme.grey.Grey7};
  font-weight: 500;
`;

const InfoValue = styled.span`
  font: ${theme.fontSizes.Body2};
  color: ${theme.grey.Grey9};
  font-weight: 600;
`;

const StatusSection = styled.div`
  margin-bottom: 20px;
`;

const StatusLabel = styled.div`
  font: ${theme.fontSizes.Body1};
  color: ${theme.grey.Grey8};
  margin-bottom: 12px;
  font-weight: 500;
`;

const StatusOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StatusOption = styled.div<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid
    ${props => (props.$isSelected ? theme.mainColor.Blue : theme.grey.Grey4)};
  border-radius: 8px;
  cursor: pointer;
  background-color: ${props =>
    props.$isSelected ? theme.mainColor.Blue + "10" : "transparent"};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${theme.mainColor.Blue};
    background-color: ${theme.mainColor.Blue + "10"};
  }
`;

const StatusText = styled.span`
  font: ${theme.fontSizes.Body1};
  color: ${theme.grey.Grey9};
  font-weight: 500;
`;

const RejectionSection = styled.div`
  margin-bottom: 20px;
`;

const RejectionLabel = styled.div`
  font: ${theme.fontSizes.Body1};
  color: ${theme.grey.Grey8};
  margin-bottom: 12px;
  font-weight: 500;
`;

const RejectionTextarea = styled.textarea`
  width: 100%;
  border: none;
  border-radius: 8px;
  font: ${theme.fontSizes.Body2};
  color: ${theme.grey.Grey9};
  resize: vertical;
  min-height: 80px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${theme.mainColor.Blue};
  }

  &::placeholder {
    color: ${theme.grey.Grey5};
  }
`;

const RejectionCharCount = styled.div`
  font: ${theme.fontSizes.Body2};
  color: ${theme.grey.Grey6};
  text-align: right;
  margin-top: 8px;
`;

const ButtonSection = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const CancelButton = styled.button`
  padding: 12px 24px;
  border: 1px solid ${theme.grey.Grey4};
  border-radius: 8px;
  background-color: white;
  color: ${theme.grey.Grey7};
  font: ${theme.fontSizes.Body2};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${theme.grey.Grey2};
    border-color: ${theme.grey.Grey5};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ConfirmButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background-color: ${theme.mainColor.Blue};
  color: white;
  font: ${theme.fontSizes.Body2};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${theme.mainColor.Blue};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const RejectionReasonWrapper = styled.div`
  padding: 12px 15px;
  border: 1px solid ${theme.grey.Grey4};
  border-radius: 10px;
`;
