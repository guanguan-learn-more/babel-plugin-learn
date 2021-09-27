import React from "react";

const myBook = { name: "Babel Hand Book", year: "2018" };

const testFunc = ()=>{};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.routerListener = null;
  }

//   componentDidMount() {
//     window.app.router = (namespace, type, url, ...args) => {
//       console.log("app =====>", namespace, url, type, args);
//       if (type === "location.hash") {
//         //   return (window.location.hash = newUrl);
//       }
//       if (
//         this.state.selectedNavItemKey === "process-center" &&
//         (route || isIframe)
//       ) {
//         if (type === "location.reload") {
//           // reload的时候一定是在页签形式
//           const { activeKey } = this.state;
//           this.onTabUpdate(activeKey);
//           return null;
//         }
//         if (type === "window.open") {
//           return this.onTabCreate({
//             ...other,
//             route,
//             isIframe,
//             tabKey: newUrl,
//           });
//         }
//         // 都是在当前页刷新
//         if (
//           ["location.href", "location.replace", "location.assign"].includes(
//             type
//           )
//         ) {
//           const { tabs, activeKey } = this.state;
//           const index = (tabs || []).findIndex((v) => v.tabKey === activeKey);
//           if (index !== -1) {
//             tabs[index].tabKey = newUrl;
//             tabs[index].routeParams = other.routeParams;
//             this.setState({ tabs }, () => this.onTabUpdate(newUrl));
//             return null;
//           }
//         }
//       }
//       if (type === "location.reload") {
//         return location.reload();
//       }
//       if (type === "location.href") {
//           return (window.location.href = 'baidu');
//       }
//       if (type === "location.replace") {
//         //   return location.replace(v2Url, ...args);
//       }
//       if (type === "location.assign") {
//         //   return location.assign(v2Url, ...args);
//       }
//       if (type === "window.open") {
//         // 非流程中心时，打开不带 v2 的页面，需要转成 process-center/detail?url= 的格式
//         //   if (this.state.selectedNavItemKey !== 'process-center' && other.urlNeedHaiou)
//         //     return window.open(other.urlNeedHaiou, ...args);
//         //   return window.open(v2Url, ...args);
//       }
//     };

//     this.routerListener = this.props.router.listenBefore((params) => {
//       const namespace = "caigou";
//       const { pathname, action, search, state, hash, query } = params;
//       if (action === "PUSH") {
//         this.props.router.push({
//           pathname: `/${namespace}${pathname}`,
//           query,
//           state,
//           action,
//           search,
//           hash,
//         });
//       }
//       if (action === "REPLACE") {
//         this.props.router.replace({
//           pathname: `/${namespace}${pathname}`,
//           query,
//           state,
//           action,
//           search,
//           hash,
//         });
//       }
//       return false;
//     });
//   }

  handleJump(params) {
    window.location.href = "http:www.baidu.com";
  }
  render() {
    const newBook = { ...myBook, isMine: true };
    return (
      <div>
        This is Babel Config Demo1: {newBook.name}
        <button onClick={() => this.handleJump()}>click to jump</button>
      </div>
    );
  }
}
export default App;
