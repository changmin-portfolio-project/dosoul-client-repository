import WishButton from "@/components/common/button/WishButton";
import { HomeRoomListInfiniteScroll } from "@/components/fetch/HomeRoomListInfiniteScroll";
import { APP_PATH } from "@/global/const/AppPathConst";
import { QueryStateHomeRoomList } from "@/hooks/query/QueryStateHomeRoomList";
import { useWindowSize } from "@dosoul/hooks";
import theme, { hoverCardStyle } from "@dosoul/styles";
import { getRoomTypeDisplay } from "@dosoul/utils";
import type React from "react";
import { generatePath, useNavigate } from "react-router-dom";
import styled from "styled-components";

export const HomeBody: React.FC = () => {
  const MOBILE_IMAGE_HEIGHT = 300;
  const PC_IMAGE_HEIGHT = 400;

  const { windowWidth } = useWindowSize();

  const { data } = QueryStateHomeRoomList();
  const navigate = useNavigate();

  return (
    <Container>
      <HomeBannerContainer>
        <HomeBannerWrap>
          <HomeBannerImage
            src="/assets/images/banner/HomeBanner.webp"
            height={
              windowWidth <= theme.systemSize.appDisplaySize.maxWidthNum
                ? MOBILE_IMAGE_HEIGHT
                : PC_IMAGE_HEIGHT
            }
          />

          {windowWidth <= theme.systemSize.appDisplaySize.maxWidthNum ? (
            <HomeBannerTextWrapByMobile>
              <HomeBannerTextSubWrap>
                <HomeBannerTitleByMobile>
                  최적의 청년 주택 솔루션, 두솔
                </HomeBannerTitleByMobile>
                <HomeBannerSubtitleByMobile>
                  청년 주거의 A-Z
                </HomeBannerSubtitleByMobile>
              </HomeBannerTextSubWrap>
            </HomeBannerTextWrapByMobile>
          ) : (
            <HomeBannerTextWrap>
              <HomeBannerTextSubWrap>
                <HomeBannerTitle>최적의 청년 주택 솔루션, 두솔</HomeBannerTitle>
                <HomeBannerSubtile>청년 주거의 A-Z</HomeBannerSubtile>
              </HomeBannerTextSubWrap>
            </HomeBannerTextWrap>
          )}
        </HomeBannerWrap>
      </HomeBannerContainer>
      <HouseContainer>
        <HouseTopWrap>
          <HouseTopSubWrap>
            <HouseTitleWrap>
              <HouseTitleText>오늘의 공간, 내일의 집</HouseTitleText>
              <HouseSubTitleText>
                다양한 인테리어와 건물에서 새로운 가능성을 만나보세요
              </HouseSubTitleText>
            </HouseTitleWrap>
            <HouseWrap>
              {data &&
                data.pages
                  .flatMap(v => v)
                  .map((room, index) => (
                    <CardWrap
                      key={index}
                      onClick={() =>
                        navigate(
                          generatePath(APP_PATH.HOUSE_DETAIL, {
                            roomId: room.roomNumber,
                          }),
                        )
                      }
                    >
                      <Card>
                        <WishButtonWrapper>
                          <WishButton
                            roomId={room.roomNumber}
                            size="medium"
                            isWishlisted={room.isWished}
                          />
                        </WishButtonWrapper>
                        <ImageContainer>
                          <ImageThumnailImg
                            src={room.roomResponseImageList[0].imageUrl}
                          />
                        </ImageContainer>
                        <InfoContainer>
                          <InfoSubContainer>
                            <InfoSubContainerContent>
                              <InfoText>
                                {getRoomTypeDisplay(room.roomType)}
                              </InfoText>
                              <InfoTitle>{room.roomName}</InfoTitle>

                              <InfoPrice>
                                <span>
                                  월세:{" "}
                                  {(room.monthlyRent > 10000
                                    ? room.monthlyRent / 10000
                                    : room.monthlyRent
                                  ).toLocaleString()}
                                  만원
                                </span>{" "}
                                <span> | </span>
                                <span>
                                  보증금:{" "}
                                  {(room.deposit > 10000
                                    ? room.deposit / 10000
                                    : room.deposit
                                  ).toLocaleString() || "0"}
                                  만원
                                </span>
                              </InfoPrice>
                            </InfoSubContainerContent>
                            {/* <InfoText>위치: {room.location}</InfoText> */}
                          </InfoSubContainer>
                        </InfoContainer>
                      </Card>
                      <InfoDescription>{room.description}</InfoDescription>
                    </CardWrap>
                  ))}
            </HouseWrap>
            <HomeRoomListInfiniteScroll />
          </HouseTopSubWrap>
        </HouseTopWrap>
      </HouseContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const HomeBannerContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;

  @media (min-width: ${theme.systemSize.appDisplaySize.desktopMaxWidth}) {
    margin-bottom: 35px;
  }
`;

const HomeBannerWrap = styled.div`
  width: 100%;
  position: relative;
  max-width: ${theme.systemSize.appDisplaySize.desktopMaxWidth};
  margin: 0 auto;
`;

const HomeBannerImage = styled.img`
  width: 100%;

  object-fit: cover;
  @media (min-width: ${theme.systemSize.appDisplaySize.desktopMaxWidth}) {
    border-radius: 20px;
  }
`;

const HomeBannerTextWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translate(0, -50%);
`;

const HomeBannerTextWrapByMobile = styled.div`
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translate(0%, -50%);
`;

const HomeBannerTextSubWrap = styled.div``;
const HomeBannerTitle = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font: ${theme.fontSizes.Display5};
  color: white;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 12px;
`;
const HomeBannerSubtile = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font: ${theme.fontSizes.Display2};
  color: white;
  font-size: 20px;
`;

const HomeBannerTitleByMobile = styled(HomeBannerTitle)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font: ${theme.fontSizes.Display2};
  color: white;
  text-shadow: 0px 5px 8px rgba(0, 0, 0, 0.35);
  margin-bottom: 12px;
`;
const HomeBannerSubtitleByMobile = styled(HomeBannerSubtile)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font: ${theme.fontSizes.Headline1};
  color: white;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
  font-size: 20px;
`;

const HouseContainer = styled.div`
  width: 100%;
  max-width: ${theme.systemSize.appDisplaySize.desktopMaxWidth};
  margin: 0 auto;
`;

const HouseTitleWrap = styled.div`
  margin: 0 10px;
  padding: 10px 0;
`;

const HouseTitleText = styled.div`
  color: black;
  display: flex;
  font: ${theme.fontSizes.Body3};
  font-size: 20px;
`;

const HouseSubTitleText = styled.div`
  color: ${theme.grey.Grey5};
  display: flex;
  font: ${theme.fontSizes.Body2};
  font-size: 14px;
`;

const HouseTopWrap = styled.div`
  width: 100%;
`;

const HouseTopSubWrap = styled.div`
  @media (max-width: ${theme.systemSize.appDisplaySize.maxWidth}) {
    padding: 0 5px;
  }
`;

const HouseWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  row-gap: 10px;
  margin: 0 auto;
  padding: 0 10px;

  gap: 50px;

  @media (min-width: ${theme.systemSize.appDisplaySize.maxWidth}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
`;

const CardWrap = styled.div`
  width: 100%;
  background: white;
  ${hoverCardStyle};

  overflow: hidden;
`;

const Card = styled.div`
  margin-bottom: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  display: flex;

  position: relative;
`;

const ImageContainer = styled.div`
  align-self: stretch;
`;

const ImageThumnailImg = styled.img`
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 20px;
  vertical-align: bottom;
`;

const InfoContainer = styled.div`
  align-self: stretch;
  // height: 10px;
  overflow: hidden;
  position: absolute;

  bottom: 0;
  width: 100%;
  height: 46%;
`;

const InfoSubContainer = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
  border-radius: 0 0 20px 20px;
`;

const InfoSubContainerContent = styled.div`
  bottom: 20px;
  position: absolute;
  left: 20px;
`;

const InfoText = styled.div`
  padding-top: 2px;
  color: white;
  font: ${theme.fontSizes.Body1};
`;

const InfoPrice = styled.div`
  padding-top: 2px;
  color: white;
  font: ${theme.fontSizes.Body2};
`;

const InfoTitle = styled(InfoText)`
  font: ${theme.fontSizes.Headline2};
  color: white;
  bottom: 10px;
`;

const InfoDescription = styled.div`
  font: ${theme.fontSizes.Body2};
  overflow: hidden;
  text-overflow: ellipsis;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: ${theme.grey.Grey7};

  @media (max-width: ${theme.systemSize.appDisplaySize.maxWidth}) {
    font-size: 16px;
  }
`;

const WishButtonWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
`;
