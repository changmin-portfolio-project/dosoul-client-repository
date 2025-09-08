import { WindowSizeListener } from "@dosoul/hooks";
import "@root/styles/keyframes.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { Reset } from "styled-reset";
import "./App.css";
import AppRouter from "./AppRouter";
import queryClient from "./config/QueryClientConfig";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Reset />
        <AppRouter />
        <WindowSizeListener />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
