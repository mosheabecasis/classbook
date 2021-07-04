import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { StudentInterface } from "../../interfaces/student";
import { CoreService } from "../../services/core.service";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit, OnDestroy {

  students: StudentInterface[];
  studentsSub;
  userSub;
  userUid: string;

  constructor(private coreService: CoreService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.studentsSub = this.coreService.getStudents().subscribe((studentsDocs: any) => {
      this.students = studentsDocs
    });
    this.userSub = this.authService.user?.subscribe(async (user: UserInterface | undefined | null) => {
      if (this.userUid === undefined || this.userUid == null)
        {this.userUid = user.uid;}

    });
  }

  ngOnDestroy() {
    if (this.studentsSub) this.studentsSub.unsubscribe();
    if (this.userSub) this.userSub.unsubscribe();
  }
  deleteStudent(student: StudentInterface) {
    if (this.userUid === student.uid){
      this.coreService.removeById(student.id);
      this.coreService.getStudents();
    }

  }
}
