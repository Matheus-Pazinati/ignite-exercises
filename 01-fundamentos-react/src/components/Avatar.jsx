import styles from './Avatar.module.css'

export function Avatar({ source }) {
  return (
    <img className={styles.avatar} src={source}  />
  )
}