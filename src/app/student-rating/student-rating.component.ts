import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import {FormControl,Validators} from '@angular/forms';
import { StudentService } from '../student-service';


@Component({
  selector: 'app-student-rating',
  templateUrl: './student-rating.component.html',
  styleUrls: ['./student-rating.component.css']
})
export class StudentRatingComponent implements OnInit {
  ratings=[1,2,3,4,5];

  @Output() public sendRating  = new EventEmitter()

  constructor(private studentservice :StudentService) { }

  ngOnInit(): void {
    this.studentservice.updatedFlag.subscribe(()=>{
      this.rating.setValue(-1);
    })
    this.studentservice.newDataFlag.subscribe(()=>{
      this.rating.setValue(-1);
    })
    this.studentservice.dataToEdit.subscribe((res)=>{
      if(res.id!=null){
        this.rating.setValue(res.rating);
      }
    })
  }
  rating = new FormControl('-1',Validators.required)

  ratingUpdate(){
    console.log(this.rating.value)
    this.sendRating.emit(this.rating.value)
  }
  

}
