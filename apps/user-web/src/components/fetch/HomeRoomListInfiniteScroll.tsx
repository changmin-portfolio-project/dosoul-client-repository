import { QueryStateHomeRoomList } from "@/hooks/query/QueryStateHomeRoomList";
import { InViewComponent } from "@dosoul/ui";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";

interface HomeRoomListInfiniteScrollProps {
  MapExploreInfiniteScrollStyle?: React.CSSProperties;
}

export const HomeRoomListInfiniteScroll: React.FC<
  HomeRoomListInfiniteScrollProps
> = ({ MapExploreInfiniteScrollStyle }) => {
  const { ref, inView } = useInView();
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data } =
    QueryStateHomeRoomList();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && data) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <ScrollBottomContainer style={MapExploreInfiniteScrollStyle} ref={ref}>
      <InViewComponent
        hasLoadingIcon={
          (data ? data?.pages[0].length > 5 : false) && hasNextPage
        }
      />
    </ScrollBottomContainer>
  );
};

const ScrollBottomContainer = styled.div`
  margin: 0px auto;
`;
