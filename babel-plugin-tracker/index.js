import React from "react";
import { Button } from 'antd';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    console.log('自动化埋点-Button上报')
 }
  render() {
    return (
      <div>
         <Button type="primary" onClick={handleClick}>
          点击
        </Button>
      </div>
    );
  }
}
export default App;
