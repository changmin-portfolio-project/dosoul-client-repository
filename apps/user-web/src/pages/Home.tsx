import React from 'react';
import { DosoulButton } from '@dosoul/ui';

export const Home: React.FC = () => {
  return (
    <div>
      <h2>홈페이지</h2>
      <p>두솔 청년 주택 관리 서비스에 오신 것을 환영합니다.</p>
      <DosoulButton>방 둘러보기</DosoulButton>
    </div>
  );
};
