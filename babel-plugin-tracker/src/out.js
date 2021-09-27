import _tracker2 from "tracker";
import React from "react";
import { Button } from "antd";

const testFunc = () => {};

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  handleCancel() {
    _tracker2({
      operator: "\u786E\u5B9A"
    });

    console.log("测试Button点击 [取消]埋点上报");
  }

  handleSubmit() {
    _tracker2({
      operator: "\u786E\u5B9A"
    });

    console.log("测试Button点击 [确认]埋点上报");
  } // handleSubmit = () => {
  //   console.log("测试Button点击 [确定] 埋点上报");
  // };


  render() {
    return <div>
        <Button type="primary" onClick={handleCancel}>
          取消
        </Button>

        <Button type="primary" onClick={handleSubmit}>
          确定
        </Button>
      </div>;
  }

}

export default App;