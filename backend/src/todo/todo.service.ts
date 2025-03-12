import { Injectable,NotFoundException,InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Todo } from "./todo.schema";

@Injectable()
export class TodoService{
    constructor(@InjectModel(Todo.name) private todoModel:Model<Todo>){}

    async findall():Promise<Todo[]>{
        return this.todoModel.find().exec();
    }

    async create(text:string):Promise<Todo>{
        return this.todoModel.create({text});
    }

    async update(id:string,text:string,completed:boolean):Promise<Todo>{
        try{
            const updatedTodo=await this.todoModel.findByIdAndUpdate(id,{text,completed},{new:true});
            if(!updatedTodo){
                throw new NotFoundException("Todo not found");
            }
            return updatedTodo;
        }
        catch(error){
            throw new InternalServerErrorException(error.message);  
        }
    }
    async delete(id:string):Promise<Todo>{
        const deletedTodo=await this.todoModel.findByIdAndDelete(id);
        if(!deletedTodo){
            throw new NotFoundException("Todo not found");
        }
        return deletedTodo
    }
}