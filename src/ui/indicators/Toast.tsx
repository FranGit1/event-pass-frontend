import { HiExclamation, HiInformationCircle } from 'react-icons/hi';
import { ReactComponent as Error } from '../../assets/icons/error.svg';
import { ReactComponent as Success } from '../../assets/icons/ok-circle.svg';
import { IconType } from 'react-icons';
import { toast as reactToast } from 'react-toastify';
import tw from 'twin.macro';
import { Typography } from '../Typography';
import { Button } from '../buttons/Button';
import { useTranslation } from 'react-i18next';

interface IBaseToastProps {
  text: string;
  icon: IconType;
  // STATEMENT: Why are these 2 properties defined if we don't pass them through props.
  // This is a common pattern in React. To the end user are only exposed public properties
  // and the rest is injected by using React.cloneElement in library code.
  // Look here for examples: https://blog.logrocket.com/using-react-cloneelement-function/
  closeToast?: () => void;
  toastProps?: any;
  loginToast?: boolean;
}

const BaseToast = (props: IBaseToastProps) => {
  const { t } = useTranslation();

  const Icon = props.icon;
  return (
    <div tw="flex flex-row items-center gap-x-8 w-full">
      <div tw="m-3 flex flex-row items-center gap-3">
        <Icon tw="h-12 w-12 w-2/12" />
        <Typography.Body containerCss={[tw`text-black h-fit  w-10/12 m-0 p-0`]}>{props.text}</Typography.Body>
      </div>
      {props.loginToast && <Button.Contained>{t('login')}</Button.Contained>}
    </div>
  );
};

const bodyStyle = tw`m-0 p-0 relative`;
// STATEMENT: This isn't going to cut it. I need more options to achieve specific behaviour.
// Look at the App.tsx file. There is ToastContainer component which has many properties(duration, position, etc.)
export const toast = {
  error: (text?: string) =>
    //@ts-ignore
    reactToast(<BaseToast text={text ?? 'Something went wrong.'} icon={Error} />, {
      style: tw` h-fit`,
      bodyStyle
    }),
  login: (text?: string) =>
    //@ts-ignore
    reactToast(<BaseToast text={text ?? 'Something went wrong.'} icon={Error} loginToast={true} />, {
      style: tw` h-fit`,
      bodyStyle
    }),
  warning: (text: string) =>
    reactToast(<BaseToast text={text} icon={HiExclamation} />, {
      style: tw` h-fit`,
      bodyStyle
    }),
  info: (text: string) =>
    reactToast(<BaseToast text={text} icon={HiInformationCircle} />, {
      style: tw` h-fit`,
      bodyStyle
    }),
  success: (text: string) =>
    //@ts-ignore
    reactToast(<BaseToast text={text} icon={Success} />, {
      style: tw` h-fit`,
      bodyStyle
    })
};
