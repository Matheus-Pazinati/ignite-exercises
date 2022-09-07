import { Avatar } from './Avatar';
import { Comment } from './Comment';

import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/esm/locale/pt-BR/index.js';

import styles from './Post.module.css';


export function Post({ author, publishedAt, content }) {
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
        {content.map(line => {
          if (line.type === "paragraph") {
            return <p>{line.content}</p>
          } else if (line.type === "link") {
            return <p><a href="#">{line.content}</a></p>
          }
        })}
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