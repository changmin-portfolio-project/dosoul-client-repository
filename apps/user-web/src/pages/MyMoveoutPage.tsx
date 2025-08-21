import { MyPageLayout } from "@/components/common/layout/my/MyPageLayout";
import { MyMoveoutBody } from "@/components/my/moveout/MyMoveoutBody";
import React, { useEffect, useState } from "react";

export const MyMoveoutPage: React.FC = () => {
  const [init, setInit] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const timeRef = setTimeout(() => {
      setInit(true);
    }, 100);

    return () => {
      clearTimeout(timeRef);
    };
  }, []);

  return (
    <MyPageLayout
      children={
        <MyMoveoutBody
          MyMoveinBodyStyle={{
            opacity: init ? 1 : 0,
            transition: `opacity 0.3s ease-in`,
          }}
        />
      }
    />
  );
};
