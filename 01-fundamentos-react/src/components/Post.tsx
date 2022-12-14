import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

import { Avatar } from './Avatar';
import { Comment } from './Comment';

import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/esm/locale/pt-BR/index.js';

import styles from './Post.module.css';

interface Author {
  name: string;
  avatarUrl: string;
  role: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

interface PostProps {
  author: Author;
  publishedAt: Date;
  content: Content[];
}

export function Post ({ author, publishedAt, content }: PostProps) {
  const dateFormatted = format(publishedAt, "d 'de' LLLL 'ás' HH:mm'h'", {
    locale: ptBR
  })
  const timeBetweenPostAndNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  })
  const dateAndTime = format(publishedAt, "dd'/'LL'/'uuuu HH:mm")

  const [comments, setComments] = useState<string[]>([]);

  const [newCommentText, setNewCommentText] = useState('');

  function handleNewComment(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)
  }

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault()
    setComments([...comments, newCommentText])

    setNewCommentText('')
  }
  function handleInvalidMessageSent(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Este campo é obrigatório');
  }

  function deleteComment(commentToDelete: string) {
    const commentsListWithoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete
    })
    setComments(commentsListWithoutDeletedOne)
  }

  const isCommentTextEmpty = newCommentText.length === 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.user}>
          <Avatar src={author.avatarUrl} />
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
            return <p key={line.content}>{line.content}</p>
          } else if (line.type === "link") {
            return <p key={line.content}><a href="#">{line.content}</a></p>
          }
        })}
      </div>

      <form 
        className={styles.commentForm}
        onSubmit={handleCreateNewComment}
      >
        <strong>Deixe seu feedback</strong>
        <textarea 
          placeholder='Escreva um comentário...'
          value={newCommentText}
          onChange={handleNewComment}
          onInvalid={handleInvalidMessageSent}
          required
        />
        <footer>
          <button disabled={isCommentTextEmpty}>
            Publicar
          </button>
        </footer>
      </form>
      <div className={styles.commentBox}>
        {comments.map(comment => {
          return (
          <Comment 
            key={comment} 
            content={comment} 
            onDeleteComment={deleteComment}
          />
        )
        })}
      </div>
    </article>
  )
}