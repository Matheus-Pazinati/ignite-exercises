import { Header } from "./components/Header";
import { Post } from "./components/Post";
import { Aside } from "./components/Aside";

import './global.css';
import styles from './App.module.css';

const posts = [
  {
    author: {
      avatarUrl: 'https://github.com/Matheus-Pazinati.png',
      name: 'Matheus Pazinati',
      role: 'Web Developer'
    },
    publishedAt: new Date('2022-09-07 01:00'),
    content: [
      {
        type: 'paragraph',
        content: 'Fala galeraa 👋'
      },
      {
        type: 'paragraph',
        content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'
      },
      {
        type: 'link',
        content: '👉 jane.design/doctorcare'
      },
    ]
  },

  {
    author: {
      avatarUrl: 'https://github.com/maykbrito.png',
      name: 'Mayk Brito',
      role: 'Web Developer'
    },
    publishedAt: new Date('2022-09-07 03:00'),
    content: [
      {
        type: 'paragraph',
        content: 'Fala galeraa 👋'
      },
      {
        type: 'paragraph',
        content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'
      },
      {
        type: 'link',
        content: '👉 jane.design/doctorcare'
      },
    ]
  }
]

export function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Aside />
        <main>
          {posts.map(post => {
            return <Post />
          })}
        </main>
      </div>
    </div>
  )
}