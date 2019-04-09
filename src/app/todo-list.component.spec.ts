import { TestBed, async } from '@angular/core/testing';
import {TodoListComponent} from './todo-list.component'
import {TodoService} from './todo.service'


describe('AppComponent', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
          TodoService
        ],
        declarations: [
          TodoListComponent
        ],
      }).compileComponents();
    }))


    it('should create the todo list', () => {
        const fixture = TestBed.createComponent(TodoListComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should have a form for new todos', () => {
      const fixture = TestBed.createComponent(TodoListComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      const form = compiled.querySelector('.todo-form')
      expect(form).toBeDefined()
    })

    it('should have an empty text field in new todo form', () => {
      const fixture = TestBed.createComponent(TodoListComponent)
      fixture.detectChanges()
      const compiled = fixture.debugElement.nativeElement;
      const form = compiled.querySelector('.todo-form')
      const input = form.firstChild
      expect(input.type).toBe('text')
      expect(input.value).toBe('');
    })

})