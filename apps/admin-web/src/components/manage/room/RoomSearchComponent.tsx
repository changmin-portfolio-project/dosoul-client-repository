import SearchComponentTemplate from "@/components/form/search/SearchComponentTemplate";
import { QueryStateAdminRoomList } from "@/hooks/query/QueryStateAdminRoomList";
import { ROOM_SEARCH_FILTER_TYPE, roomSearchAtom } from "@/state/SearchAtom";
import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

export const RoomSearchComponent: React.FC = () => {
  const [searchState, setSearchState] = useRecoilState(roomSearchAtom);

  const { isLoading } = QueryStateAdminRoomList();

  const handleClearSearch = () => {
    setSearchState({
      keyword: "",
      filter: ROOM_SEARCH_FILTER_TYPE.ALL.value,
    });
  };

  return (
    <>
      <SearchContainer>
        <SearchComponentTemplate
          searchState={searchState}
          filterTypeList={Object.values(ROOM_SEARCH_FILTER_TYPE)}
          onKeywordAndFilterChange={(keyword, filter) =>
            setSearchState({
              keyword: keyword,
              filter: filter,
            })
          }
          onClearSearch={handleClearSearch}
          isLoading={isLoading}
        />
      </SearchContainer>
    </>
  );
};

const SearchContainer = styled.div`
  padding: 20px;
  border-radius: 12px;
`;
