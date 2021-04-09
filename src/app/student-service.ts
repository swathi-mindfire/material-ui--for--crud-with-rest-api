import {Student} from './student-interface';
import {HttpClient} from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
import{Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
  })

export class StudentService{
    constructor(private http: HttpClient) { }
    apiURL = 'http://localhost:3800/students';
    getStudents(): Observable<Student[]> {
        return this.http.get<Student[]>(this.apiURL);
      }
      addStudent(student): Observable<Student>{
        return this.http.post<Student>(this.apiURL,student);
      }
      updatedFlag = new BehaviorSubject({added:false,start:false})
      newDataFlag = new BehaviorSubject({newDataFlag:false,start:false})
      selectedStudent = new BehaviorSubject({studentId:null})

      dataToEdit = new BehaviorSubject({id:null,name:"",mobile:null,gender:"",rating:null})
  
      updateStudent(student): Observable<any>{
        return this.http.put(`${this. apiURL }/${student.id}`,student);
      }

}
