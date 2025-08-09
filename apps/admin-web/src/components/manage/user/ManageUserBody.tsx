import { AdminUserListInfiniteScroll } from "@/components/infinite-scroll/AdminUserListInfiniteScroll";
import { UserDetailPopup } from "@/components/popup/user/UserDetailPopup";
import { QueryStateAdminUserList } from "@/hooks/query/QueryStateAdminUserList";
import { UsersByAdminApiResponse } from "@/services/user/getUsersByAdmin";
import { USER_DOMAIN_ROLE, USER_DOMAIN_STATUS } from "@dosoul/consts";
import theme from "@dosoul/styles";
import { ManageTableCol, ManageTableTemplate } from "@dosoul/ui";
import {
  formatDate,
  getUserRoleDisplay,
  getUserStatueDisplay,
} from "@dosoul/utils";
import React, { useState } from "react";
import styled from "styled-components";
import { UserSearchComponent } from "./UserSearchComponent";

interface ManageUserBodyProps {
  ManageUserBodyStyle: React.CSSProperties;
}

export const ManageUserBody: React.FC<ManageUserBodyProps> = ({
  ManageUserBodyStyle,
}) => {
  const { data: adminUserList } = QueryStateAdminUserList();

  const MANAGE_MOVE_IN_TITLE_LIST = [
    { titleName: "사용자 ID" },
    { titleName: "가입 이메일" },
    { titleName: "이름" },
    { titleName: "역할" },
    { titleName: "상태" },
    { titleName: "가입일" },
  ];

  const [isUserDetailPopupOpen, setIsUserDetailPopupOpen] = useState<{
    data: UsersByAdminApiResponse | null;
    isOpen: boolean;
  }>({
    isOpen: false,
    data: null,
  });
  const onCloseUserDetailPopup = () => {
    setIsUserDetailPopupOpen({
      isOpen: false,
      data: null,
    });
  };

  return (
    <>
      <ManageTableTemplate
        TopComponent={<UserSearchComponent />}
        ManageTableTemplateStyle={ManageUserBodyStyle}
        HeadTitleList={MANAGE_MOVE_IN_TITLE_LIST}
        bodyTableList={
          adminUserList
            ? adminUserList.pages
                .flatMap(v => v)
                .map(v => {
                  return {
                    tableColumnTitleList: [
                      {
                        titleName: v.id,
                        AnotherStyleNode: (
                          <ManageTableCol>
                            <TdSubWrap>{v.id}</TdSubWrap>
                          </ManageTableCol>
                        ),
                      },
                      { titleName: v.signupEmail },
                      { titleName: v.fullName },

                      {
                        titleName: getUserRoleDisplay(v.serviceAppRole),
                        ColumnStyle: {
                          color:
                            v.serviceAppRole === USER_DOMAIN_ROLE.ROLE_ADMIN
                              ? theme.mainColor.Blue
                              : "black",
                        },
                      },
                      {
                        titleName: getUserStatueDisplay(v.serviceUserState),
                        ColumnStyle: {
                          color:
                            v.serviceUserState === USER_DOMAIN_STATUS.ACTIVE
                              ? theme.mainColor.Blue
                              : theme.mainColor.Red,
                        },
                      },

                      { titleName: formatDate(v.createdAt) },
                    ],
                    onClick: () => {
                      setIsUserDetailPopupOpen({
                        isOpen: true,
                        data: v,
                      });
                    },
                  };
                })
            : []
        }
        TableInfiniteScrollComponent={<AdminUserListInfiniteScroll />}
      />

      {isUserDetailPopupOpen.isOpen && (
        <UserDetailPopup
          isOpen={isUserDetailPopupOpen.isOpen}
          onClose={onCloseUserDetailPopup}
          data={isUserDetailPopupOpen.data}
        />
      )}
    </>
  );
};

const TdSubWrap = styled.div`
  white-space: nowrap; /* 줄바꿈 방지 */
  overflow: hidden; /* 넘친 부분 숨김 */
  text-overflow: ellipsis; /* 말줄임표(...) 표시 */
  margin: 0 auto;
`;
