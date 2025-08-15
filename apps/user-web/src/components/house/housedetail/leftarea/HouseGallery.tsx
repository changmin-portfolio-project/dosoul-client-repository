import { QueryStateRoomDetail } from "@/hooks/query/QueryStateRoomDetail";
import { postContentZoomPopupInfoAtom } from "@/state/PostAtom";
import { useWindowSize } from "@dosoul/hooks";
import theme from "@dosoul/styles";
import { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import SwiperCore from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const THUMNAIL_WIDTH = 140;
const THUMNAIL_GAP = 16;

interface HouseGalleryProps {
  roomId: string;
}

export const HouseGallery: React.FC<HouseGalleryProps> = ({ roomId }) => {
  const { data: roomDetailData } = QueryStateRoomDetail(roomId);

  const [swiper, setSwiper] = useState<SwiperCore>();

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollThumbnailClick = (curIndex: number) => {
    if (!swiper) return;

    swiper.slideTo(curIndex);

    scrollContainerRef.current?.scrollTo({
      left: curIndex * (THUMNAIL_WIDTH + THUMNAIL_GAP),
      behavior: "smooth",
    });
  };

  const handleSlideChange = (swiper: SwiperCore) => {
    swiper.previousIndex;
    scrollThumbnailClick(swiper.activeIndex);
  };

  const setPostContentZoomPopupInfo = useSetRecoilState(
    postContentZoomPopupInfoAtom,
  );

  const { windowWidth } = useWindowSize();

  return (
    <GallerySection>
      <StyledSwiper
        onSwiper={setSwiper}
        modules={[Pagination, Navigation]}
        pagination={true}
        onSlideChange={handleSlideChange}
        style={
          windowWidth <= theme.systemSize.appDisplaySize.maxWidthNum
            ? {}
            : { borderRadius: "20px" }
        }
      >
        {roomDetailData &&
          roomDetailData.roomCustomImageDaos.map((v, i) => (
            <SwiperSlide key={i}>
              <img
                onClick={() => {
                  setPostContentZoomPopupInfo({
                    isActive: true,
                    initIndex: i,
                    postContents: roomDetailData.roomCustomImageDaos.map(
                      v => v.imageUrl,
                    ),
                  });
                }}
                src={v.imageUrl}
                style={{
                  height: 400,
                  width: "100%",
                  objectFit: "cover",
                  verticalAlign: "bottom",
                }}
              />
            </SwiperSlide>
          ))}
      </StyledSwiper>
      <GalleryContainer>
        <GalleryWrapper ref={scrollContainerRef}>
          <GalleryInner>
            {roomDetailData &&
              roomDetailData.roomCustomImageDaos.map((v, i) => (
                <Thumbnail
                  key={i}
                  src={v.imageUrl}
                  onClick={() => {
                    if (!swiper) return;

                    scrollThumbnailClick(i);
                  }}
                />
              ))}
          </GalleryInner>
        </GalleryWrapper>
      </GalleryContainer>
    </GallerySection>
  );
};

const StyledSwiper = styled(Swiper)`
  .swiper-pagination-bullet {
    background-color: black;
    opacity: 0.3;
  }

  .swiper-pagination-bullet-active {
    background-color: balck;
    opacity: 1;
  }
`;

const GallerySection = styled.section`
  width: 100%;
`;

const GalleryContainer = styled.div`
  margin-top: 10px;
`;

const GalleryWrapper = styled.div`
  overflow-x: auto;
  width: 100%;
`;

const GalleryInner = styled.div`
  display: flex;
  gap: ${THUMNAIL_GAP}px;
  min-width: 100%;
`;

const Thumbnail = styled.img`
  object-fit: cover;
  width: ${THUMNAIL_WIDTH}px;
  height: 83px;
  background-color: ${theme.grey.Grey1};
  border-radius: 20px;
  flex-shrink: 0;

  @media (min-width: ${theme.systemSize.appDisplaySize.maxWidth}) {
    width: 122px;
  }
`;
