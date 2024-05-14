function getScrollParent(node: any): HTMLElement {
  const isElement = node instanceof HTMLElement;
  const overflowY = isElement && window.getComputedStyle(node).overflowY;
  const isScrollable = overflowY !== 'visible' && overflowY !== 'hidden';

  if (isScrollable && node.scrollHeight >= node.clientHeight) {
    return node;
  }

  const parentNode = node.parentNode ? getScrollParent(node.parentNode) : null;
  return (parentNode || document.scrollingElement || document.body) as any;
}

export const scrollToError = () => {
  const elements = Array.from(document.getElementsByClassName('scrollable-error') ?? []);

  if (elements.length === 0) {
    return;
  }
  const element = elements[0];
  const { top } = element.getBoundingClientRect();

  // STATEMENT: Why can't I use window.scroll or element.scrollIntoView?
  // Even though these methods would work in most cases, there are situations(scroll in overlay, drawer, etc.)
  // where window element isn't scrollable. Idea is to traverse the DOM and find the first scrollable node.
  // Find out more about implementation here: https://gist.github.com/twxia/bb20843c495a49644be6ea3804c0d775
  const parent = getScrollParent(element);
  parent.scrollTo({
    // STATEMENT: Why do we scroll with -200 offset?
    // It's done to avoid the unpredictability of the element with the "scrollable-error" class.
    // We don't know for sure if this class is mounted above, left, rigt or below the form element.
    // Therefore, it's easier to just to go a bit more up.
    top: top + window.pageYOffset - 200,
    behavior: 'smooth'
  });
};

export const getFileSizeInKB = (size: number) => {
  const fileSizeInKB = Math.ceil(size / 1024);
  return fileSizeInKB.toString().padStart(3, '0');
};
