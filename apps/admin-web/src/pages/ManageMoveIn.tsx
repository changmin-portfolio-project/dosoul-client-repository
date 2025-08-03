import { AdminPageLayout } from "@/components/common/layout/AdminPageLayout";
import { ManageMoveinBody } from "@/components/manage/movein/body/ManageMoveinBody";
import React, { useEffect, useState } from "react";

export const ManageMoveInPage: React.FC = () => {
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
    <AdminPageLayout
      children={
        <ManageMoveinBody
          ManageMoveinBodyStyle={{
            opacity: init ? 1 : 0,
            transition: `opacity 0.3s ease-in`,
          }}
        />
      }
    />
  );
};
