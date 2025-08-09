import SearchComponentTemplate from "@/components/form/search/SearchComponentTemplate";
import { QueryStateAdminUserList } from "@/hooks/query/QueryStateAdminUserList";
import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  USER_SEARCH_FILTER_TYPE,
  userSearchAtom,
} from "../../../state/SearchAtom";

export const UserSearchComponent: React.FC = () => {
  const [searchState, setSearchState] = useRecoilState(userSearchAtom);

  const { isLoading } = QueryStateAdminUserList();

  const handleClearSearch = () => {
    setSearchState({
      keyword: "",
      filter: USER_SEARCH_FILTER_TYPE.ALL.value,
    });
  };

  return (
    <>
      <SearchContainer>
        <SearchComponentTemplate
          searchState={searchState}
          filterTypeList={Object.values(USER_SEARCH_FILTER_TYPE)}
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
