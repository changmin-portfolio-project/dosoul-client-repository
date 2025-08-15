import { HOUSE_DETAIL_INFO_NAME } from "@/global/const/HouseConst";
import theme from "@dosoul/styles";
import styled from "styled-components";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface HouseDetailNavigatorProps {}

export const HouseDetailNavigator: React.FC<
  HouseDetailNavigatorProps
> = ({}) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" }); // 부드럽게 스크롤
    }
  };

  return (
    <GallerySection>
      <NavigationContainer>
        {Object.entries(HOUSE_DETAIL_INFO_NAME).map(entry => (
          <NavButton
            key={entry[0]}
            onClick={() => scrollToSection(entry[1].id)}
          >
            {entry[1].name}
          </NavButton>
        ))}
      </NavigationContainer>
    </GallerySection>
  );
};

const GallerySection = styled.section`
  width: 100%;
`;

const NavigationContainer = styled.nav`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  @media (min-width: ${theme.systemSize.appDisplaySize.maxWidth}) {
    margin: 20px 0 0 0;
    width: 100%;
  }
`;

const NavButton = styled.button`
  color: black;
  width: 100%;
  height: 40px;
  border: 1px solid ${theme.grey.Grey3};
  border-radius: 20px;
  background: white;
  transition: all 0.4s ease;
  font: ${theme.fontSizes.Body2};

  @media (hover: hover) {
    &:hover {
      background-color: black;
      color: white;
      border: 1px solid black;
    }
  }

  @media (hover: none) {
    &:active {
      background-color: black;
      color: white;
      border: 1px solid black;
    }
  }

  @media (min-width: ${theme.systemSize.appDisplaySize.maxWidth}) {
    font: ${theme.fontSizes.Body3};
    min-width: 155px;
    height: 50px;
  }
`;
