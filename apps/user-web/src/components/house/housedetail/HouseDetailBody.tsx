import WishButton from "@/components/common/button/WishButton";
import { DosoulFooter } from "@/components/common/footer/DosoulFooter";
import { HouseMoveInRequestSideBar } from "@/components/house/housedetail/rightarea/HouseMoveInRequestSideBar";
import { ContactPopup } from "@/components/my/ContactPopup";
import { APP_CONTACT_KAKAO_LINK } from "@/global/const/AppInfoConst";
import { APP_PATH } from "@/global/const/AppPathConst";
import { QueryStateRoomDetail } from "@/hooks/query/QueryStateRoomDetail";
import { QueryStateUserInfo } from "@/hooks/query/QueryStateUserInfo";
import {
  DOSOUL_HEADER_HIEGHT,
  EMAIL_BODY_NEW_LINE,
  REDIRECT_URL,
  STATUS_UNAUTHORIZED_CODE,
} from "@dosoul/consts";
import { useWindowSize } from "@dosoul/hooks";
import theme from "@dosoul/styles";
import { BackButton, BottomButton } from "@dosoul/ui";
import { getAuthCheckMe } from "@root/packages/services/src";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { generatePath, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { HouseMoveInRequestBottomSheet } from "./bottomarea/HouseMoveInRequestBottomSheet";
import { HouseDetailInfoBody } from "./HouseDetailInfoBody";

const CONTAINER_WIDTH = 1200;
const CONTAINER_AREA_GAP = 30;
const LEFT_AREA_WIDTH = CONTAINER_WIDTH * (2 / 3);
const RIGHT_AREA_WIDTH = CONTAINER_WIDTH * (1 / 3) - CONTAINER_AREA_GAP;

interface HouseDetailBodyProps {
  roomId: string;
}

export const HouseDetailBody: React.FC<HouseDetailBodyProps> = ({ roomId }) => {
  const { windowWidth } = useWindowSize();

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const { data: userInfo } = QueryStateUserInfo();

  const { data: roomDetailData, refetch: refetchRoomDetail } =
    QueryStateRoomDetail(roomId);

  const moveInRequestUrl = generatePath(APP_PATH.MOVE_IN, { roomId: roomId });

  const [contactPopup, setContactPopup] = useState<{
    isActive: boolean;
    info: {
      roomName: string;
    };
  }>({
    isActive: false,
    info: {
      roomName: "",
    },
  });

  const handleAddQueryParam = () => {
    searchParams.set(REDIRECT_URL, moveInRequestUrl);
    setSearchParams(searchParams); // 페이지 이동 없이 쿼리만 갱신됨
  };

  const onClickMoveIn = () => {
    getAuthCheckMe()
      .then(() => {
        navigate(moveInRequestUrl);
      })
      .catch((e: AxiosError) => {
        if (e.status === STATUS_UNAUTHORIZED_CODE) {
          handleAddQueryParam();
        }
      });
  };

  return (
    <>
      {windowWidth <= theme.systemSize.appDisplaySize.maxWidthNum ? (
        <>
          <BackButton
            ButtonContainerStyle={{
              top: DOSOUL_HEADER_HIEGHT,
              backdropFilter: "blur(10px)",
              padding: 0,
              opacity: "0.9",
              borderRadius: "50%",
            }}
          />
          <HouseDetailInfoBody roomId={roomId} />

          <HouseMoveInRequestBottomSheet
            roomId={roomId}
            onClickFunc={onClickMoveIn}
            onClickContactPopup={() =>
              setContactPopup(prev => ({
                ...prev,
                isActive: true,
                info: { roomName: "" },
              }))
            }
          />
          <DosoulFooter
            DosoulFooterStyle={{
              paddingBottom:
                theme.systemSize.appDisplaySize.mobileBottomSheetHeightNum,
            }}
          />
        </>
      ) : (
        <>
          <BackButton ButtonContainerStyle={{ top: DOSOUL_HEADER_HIEGHT }} />
          <MainContent>
            <HouseInfoContainer>
              <HouseDetailLeftContainer>
                <HouseDetailInfoBody roomId={roomId} />
              </HouseDetailLeftContainer>

              <HouseDetailRightContainer>
                <HouseMoveInRequestSideBar
                  roomId={roomId}
                  onClickFunc={onClickMoveIn}
                  onClickContactPopup={() =>
                    setContactPopup(prev => ({
                      ...prev,
                      isActive: true,
                      info: {
                        roomName: "",
                      },
                    }))
                  }
                />
              </HouseDetailRightContainer>
            </HouseInfoContainer>
          </MainContent>
          <DosoulFooter />
        </>
      )}
      <BottomButton
        Icon={
          <WishButtonWrap>
            <WishButton
              roomId={roomId}
              isWishlisted={roomDetailData?.isWished || false}
              onWishlistChange={() => {
                refetchRoomDetail();
              }}
              Style={{
                width: "100%",
                height: "100%",
              }}
            />
          </WishButtonWrap>
        }
      />
      <ContactPopup
        isOpen={contactPopup.isActive}
        info={{
          title: "상담하기",
          referenceContent: userInfo?.fullName || "",
          emailBody: `궁금하신 상담 내용을 말씀해 주시겠어요? ${EMAIL_BODY_NEW_LINE} 이름과 연락처를 남겨 주시면 확인 후 빠르게 답변드리겠습니다. 감사합니다. ❣️`,
        }}
        contactKakoLink={APP_CONTACT_KAKAO_LINK}
        onClose={() =>
          setContactPopup(prev => ({
            ...prev,
            isActive: false,
            info: {
              roomName: "",
            },
          }))
        }
      />
    </>
  );
};

const MainContent = styled.main`
  width: 100%;
  max-width: ${CONTAINER_WIDTH}px;
  margin: 0 auto;
`;

const HouseInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  width: 100%;
`;

const HouseDetailLeftContainer = styled.div`
  width: ${LEFT_AREA_WIDTH}px;
`;

const HouseDetailRightContainer = styled.div`
  width: ${RIGHT_AREA_WIDTH}px;
  height: 412px;
  position: sticky;
  top: ${DOSOUL_HEADER_HIEGHT}px;
  overflow: hidden;
`;

const WishButtonWrap = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
`;
