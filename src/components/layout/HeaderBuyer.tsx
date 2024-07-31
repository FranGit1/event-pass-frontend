import { Button } from "../../ui/buttons/Button";
import { Typography } from "../../ui/Typography";
import tw from "twin.macro";
import { PageContainer } from "./PageContainer";

export const HeaderBuyer = () => {
  return (
    <PageContainer containerCss={[tw`px-30!`]}>
      <div tw="w-full flex flex-row justify-between items-center ">
        <img
          tw="h-20 w-20"
          src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1721433600&semt=sph"
          alt=""
        />
        <div tw="flex flex-row  items-center justify-center">
          <Typography.H3 containerCss={[tw`uppercase text-primary mr-8`]}>
            Kontaktiraj nas
          </Typography.H3>
          <Button.Outlined containerCss={[tw`h-fit`]}>PRIJAVA</Button.Outlined>
        </div>
      </div>
    </PageContainer>
  );
};
