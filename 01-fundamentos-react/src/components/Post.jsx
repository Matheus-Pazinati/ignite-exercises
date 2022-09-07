import { Avatar } from './Avatar';
import { Comment } from './Comment';

import styles from './Post.module.css';

export function Post({ author }) {
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.user}>
          <Avatar source={author.avatarUrl} />
          <div className={styles.info}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <div className={styles.time}>
            <time 
              title='5 de Setembro de 2022 ás 03:58 da manhã' 
              dateTime='05/09/2022 03:58'>
              Publicado há 1h
            </time>
        </div>
      </header>

      <div className={styles.content}>
        <p>Fala galeraa 👋</p>
        <p>Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀</p>
        <p><a href='#'>👉 jane.design/doctorcare</a></p>
        <p className={styles.hashtags}>
          <a href="">#novoprojeto</a>
          <a href="">#nlw</a>
          <a href="">#rocketseat</a>
        </p>
      </div>

      <form className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea placeholder='Escreva um comentário...' />
        <footer>
          <button>Publicar</button>
        </footer>
      </form>
      <div className={styles.commentBox}>
        <Comment />
        <Comment />
        <Comment />
      </div>
    </article>
  )
}