import React from 'react';
import { TodoState } from './context/TodoState';
import { Home } from './pages/Home';
import styles from './Style.module.css'
function App() {
  return (
    <TodoState>
    <div className={styles.container}>
      <Home />
      </div>
    </TodoState>
  );
}

export default App;
