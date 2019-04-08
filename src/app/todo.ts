import * as shortid from "shortid"

export class Todo {
  id: string
  title: string
  completed: boolean = false
  constructor(title: string) {
    this.id = shortid.generate()
    this.title = title
  }
}
