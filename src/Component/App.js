import { initRouter } from "./router.js";
import MainPage from "./MainPanel/MainPage.js";
import SidePage from "./SidePanel/SidePage.js";

export default function App({ $target }) {
  const sidePage = new SidePage({ $target });
  const mainPage = new MainPage({
    $target,
    init: [],
  });

  this.route = () => {
    // $target.innerHTML = ``;
    const { pathname } = location;
    if (pathname === "/") {
      // sidePage.setState();
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , documentId] = pathname.split("/");
      // console.log(documentId);
      mainPage.setState({ documentId });
    }
  };

  this.route();
  initRouter(() => this.route());
}
