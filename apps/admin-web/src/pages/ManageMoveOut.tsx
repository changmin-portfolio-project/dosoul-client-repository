import { AdminPageLayout } from "@/components/common/layout/AdminPageLayout";
import { ManageMoveoutBody } from "@/components/manage/moveout/body/ManageMoveoutBody";
import React, { useEffect, useState } from "react";

export const ManageMoveOutPage: React.FC = () => {
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
        <ManageMoveoutBody
          ManageMoveoutBodyStyle={{
            opacity: init ? 1 : 0,
            transition: `opacity 0.3s ease-in`,
          }}
        />
      }
    />
  );
};
