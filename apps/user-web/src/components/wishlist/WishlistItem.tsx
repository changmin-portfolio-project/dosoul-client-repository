import theme from "@root/packages/styles/src";
import React from "react";
import styled from "styled-components";
import WishButton from "../common/button/WishButton";

interface WishlistItemProps {
  wishlistId: string;
  roomId: string;
  roomName: string;
  housingType: string;
  address: string;
  addressDetail: string;
  monthlyRent: number;
  deposit: number;
  images: Array<{ roomId: string; imageUrl: string }>;
  onRemove: (roomId: string) => void;
  onClick: (roomId: string) => void;
}

const WishlistItem: React.FC<WishlistItemProps> = ({
  roomId,
  roomName,
  address,
  addressDetail,
  monthlyRent,
  deposit,
  images,
  onRemove,
  onClick,
}) => {
  const fullAddress = `${address} ${addressDetail}`.trim();
  const priceText = `월 ${monthlyRent.toLocaleString()}원 / 보증금 ${deposit.toLocaleString()}원`;
  const firstImage = images.length > 0 ? images[0].imageUrl : null;

  return (
    <WishlistItemContainer onClick={() => onClick(roomId)}>
      <WishlistItemImage>
        {firstImage ? (
          <img src={firstImage} alt={roomName} />
        ) : (
          <PlaceholderImage>🏠</PlaceholderImage>
        )}
      </WishlistItemImage>

      <WishlistItemContent>
        <WishlistItemTitle>{roomName}</WishlistItemTitle>
        <WishlistItemAddress>{fullAddress}</WishlistItemAddress>
        <WishlistItemPrice>{priceText}</WishlistItemPrice>
      </WishlistItemContent>

      <WishlistItemActions>
        <WishButton
          roomId={roomId}
          size="medium"
          isWishlisted={true}
          onWishlistChange={() => {
            onRemove(roomId);
          }}
        />
      </WishlistItemActions>
    </WishlistItemContainer>
  );
};

const WishlistItemContainer = styled.div`
  display: flex;
  background-color: white;
  border-radius: 12px;
  margin: 0 10px;
  padding: 10px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

const WishlistItemImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 16px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.grey.Grey2};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;

const WishlistItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const WishlistItemTitle = styled.div`
  font: ${theme.fontSizes.Subhead2};
  color: ${theme.mainColor.Black};
  margin: 0 0 4px 0;
  line-height: 1.3;
`;

const WishlistItemAddress = styled.div`
  font: ${theme.fontSizes.Body2};
  color: ${theme.grey.Grey6};
  margin: 0 0 8px 0;
  line-height: 1.4;
`;

const WishlistItemPrice = styled.div`
  font: ${theme.fontSizes.Body1};
  color: ${theme.mainColor.DosoulOrange};
  font-weight: 600;
  margin: 0;
`;

const WishlistItemActions = styled.div`
  display: flex;
  align-items: center;
  margin-left: 12px;
`;

export default WishlistItem;
