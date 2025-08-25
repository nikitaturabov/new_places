import RootLayout from "@/app/layout";
import { FC, PropsWithChildren } from "react";
import {Providers} from "@/app/providers";
import "@/styles/globals.css";

const App: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Providers>
      <RootLayout>
        {children}
      </RootLayout>
    </Providers>
  );
};

export default App;