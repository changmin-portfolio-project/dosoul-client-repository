import { DosoulFooter } from "@/components/common/footer/DosoulFooter";
import { DosoulHeaderIncludeLayout } from "@/components/common/layout/DosoulHeaderIncludeLayout";
import BottomNavbar from "@/components/common/nav/BottomNavbar";
import { HomeBody } from "@/components/home/body/HomeBody";
import { PageContainerLayout } from "@dosoul/ui";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <>
      <PageContainerLayout>
        <DosoulHeaderIncludeLayout>
          <HomeBody />
        </DosoulHeaderIncludeLayout>

        <DosoulFooter />
        <BottomNavbar />
      </PageContainerLayout>
    </>
  );
};

export default HomePage;
