import { DosoulHeaderIncludeLayout } from "@/components/common/layout/DosoulHeaderIncludeLayout";
import { HouseMoveinBody } from "@/components/house/movein/HouseMoveinBody";
import { APP_PATH } from "@/global/const/AppPathConst";
import { PageContainerLayout } from "@dosoul/ui";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const HouseMoveinPage: React.FC = () => {
  const { roomId } = useParams();

  const [init, setInit] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const timeRef = setTimeout(() => {
      setInit(true);
    }, 100);

    return () => {
      clearTimeout(timeRef);
    };
  }, [roomId]);

  return (
    <PageContainerLayout
      PageContainerLayoutStyle={{
        opacity: init ? 1 : 0,
        transition: `opacity 0.3s ease-in`,
      }}
      redirectUrl={APP_PATH.HOME}
    >
      <DosoulHeaderIncludeLayout
        DosoulHeaderStyle={{ boxShadow: "none" }}
        isShowMyPageButton={false}
      >
        <HouseMoveinBody roomId={roomId || ""} />
      </DosoulHeaderIncludeLayout>
    </PageContainerLayout>
  );
};
