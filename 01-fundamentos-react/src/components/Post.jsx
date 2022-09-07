import { Avatar } from './Avatar';
import { Comment } from './Comment';

import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/esm/locale/pt-BR/index.js';

import styles from './Post.module.css';


export function Post({ author, publishedAt }) {
  const dateFormatted = format(publishedAt, "d 'de' LLLL 'ás' HH:mm'h'", {
    locale: ptBR
  })
  const timeBetweenPostAndNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  })
  const dateAndTime = format(publishedAt, "dd'/'LL'/'uuuu HH:mm")

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
              title={dateFormatted} 
              dateTime={dateAndTime}>
              {timeBetweenPostAndNow}
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