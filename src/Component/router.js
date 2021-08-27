const ROUTE_CHANGE_EVENT_NAME = "route-change";

export const initRouter = (onRoute) => {
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
    const { nextURL } = e.detail;

    if (nextURL) {
      history.pushState(null, null, nextURL);
      onRoute();
    }
  });
};

export const push = (nextURL) => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_CHANGE_EVENT_NAME, {
      detail: {
        nextURL,
      },
    })
  );
};
