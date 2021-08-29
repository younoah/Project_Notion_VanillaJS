const ROUTE_CHANGE_EVENT = 'ROUTE_CHANGE';

export const push = (nextUrl) => {
  console.log('push 실행 후')
  window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT, {
    detail : {
      nextUrl
    }
  }))
}

export const initRouter = (onRoute) => {
  
  window.addEventListener(ROUTE_CHANGE_EVENT, e => {
    console.log('initRouter 실행 후 ')
    const { nextUrl } = e.detail;

    if(nextUrl) {
      history.pushState(null,null,nextUrl);
      onRoute();
    }
  })
}