import React from 'react';
import { DosoulButton } from '@dosoul/ui';

export const AdminDashboard: React.FC = () => {
  return (
    <div>
      <h2>관리자 대시보드</h2>
      <div>
        <DosoulButton>사용자 관리</DosoulButton>
        <DosoulButton variant="secondary">방 관리</DosoulButton>
      </div>
    </div>
  );
};
