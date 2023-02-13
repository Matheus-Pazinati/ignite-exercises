import { List } from "../../components/List";

export function Home() {
  return (
    <section>
      <h1>Home</h1>
      <List initialUsers={["Matheus", "Carol"]} />
    </section>


  )
}