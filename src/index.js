import React from 'react';
import { render } from 'react-dom';
import { VictoryChart, VictoryScatter, VictorySelectionContainer } from "victory";

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (<div>
      <VictoryChart
        containerComponent={
          <VictorySelectionContainer />
        }
      >
        <VictoryScatter
          style={{ data: { fill: (d, active) => active ? "tomato" : "gray" } }}
          sixe={1}
          data={Array(20000).fill({ x: 1000000, y: 1000000 }).map(x => ({ x: Math.random() * x.x, y: Math.random() * x.y }))}
        />
      </VictoryChart>
    </div>
    );
  }
}

render(<App />, document.getElementById('root'));