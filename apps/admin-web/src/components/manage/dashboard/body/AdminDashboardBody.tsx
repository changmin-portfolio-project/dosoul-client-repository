import { APP_PATH } from "@/global/const/AppPathConst";
import { getDashboardSummary } from "@/services/admin/getDashboardSummary";
import { getRecentMoveInsByAdmin } from "@/services/room/getRecentMoveInsByAdmin";
import { ROOM_MOVE_IN_DOMAIN_STATUS } from "@dosoul/consts";
import theme from "@dosoul/styles";
import { getRoomMoveinStatusDisplay } from "@dosoul/utils";
import React, { useEffect, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  DocumentIcon,
  HomeIcon,
  UsersIcon,
} from "./icons";

interface DashboardStats {
  totalUsers: number;
  userGrowthRate: number;
  totalRooms: number;
  pendingMoveIns: number;
  pendingMoveOuts: number;
  activeUsers: number;
  availableRooms: number;
}

type RoomMoveInDomainStatusValues =
  (typeof ROOM_MOVE_IN_DOMAIN_STATUS)[keyof typeof ROOM_MOVE_IN_DOMAIN_STATUS]["value"];

interface RecentMoveInActivity {
  moveInId: string;
  residentName: string;
  roomName: string;
  roomAddress: string;
  moveInDate: string;
  approvalStatus: RoomMoveInDomainStatusValues;
  createdAt: string;
}

interface AdminDashboardBodyProps {
  style?: React.CSSProperties;
}

export const AdminDashboardBody: React.FC<AdminDashboardBodyProps> = ({
  style,
}) => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    userGrowthRate: 0,
    totalRooms: 0,
    pendingMoveIns: 0,
    pendingMoveOuts: 0,
    activeUsers: 0,
    availableRooms: 0,
  });

  const [recentMoveIns, setRecentMoveIns] = useState<RecentMoveInActivity[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 실제 API 호출로 대체
    fetchDashboardData();
  }, []);

  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      // 대시보드 요약 데이터 API 호출
      const dashboardSummary = await getDashboardSummary();
      setStats(dashboardSummary);

      // 최근 입주 신청 데이터 API 호출
      const recentMoveInsData = await getRecentMoveInsByAdmin(0, 10);
      const formattedMoveIns: RecentMoveInActivity[] = recentMoveInsData.map(
        item => ({
          moveInId: item.moveInId,
          residentName: item.residentName,
          roomName: item.roomName,
          roomAddress: item.roomAddress,
          moveInDate: item.moveInDate,
          approvalStatus: item.approvalStatus,
          createdAt: item.createdAt,
        }),
      );

      setRecentMoveIns(formattedMoveIns);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  if (isLoading) {
    return (
      <DashboardContainer>
        <LoadingSpinner>로딩 중...</LoadingSpinner>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer style={style}>
      <DashboardSubContainer>
        <DashboardHeader>
          <HeaderTitle>어드민 대시보드</HeaderTitle>
          <HeaderSubtitle>
            시스템 현황과 최근 활동을 한눈에 확인하세요
          </HeaderSubtitle>
        </DashboardHeader>

        <StatsGrid>
          <StatCard>
            <StatIcon>
              <UsersIcon />
            </StatIcon>
            <StatContent>
              <StatValue>{formatNumber(stats.totalUsers)}</StatValue>
              <StatLabel>총 사용자</StatLabel>
              <div style={{ display: "flex", gap: "8px" }}>
                <StatChange $isPositive={stats.userGrowthRate >= 0}>
                  {stats.userGrowthRate >= 0 ? (
                    <ArrowUpIcon />
                  ) : (
                    <ArrowDownIcon />
                  )}
                  {Math.abs(stats.userGrowthRate)}%
                </StatChange>
                <StatSubValue>
                  {formatNumber(stats.activeUsers)}명 활성
                </StatSubValue>
              </div>
            </StatContent>
          </StatCard>

          <StatCard>
            <StatIcon>
              <HomeIcon />
            </StatIcon>
            <StatContent>
              <StatValue>{stats.totalRooms}</StatValue>
              <StatLabel>총 방 수</StatLabel>
              <StatChange $isPositive={stats.availableRooms > 0}>
                <ArrowUpIcon />
                {stats.availableRooms}개 사용 가능
              </StatChange>
            </StatContent>
          </StatCard>

          <StatCard>
            <StatIcon>
              <DocumentIcon />
            </StatIcon>
            <StatContent>
              <StatValue>{stats.pendingMoveIns}</StatValue>
              <StatLabel>대기 중인 입주 요청</StatLabel>
              <StatChange $isPositive={false}>
                <ArrowDownIcon />
                처리 필요
              </StatChange>
            </StatContent>
          </StatCard>

          <StatCard>
            <StatIcon>
              <DocumentIcon />
            </StatIcon>
            <StatContent>
              <StatValue>{stats.pendingMoveOuts}</StatValue>
              <StatLabel>대기 중인 퇴실 요청</StatLabel>
              <StatChange $isPositive={false}>
                <ArrowDownIcon />
                처리 필요
              </StatChange>
            </StatContent>
          </StatCard>
        </StatsGrid>

        <DashboardContent>
          <ContentSection>
            <SectionHeader>
              <SectionTitle>최근 입주 신청</SectionTitle>
              <SectionAction onClick={() => navigate(APP_PATH.MANAGE.MOVE_IN)}>
                모두 보기
              </SectionAction>
            </SectionHeader>

            <ActivityList>
              {recentMoveIns.map(moveIn => (
                <ActivityItem
                  key={moveIn.moveInId}
                  onClick={() =>
                    navigate(
                      generatePath(APP_PATH.MANAGE.MOVE_IN_DETAIL, {
                        moveinId: moveIn.moveInId,
                      }),
                    )
                  }
                >
                  <ActivityIcon>
                    <DocumentIcon />
                  </ActivityIcon>
                  <ActivityContent>
                    <ActivityMessage>
                      {moveIn.residentName}님의 {moveIn.roomName} 입주 신청
                    </ActivityMessage>
                    <ActivityMeta>
                      <ActivityTime>
                        {new Date(moveIn.createdAt).toLocaleString("ko-KR")}
                      </ActivityTime>
                      <ActivityStatus>
                        {getRoomMoveinStatusDisplay(moveIn.approvalStatus)}
                      </ActivityStatus>
                    </ActivityMeta>
                  </ActivityContent>
                </ActivityItem>
              ))}
            </ActivityList>
          </ContentSection>

          <ContentSection>
            <SectionHeader>
              <SectionTitle>빠른 액션</SectionTitle>
            </SectionHeader>

            <QuickActionsGrid>
              <QuickActionCard onClick={() => navigate(APP_PATH.MANAGE.USER)}>
                <QuickActionIcon>
                  <UsersIcon />
                </QuickActionIcon>
                <QuickActionTitle>사용자 관리</QuickActionTitle>
                <QuickActionDescription>
                  사용자 정보 조회 및 수정
                </QuickActionDescription>
              </QuickActionCard>

              <QuickActionCard onClick={() => navigate(APP_PATH.MANAGE.ROOM)}>
                <QuickActionIcon>
                  <HomeIcon />
                </QuickActionIcon>
                <QuickActionTitle>방 관리</QuickActionTitle>
                <QuickActionDescription>
                  방 정보 등록 및 수정
                </QuickActionDescription>
              </QuickActionCard>

              <QuickActionCard
                onClick={() => navigate(APP_PATH.MANAGE.MOVE_IN)}
              >
                <QuickActionIcon>
                  <DocumentIcon />
                </QuickActionIcon>
                <QuickActionTitle>요청 처리</QuickActionTitle>
                <QuickActionDescription>입주 요청 승인</QuickActionDescription>
              </QuickActionCard>

              <QuickActionCard
                onClick={() => navigate(APP_PATH.MANAGE.MOVE_OUT)}
              >
                <QuickActionIcon>
                  <DocumentIcon />
                </QuickActionIcon>
                <QuickActionTitle>요청 처리</QuickActionTitle>
                <QuickActionDescription>퇴실 요청 승인</QuickActionDescription>
              </QuickActionCard>
            </QuickActionsGrid>
          </ContentSection>
        </DashboardContent>
      </DashboardSubContainer>
    </DashboardContainer>
  );
};

// 스타일 컴포넌트들
const DashboardContainer = styled.div`
  min-height: 100vh;
`;

const DashboardSubContainer = styled.div`
  padding: 24px;
`;

const DashboardHeader = styled.div`
  margin-bottom: 32px;
  text-align: center;
`;

const HeaderTitle = styled.h1`
  font: ${theme.fontSizes.Headline1};
  color: ${theme.grey.Grey9};
  margin: 0 0 8px 0;
  font-weight: 700;
`;

const HeaderSubtitle = styled.p`
  font: ${theme.fontSizes.Body2};
  color: ${theme.grey.Grey6};
  margin: 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;

const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: ${theme.mainColor.DosoulGradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
`;

const StatContent = styled.div`
  flex: 1;
`;

const StatValue = styled.div`
  font: ${theme.fontSizes.Headline2};
  color: ${theme.grey.Grey9};
  font-weight: 700;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font: ${theme.fontSizes.Body3};
  color: ${theme.grey.Grey6};
  margin-bottom: 4px;
`;

const StatSubValue = styled.div`
  font: ${theme.fontSizes.Body4};

  font-weight: 500;
`;

const StatChange = styled.div<{ $isPositive: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  font: ${theme.fontSizes.Body4};
  color: ${props =>
    props.$isPositive ? theme.mainColor.Blue : theme.mainColor.Red};
  font-weight: 500;
`;

const DashboardContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;

  @media (max-width: ${theme.systemSize.appDisplaySize.desktopMaxWidth}) {
    grid-template-columns: 1fr;
  }
`;

const ContentSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font: ${theme.fontSizes.Subhead2};
  color: ${theme.grey.Grey9};
  margin: 0;
  font-weight: 600;
`;

const SectionAction = styled.button`
  background: none;
  border: none;
  color: black;
  font: ${theme.fontSizes.Body3};
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.grey.Grey1};
  }
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
  background: ${theme.grey.Grey1};
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.grey.Grey2};
  }
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${theme.mainColor.DosoulGradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  flex-shrink: 0;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityMessage = styled.div`
  font: ${theme.fontSizes.Body3};
  color: ${theme.grey.Grey8};
  margin-bottom: 8px;
  line-height: 1.4;
`;

const ActivityMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActivityTime = styled.div`
  font: ${theme.fontSizes.Body4};
  color: ${theme.grey.Grey6};
`;

const ActivityStatus = styled.div`
  font: ${theme.fontSizes.Body3};
  color: ${theme.grey.Grey6};
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 6px;
  background: ${theme.grey.Grey1};
`;

const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const QuickActionCard = styled.div`
  padding: 20px;
  border: 2px solid ${theme.grey.Grey3};
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${theme.mainColor.DosoulOrange};
    background: ${theme.grey.Grey1};
    transform: translateY(-2px);
  }
`;

const QuickActionIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${theme.mainColor.DosoulGradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  margin: 0 auto 16px auto;
`;

const QuickActionTitle = styled.div`
  font: ${theme.fontSizes.Body2};
  color: ${theme.grey.Grey8};
  font-weight: 600;
  margin-bottom: 8px;
`;

const QuickActionDescription = styled.div`
  font: ${theme.fontSizes.Body4};
  color: ${theme.grey.Grey6};
  line-height: 1.4;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font: ${theme.fontSizes.Body2};
  color: ${theme.grey.Grey6};
`;
