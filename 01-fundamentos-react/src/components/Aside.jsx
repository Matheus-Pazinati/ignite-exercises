import { Avatar } from "./Avatar"

import { PencilSimpleLine } from "phosphor-react"
import styles from './Aside.module.css'

export function Aside() {
  return (
    <aside className={styles.sidebar}>
      <header className={styles.cover} />
      <div className={styles.profile}>
        <Avatar source={'https://github.com/Matheus-Pazinati.png'} />
        <strong>Matheus Pazinati</strong>
        <span>Web Developer</span>
      </div>
      <footer>
        <a 
          href="#"
        >
          <PencilSimpleLine size={20} />
          Editar seu perfil
        </a>
      </footer>
    </aside>
  )
}