import 'twin.macro';

import React, { PropsWithChildren } from 'react';

import { Button } from '../ui/buttons/Button';
import { CenterContainer } from './layout/CenterContainer';
import { Typography } from '../ui/Typography';
import tw from 'twin.macro';

export class ErrorBoundary extends React.Component<PropsWithChildren<any>, { hasError: boolean }> {
  public constructor(props: PropsWithChildren<any>) {
    super(props);
    this.state = { hasError: false };
  }
  public static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  public componentDidCatch(error: any, errorInfo: any): void {
    console.error(error, errorInfo);
  }

  public render(): JSX.Element | any {
    if (!this.state.hasError) {
      return this.props.children;
    }
    return (
      <CenterContainer>
        <div css={[tw`flex flex-col justify-center items-center text-center`]}>
          <Typography.H3 containerCss={[tw`mb-6`]}>Something went wrong</Typography.H3>
          <Typography.Body containerCss={[tw`mb-10`]}>Please try again</Typography.Body>
          <Button.Contained
            onClick={() => {
              window.location.reload();
            }}
            containerCss={[tw`min-w-60`]}
          >
            Reload
          </Button.Contained>
        </div>
      </CenterContainer>
    );
  }
}
