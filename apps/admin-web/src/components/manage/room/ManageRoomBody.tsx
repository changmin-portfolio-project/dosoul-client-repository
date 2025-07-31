import { AdminRoomListInfiniteScroll } from "@/components/infinite-scroll/AdminRoomListInfiniteScroll";
import { APP_PATH } from "@/global/const/AppPathConst";
import { QueryStateAdminRoomList } from "@/hooks/query/QueryStateAdminRoomList";
import MakeButtonIcon from "@dosoul/assets/images/icons/button/MakeButtonIcon.svg?react";
import theme from "@dosoul/styles";
import { ManageTableTemplate } from "@dosoul/ui";
import { formatDate, getRoomTypeDisplay } from "@dosoul/utils";
import React from "react";
import { generatePath, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RoomSearchComponent } from "./RoomSearchComponent";

interface ManageRoomBodyProps {
  ManageRoomBodyStyle: React.CSSProperties;
}

export const ManageRoomBody: React.FC<ManageRoomBodyProps> = ({
  ManageRoomBodyStyle,
}) => {
  const navigate = useNavigate();

  const { data: adminRoomList } = QueryStateAdminRoomList();

  const HOME_TABLE_TITLE_LIST = [
    { titleName: "No" },
    { titleName: "하우스" },
    { titleName: "주거형태" },
    { titleName: "등록일" },
  ];

  return (
    <>
      <ManageTableTemplate
        TopComponent={<RoomSearchComponent />}
        ManageTableTemplateStyle={ManageRoomBodyStyle}
        HeadTitleList={
          window.innerWidth <= theme.systemSize.appDisplaySize.maxWidthNum
            ? HOME_TABLE_TITLE_LIST.slice(0, 1).concat(
                HOME_TABLE_TITLE_LIST.slice(2),
              )
            : HOME_TABLE_TITLE_LIST
        }
        bodyTableList={
          adminRoomList?.pages
            .flatMap(v => v)
            .map((v, i) => {
              return {
                tableColumnTitleList:
                  window.innerWidth <=
                  theme.systemSize.appDisplaySize.maxWidthNum
                    ? [
                        {
                          titleName: (i + 1).toString(),
                          ColumnStyle: { width: "50px" },
                        },
                        { titleName: v.roomName },

                        { titleName: formatDate(v.createdAt) },
                      ]
                    : [
                        {
                          titleName: (i + 1).toString(),
                          ColumnStyle: { width: "50px" },
                        },
                        {
                          titleName: v.roomName,

                          AnotherStyleNode: (
                            <Th>
                              <ThContainer>
                                <ThContent>
                                  <ThName>{v.roomName}</ThName>
                                </ThContent>
                              </ThContainer>
                            </Th>
                          ),
                        },
                        { titleName: getRoomTypeDisplay(v.roomType) },
                        { titleName: formatDate(v.createdAt) },
                      ],
                onClick: () => {
                  navigate(
                    generatePath(APP_PATH.MANAGE.ROOM_DETAIL, {
                      roomId: v.roomNumber,
                    }),
                  );
                },
              };
            }) ?? []
        }
        TableInfiniteScrollComponent={<AdminRoomListInfiniteScroll />}
      />

      <div style={{ position: "fixed", bottom: 20, right: 20 }}>
        <div
          style={{
            cursor: "pointer",
            display: "flex",
            padding: "20px",
            borderRadius: "50%",
            background: "white",
            boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
          }}
          onClick={() => {
            navigate(APP_PATH.MANAGE.ROOM_MAKE);
          }}
        >
          <MakeButtonIcon />
        </div>
      </div>
    </>
  );
};

const Th = styled.th`
  padding: 10px 15px;
  position: relative;
`;

const ThContent = styled.div`
  display: flex;
  gap: 8px;
`;

const ThContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ThName = styled.div`
  font: ${theme.fontSizes.Body3};
  color: ${theme.grey.Grey7};
  font-size: 16px;
  text-align: center;
`;
