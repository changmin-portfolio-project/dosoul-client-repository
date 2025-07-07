import React from 'react';
import { RecoilRoot } from 'recoil';
import { DosoulButton, LoadingComponent } from '@dosoul/ui';

function App() {
  return (
    <RecoilRoot>
      <div>
        <h1>두솔 - 사용자 웹</h1>
        <DosoulButton>로그인</DosoulButton>
        <LoadingComponent />
      </div>
    </RecoilRoot>
  );
}

export default App;
