import { DosoulHeaderIncludeLayout } from "@/components/common/layout/DosoulHeaderIncludeLayout";
import BottomNavbar from "@/components/common/nav/BottomNavbar";
import WishlistItem from "@/components/wishlist/WishlistItem";
import { APP_PATH } from "@/global/const/AppPathConst";
import {
  getWishlist,
  WishlistItem as WishlistItemType,
} from "@/services/wishlist/getWishlist";
import HeartButtonIcon from "@dosoul/assets/images/icons/button/nav/ActiveHeartButtonIcon.svg?react";
import { DOSOUL_HEADER_HIEGHT } from "@root/packages/consts/src";
import theme from "@root/packages/styles/src";
import { PageContainerLayout } from "@root/packages/ui/src";
import React, { useEffect, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import styled from "styled-components";

const WishlistPage: React.FC = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState<WishlistItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 위시 리스트 데이터 로드
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getWishlist(0);
        setWishlistItems(response.data);
      } catch (err) {
        console.error("위시 리스트 로드 실패:", err);
        setError("위시 리스트를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, []);

  const handleRemoveItem = async (roomId: string) => {
    try {
      setWishlistItems(prev => prev.filter(item => item.roomId !== roomId));
    } catch (err) {
      console.error("위시 리스트 제거 실패:", err);
      alert("위시 리스트에서 제거하는데 실패했습니다.");
    }
  };

  const handleItemClick = (roomId: string) => {
    navigate(generatePath(APP_PATH.HOUSE_DETAIL, { roomId: roomId }));
  };

  const handleExploreClick = () => {
    navigate("/");
  };

  return (
    <PageContainerLayout>
      <DosoulHeaderIncludeLayout DosoulHeaderStyle={{ boxShadow: "none" }}>
        <WishlistPageContainer>
          <WishlistHeader>
            <WishlistTitle>위시 리스트</WishlistTitle>
            <WishlistSubtitle>마음에 드는 방을 모아보세요</WishlistSubtitle>
          </WishlistHeader>
          {loading ? (
            <LoadingState>
              <LoadingSpinner />
              <LoadingText>위시 리스트를 불러오는 중...</LoadingText>
            </LoadingState>
          ) : error ? (
            <ErrorState>
              <ErrorIcon>⚠️</ErrorIcon>
              <ErrorTitle>오류가 발생했습니다</ErrorTitle>
              <ErrorDescription>{error}</ErrorDescription>
              <RetryButton onClick={() => window.location.reload()}>
                다시 시도
              </RetryButton>
            </ErrorState>
          ) : wishlistItems.length === 0 ? (
            <EmptyState>
              <EmptyIcon>
                <HeartButtonIcon />
              </EmptyIcon>
              <EmptyTitle>아직 저장된 방이 없어요</EmptyTitle>
              <EmptyDescription>
                마음에 드는 방을 찾아서 하트를 눌러보세요
              </EmptyDescription>
              <ExploreButton onClick={handleExploreClick}>
                방 둘러보기
              </ExploreButton>
            </EmptyState>
          ) : (
            <WishlistContent>
              <WishlistList>
                {wishlistItems.map(item => (
                  <WishlistItem
                    key={item.wishlistId}
                    {...item}
                    onRemove={handleRemoveItem}
                    onClick={handleItemClick}
                  />
                ))}
              </WishlistList>
            </WishlistContent>
          )}

          <BottomNavbar />
        </WishlistPageContainer>
      </DosoulHeaderIncludeLayout>
    </PageContainerLayout>
  );
};

const WishlistPageContainer = styled.div`
  width: 100%;
  max-width: ${theme.systemSize.appDisplaySize.desktopMaxWidth};
  margin: 0 auto;

  height: calc(100dvh - ${DOSOUL_HEADER_HIEGHT}px);

  flex-direction: column;
  display: flex;
`;

const WishlistHeader = styled.div`
  padding: 20px 16px;
  background-color: white;
`;

const WishlistTitle = styled.h1`
  font: ${theme.fontSizes.Headline3};
  color: ${theme.mainColor.Black};
  margin: 0 0 8px 0;
`;

const WishlistSubtitle = styled.div`
  font: ${theme.fontSizes.Body2};
  color: ${theme.grey.Grey6};
  margin: 0;
`;

const WishlistContent = styled.div`
  padding-top: 20px;
`;

const WishlistList = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr;

  @media (max-width: ${theme.systemSize.appDisplaySize.maxWidth}) {
    grid-template-columns: 1fr;
  }
`;

const StateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;

  margin: auto;
`;

const EmptyState = styled(StateContainer)``;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const EmptyTitle = styled.div`
  font: ${theme.fontSizes.Headline3};
  color: ${theme.mainColor.Black};
  margin: 0 0 8px 0;
`;

const EmptyDescription = styled.div`
  font: ${theme.fontSizes.Body2};
  color: ${theme.grey.Grey6};
  margin: 0 0 24px 0;
  line-height: 1.5;
`;

const ExploreButton = styled.button`
  background-color: ${theme.mainColor.DosoulOrange};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font: ${theme.fontSizes.Body2};
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${theme.mainColor.DosoulOrange};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const LoadingState = styled(StateContainer)``;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${theme.grey.Grey3};
  border-top: 3px solid ${theme.mainColor.DosoulOrange};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.div`
  font: ${theme.fontSizes.Body2};
  color: ${theme.grey.Grey6};
  margin: 0;
`;

const ErrorState = styled(StateContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
`;

const ErrorIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const ErrorTitle = styled.div`
  font: ${theme.fontSizes.Headline3};
  color: ${theme.mainColor.Black};
  margin: 0 0 8px 0;
`;

const ErrorDescription = styled.div`
  font: ${theme.fontSizes.Body2};
  color: ${theme.grey.Grey6};
  margin: 0 0 24px 0;
  line-height: 1.5;
`;

const RetryButton = styled.button`
  background-color: ${theme.grey.Grey6};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font: ${theme.fontSizes.Body1};
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${theme.grey.Grey7};
  }

  &:active {
    transform: scale(0.98);
  }
`;

export default WishlistPage;
