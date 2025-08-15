import { DosoulHeaderIncludeLayout } from "@/components/common/layout/DosoulHeaderIncludeLayout";
import { HouseDetailBody } from "@/components/house/housedetail/HouseDetailBody";
import PostCotentZoomPopup from "@/components/popup/PostContentZoomPopup";
import { postContentZoomPopupInfoAtom } from "@/state/PostAtom";
import { PageContainerLayout } from "@dosoul/ui";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

export const HouseDetailPage: React.FC = () => {
  const postContentZoomPopupInfo = useRecoilValue(postContentZoomPopupInfoAtom);

  const { roomId } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <PageContainerLayout>
        <DosoulHeaderIncludeLayout DosoulHeaderStyle={{ boxShadow: "none" }}>
          <HouseDetailBody roomId={roomId || ""} />
        </DosoulHeaderIncludeLayout>
      </PageContainerLayout>
      {postContentZoomPopupInfo.isActive && <PostCotentZoomPopup />}
    </>
  );
};
