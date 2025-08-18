import { MyPageLayout } from "@/components/common/layout/my/MyPageLayout";
import { MyMoveinBody } from "@/components/my/movein/MyMoveinBody";
import React, { useEffect, useState } from "react";

export const MyMoveinPage: React.FC = () => {
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
        <MyMoveinBody
          MyMoveinBodyStyle={{
            opacity: init ? 1 : 0,
            transition: `opacity 0.3s ease-in`,
          }}
        />
      }
    />
  );
};
