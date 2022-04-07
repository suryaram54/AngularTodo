import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,Validators} from '@angular/forms';
import { ITasks } from '../model/tasks';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
   todoForm !:FormGroup;

tasks:ITasks[]=[];
inprogress:any[]=[];
done:any[]=[];

updateId!:any;
isEditEnabled:boolean=false;

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  this.todoForm=this.fb.group({
  item : ['',Validators.required]

  })


  }

  addTask(){
   this.tasks.push({
     description:this.todoForm.value.item,
     done:false
   })
   this.todoForm.reset();
  }
onEdit(item:ITasks,i:number){
this.todoForm.controls['item'].setValue(item.description);
this.updateId=i;
this.isEditEnabled=true;
}
updateTask(){
  this.tasks[this.updateId].description=this.todoForm.value;
  this.tasks[this.updateId].done=false;
  this.todoForm.reset();
  this.updateId=undefined;
  this.isEditEnabled=false;
}
  deleteTask(i:number){
   this.tasks.splice(i, 1)
  }
  deleteinprpgressTask(i:number){
    this.inprogress.splice(i, 1)
  }
  deleteDonTask(i:number){
    this.done.splice(i, 1)
  }
  drop(event: CdkDragDrop<ITasks[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
