import { Header } from "./components/Header";
import { Post } from "./Post";
import { Aside } from "./components/Aside";

import './global.css';
import styles from './App.module.css';

export function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Aside />
        <div>
          <Post 
            author="Pedro" 
            content="Meu primeiro post" 
          />
          <Post 
            author="Carol" 
            content="Meu segundo post" 
          />
        </div>
      </div>
    </div>
  )
}