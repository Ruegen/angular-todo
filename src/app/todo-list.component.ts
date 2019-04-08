import { Component } from "@angular/core"
import { Todo } from "./todo"
import { TodoService } from "./todo.service"

@Component({
  selector: "todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"]
})
export class TodoListComponent {
  todos: Todo[] = []
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos
    })
  }

  toggleTodoComplete(id): void {
    this.todoService.toggleTodoComplete(id)
  }

  deleteTodo(id): void {
    this.todoService.deleteTodoById(id)
  }

  updateTodo($event, id) {
    const title: string = $event.target.value
    this.todoService.updateTodo(id, title)
  }

  addTodo($event): void {
    $event.preventDefault()
    const title = $event.target.title.value
    if(!title) return;
    const todo = new Todo(title)
    $event.target.reset()
    this.todoService.addTodo(todo)
  }
}
