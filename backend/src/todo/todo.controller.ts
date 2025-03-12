import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.schema';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAllTodos(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Post()
  async createTodo(@Body('text') text: string): Promise<Todo> {
    return this.todoService.create(text);
  }

  @Put(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body('text') text: string,
    @Body('completed') completed: boolean
  ): Promise<Todo> {
    return this.todoService.update(id, text, completed);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string): Promise<Todo> {
    return this.todoService.delete(id);
  }
}
