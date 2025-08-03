import SearchComponentTemplate from "@/components/form/search/SearchComponentTemplate";
import { QueryStateAdminRoomMoveinList } from "@/hooks/query/QueryStateAdminRoomMoveinList";
import {
  MOVE_IN_SEARCH_FILTER_TYPE,
  moveInSearchAtom,
} from "@/state/SearchAtom";
import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

export const MoveInSearchComponent: React.FC = () => {
  const [searchState, setSearchState] = useRecoilState(moveInSearchAtom);

  const { isLoading } = QueryStateAdminRoomMoveinList();

  const handleClearSearch = () => {
    setSearchState({
      keyword: "",
      filter: MOVE_IN_SEARCH_FILTER_TYPE.ALL.value,
    });
  };

  return (
    <>
      <SearchContainer>
        <SearchComponentTemplate
          searchState={searchState}
          filterTypeList={Object.values(MOVE_IN_SEARCH_FILTER_TYPE)}
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
