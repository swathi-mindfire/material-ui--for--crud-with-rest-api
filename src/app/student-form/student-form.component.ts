import { Component, OnInit } from '@angular/core';
import{FormBuilder,Validators} from'@angular/forms';
import {Student} from '../student-interface';
import { StudentService } from '../student-service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  newStudent :Student
  ratingFromChild:number
  filledStars:Number[];
  emptyStars:Number[];
  btnName:string;
  updated:boolean;
  newDataFlag:boolean;
  postError:string;
  idOfUpdating:null;
  displayName:boolean = false;
  

  constructor(private fbr :FormBuilder,private studentservice :StudentService) {
    this.ratingFromChild = -1;
    this.filledStars =[];
    this.emptyStars = [];
    this.newStudent={"id": null,"name":"","mobile" :0,"gender":"","rating":-1};
    this.btnName="Submit"

   }

  ngOnInit(): void {
    this.studentservice.dataToEdit.subscribe((res)=>{
      if(res.id!=null){
        this.idOfUpdating = res.id;
        let data = { name:res.name,mobile:res.mobile,gender:res.gender}
        this.studentForm.setValue(data);
        this.ratingFromChild = res.rating;
        this.btnName ="Update";
        this.displayName =true;
        this.manageStars(this.ratingFromChild);
        this.filledStars =[];
        this.emptyStars = [];
        for(var i=1 ;i<=this.ratingFromChild;i++){
          this.filledStars.push(i)
        }
        for(var i=1 ;i<=5-this.ratingFromChild;i++){
          this.emptyStars.push(i)

        }
         
      }
    });
    this.studentservice.selectedStudent.subscribe(()=>{
      
    })
    
  }
    studentForm  = this.fbr.group({
    name         :  ['',[Validators.required,Validators.minLength(3)]],
    mobile       :  ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
    gender       :  ['',Validators.required],  
    })
  getRating(r:number){
    this.ratingFromChild= r;
    this.manageStars(this.ratingFromChild);
   }
  submitAction(){
    if(this.btnName == "Submit"){
      this.postData()
    }
    else{
      this.putData()
    }
  }
  postData(){
    this.newStudent.name= this.studentForm.value.name;
    this.newStudent.mobile= this.studentForm.value.mobile;
    this.newStudent.gender= this.studentForm.value.gender;
    this.newStudent.rating= this.ratingFromChild;
    this.studentservice.addStudent(this.newStudent).subscribe(
      () => {
        this.studentForm.reset();
        this.studentservice.newDataFlag.subscribe((res)=>{
          this.newDataFlag = res.newDataFlag;
        })
        this.studentservice.newDataFlag.next({newDataFlag:!this.newDataFlag,start:true});
        this.ratingFromChild = -1;
        this.postError= null;
        this.displayName =false;
            
      },
      (err) => {
        this.postError ="Error while posting data";
      }
    );
  }
  putData(){
    this.newStudent.id= this.idOfUpdating;
    this.newStudent.name= this.studentForm.value.name;
    this.newStudent.mobile= this.studentForm.value.mobile;
    this.newStudent.gender= this.studentForm.value.gender;
    this.newStudent.rating= this.ratingFromChild;
    this.studentservice.updateStudent(this.newStudent).subscribe(
      () => {
        this.studentForm.reset();
        this.btnName="Submit";
        this.studentservice.updatedFlag.subscribe((res)=>{
          this.updated = res.added;
        })
        this.studentservice.updatedFlag.next({added:!this.updated,start:true});
        this.ratingFromChild = -1;
        this.postError= null;
        this.displayName =false;
        this.studentservice.selectedStudent.next({studentId:null});
        
       },
      (err) => {
        this.postError= "Error while updating data";
      }
    );
  }
  manageStars(rating:number){
    this.filledStars =[];
    this.emptyStars = [];
    for(var i=1 ;i<=rating;i++){
      this.filledStars.push(i)
    }
    for(var i=1 ;i<=5-rating;i++){
      this.emptyStars.push(i)
    }   
  }


}
