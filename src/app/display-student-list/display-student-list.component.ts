import { Component, OnInit } from '@angular/core';
import {Student} from '../student-interface';
import {StudentService} from '../student-service'

@Component({
  selector: 'app-display-student-list',
  templateUrl: './display-student-list.component.html',
  styleUrls: ['./display-student-list.component.css']
})
export class DisplayStudentListComponent implements OnInit {
  Students: Student[];
  message="";
  notification;
  clicked:boolean;
  constructor(private studentservice:StudentService) {
    this.clicked =false;
    this.notification = null;
   
   }

  ngOnInit(): void {   
    this.studentservice.updatedFlag.subscribe((res)=>{
      if(res.start==true){
        this.getStudentList("update");
      }
    });
    this.studentservice.newDataFlag.subscribe((res)=>{
      if(res.start==true){
        this.getStudentList("new");
      }
    });
    this.getStudentList(null); 
    this.studentservice.selectedStudent.subscribe(()=>{
      
    }) 
  }
  getStudentList(notify:string) {
    this.studentservice.getStudents().subscribe(
      (students: Student[]) => {
        this.Students= students;
        this.message= "";
        if(notify=="update"){
          this.notification ="Updated successfully";
          setTimeout(()=>{
            this.notification =null;
          },3000)
        }
        else if(notify=="new"){
          this.notification ="New student added successfully";
          setTimeout(()=>{
            this.notification =null;
          },3000)
        }
        else this.notification = null;
       
      },
      (err) => {
        this.message = err.message+" while fetching data";
        this.getStudentList(null); 
        if(notify=="update"){
          this.notification ="Error while Updating data";
          setTimeout(()=>{
            this.notification =null;
          },5000)
          this.getStudentList("update");
        }
        else if(notify=="new"){
          this.notification ="Error while adding data";
          setTimeout(()=>{
            this.notification =null;
          },5000)
          this.getStudentList("new");
        }
        else this.notification = null;        
      }
    );
  }
  updateSelectedChild(id){
  
    this.studentservice.selectedStudent.next({studentId:id})

  }
 
  

  }


