import React from "react";

import "./App.scss";

function App() {
  const styles = {
    wrapper: "app__wrapper",
    header: "app__header",
    logo: "app__logo",
    text: "app__text",
    link: "app__link",
  };
  return (
    <div data-testid="app" className={styles.wrapper}>
      <header className={styles.header}>
        <img src="/react.png" className={styles.logo} alt="React logo." />
        <p className={styles.text}>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className={styles.link} href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
