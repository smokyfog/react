// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from 'react'
import { addGUN } from './index.redux'

class App extends React.Component{
  // constructor(props) {
  //   super(props)
  // }
  render() {
      const store = this.props.store
      const num = store.getState()
      return (
      <div className="App">
        现在有机枪{num}把
        <button onClick={()=>store.dispatch(addGUN())}>申请武器</button>
      </div>
    );
  }
}

export default App