import { Outlet } from "react-router-dom";
import { Header } from "../../components/layout/Header.tsx";
import { IComponentBaseProps } from "../../types.ts";
import { Footer } from "../../components/layout/Footer.tsx";
import tw from "twin.macro";

export const BaseLayout = () => {
  return (
    <div tw="flex flex-col min-h-screen ">
      <Header />
      <div tw="flex-1">
        <Outlet />
      </div>
      <Footer containerCss={[tw`hidden md:flex`]} />
    </div>
  );
};
