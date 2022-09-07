import { Avatar } from './Avatar'

import { Trash, ThumbsUp } from "phosphor-react"

import styles from './Comment.module.css'


export function Comment({ content }) {
  return (
    <div className={styles.comment}>
      <Avatar
       source={'https://github.com/Matheus-Pazinati.png'} 
       hasBorder={false}
      />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.commentUser}>
              <strong>Matheus Pazinati</strong>
              <time 
                title='5 de Setembro de 2022 ás 03:58 da manhã' 
                dateTime='05/09/2022 03:58'>
                Cerca de 1h atrás
              </time>
            </div>
            <button title='Botão para deletar comentário' className={styles.deleteButton}>
              <Trash size={24} />
            </button>
          </header>
          <div className={styles.commentText}>
            <p>{content}</p>
          </div>
        </div>      
        <footer>
          <button title='Botão para aplaudir o comentário' className={styles.likeButton}>
            <ThumbsUp size={20} />
            Aplaudir <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  )
}