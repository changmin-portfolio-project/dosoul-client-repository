import React from 'react';
import { RecoilRoot } from 'recoil';
import { DosoulButton } from '@dosoul/ui';

function App() {
  return (
    <RecoilRoot>
      <div>
        <h1>두솔 - 관리자 웹</h1>
        <DosoulButton variant="secondary">관리자 로그인</DosoulButton>
      </div>
    </RecoilRoot>
  );
}

export default App;
