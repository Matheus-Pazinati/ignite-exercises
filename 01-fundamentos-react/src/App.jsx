import { Header } from "./components/Header";
import { Post } from "./components/Post";
import { Aside } from "./components/Aside";

import './global.css';
import styles from './App.module.css';

export function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Aside />
        <main>
          <Post />
          <Post />
        </main>
      </div>
    </div>
  )
}