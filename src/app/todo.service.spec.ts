import { TodoService } from "./todo.service"
import { Todo } from "./todo"
import { Observable } from "rxjs"

describe("Service: TodoService", () => {
  let service: TodoService

  beforeEach(() => {
    localStorage.clear()
    service = new TodoService()
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })

  it("should contain todos property", () => {
    expect(service.todos).toBeDefined()
  })

  it("#addTodo should add todo", () => {
    service.addTodo(new Todo("Buy Bread"))
    service.todos.subscribe(todos => {
      expect(todos.length).toBe(1)
    })
  })

  it("#getTodos should return array of all todos", () => {
    service.addTodo(new Todo("Buy Bread"))
    service.addTodo(new Todo("Buy Milk"))
    const todos: Observable<Todo[]> = service.getTodos()
    todos.subscribe(todos => {
      expect(todos.length).toBe(2)
    })
  })

  it("#deleteTodoById should delete todo", () => {
    const todo: Todo = new Todo("Buy Bread")
    service.addTodo(todo)
    service.deleteTodoById(todo.id)
    service.todos.subscribe(todos => {
      expect(todos.length).toBe(0)
    })
  })

  it("#updateTodo should update todo", () => {
    const todo: Todo = new Todo("Buy Bred")
    service.addTodo(todo)
    service.updateTodo(todo.id, "Buy Bread")
    service.todos.subscribe(todos => {
      expect(todos[0].title).toBe("Buy Bread")
    })
  })

  it("#toggleTodoComplete should toggle complete", done => {
    const todo: Todo = new Todo("Buy Bread")
    expect(todo.completed).toBe(false)
    service.addTodo(todo)
    service.toggleTodoComplete(todo.id)
    service.todos.subscribe(todos => {
      expect(todos[0].completed).toBe(true)
      done()
    })
  })

  it("#updateLocalStorage should update local storage", done => {
    const todo: Todo = new Todo("Buy Bread")
    expect(todo.completed).toBe(false)
    service.addTodo(todo)
    service.todos.subscribe(todos => {
      setTimeout(function(): void {
        const _todos: Todo[] = JSON.parse(localStorage.getItem("todos")).map(
          t => t as Todo
        ) as Todo[]
        console.log(_todos, todos)
        expect(_todos[0].id).toBe(todos[0].id)
        done()
      }, 600)
    })
  })
})
