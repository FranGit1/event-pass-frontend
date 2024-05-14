import { Breakpoint } from '../types';

export const breakpointWidth = {
  [Breakpoint.XS]: 420,
  [Breakpoint.SM]: 640,
  [Breakpoint.MD]: 1200,
  [Breakpoint.LG]: 1024,
  [Breakpoint.XL]: 1280,
  [Breakpoint.XL_2]: 1536
};

const breakpointsArray = [
  {
    screen: Breakpoint.XS_2,
    width: 0
  },
  {
    screen: Breakpoint.XS,
    width: 420
  },
  { screen: Breakpoint.SM, width: 640 },
  { screen: Breakpoint.MD, width: 1200 },
  { screen: Breakpoint.LG, width: 1024 },
  { screen: Breakpoint.XL, width: 1280 },
  { screen: Breakpoint.XL_2, width: 1536 }
];

export const getBreakpoint = (): Breakpoint => {
  const { width } = window.screen;
  for (let i = 1; i < breakpointsArray.length; i++) {
    const previous = breakpointsArray[i - 1];
    const current = breakpointsArray[i];
    const isBetween = previous.width <= width && current.width >= width;
    if (isBetween) {
      return previous.screen;
    }
  }
  return breakpointsArray[breakpointsArray.length - 1].screen;
};

export const responsiveMultiple = {
  large: {
    breakpoint: { max: 3000, min: 2300 },
    items: 2,
    partialVisibilityGutter: 50
  },
  desktop: {
    breakpoint: { max: 2200, min: 1024 },
    items: 2,
    partialVisibilityGutter: 40
  },
  tablet: {
    breakpoint: { max: 1200, min: 464 },
    items: 1,
    partialVisibilityGutter: 30
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 30
  }
};

export const responsiveSingle = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
