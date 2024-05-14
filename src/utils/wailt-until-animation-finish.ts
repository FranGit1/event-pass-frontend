export const waitUntilAnimationFinish = async (element: any) => {
  return new Promise((resolve, reject) => {
    if (element == null) {
      return resolve(null);
    }
    setTimeout(() => {
      Promise.all(
        element.getAnimations().map((animation: any) => {
          return animation.finished;
        })
      )
        .then(resolve)
        .catch(reject);
    }, 0);
  });
};
