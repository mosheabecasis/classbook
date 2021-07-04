import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentInterface } from 'src/app/interfaces/student';
import { UserInterface } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit, OnDestroy {

   user:UserInterface | undefined;
   userSub: any;

   studentForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private coreService: CoreService,
              private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
    this.getUser();
  }
  ngOnDestroy(){
    if(this.userSub) this.userSub.unsubscribe();
  }

  buildForm(){
    this.studentForm = this.formBuilder.group({
      // name: ['', [Validators.required]],
      // email: ['', [Validators.required]],
      title: ['', [Validators.required]],
      info: ['', [Validators.required, Validators.maxLength(500)]],
      github: [''],
      facebook: [''],
      codepen: [''],
      linkedin: ['']

    })
  }
  getUser(){
    this.userSub = this.authService.user.subscribe((userDoc: UserInterface | undefined) => {
      this.user = userDoc;
    })
  }

  saveNewStudent(){
    const student = {
      email: this.user.email,
      displayName: this.user.displayName,
      photoURL: this.user.photoURL,
      uid: this.user.uid,
      title: this.getTitle.value,
      info: this.getInfo.value,
      github: this.getGithub.value,
      facebook: this.getGithub.value,
      codepen: this.getCodepen.value,
      linkedin: this.getLinkedin.value
    };
    this.coreService.saveStudent(student).then(()=>{
      this.studentForm.reset();
      alert('success');
      return this.router.navigateByUrl('/');
    }).catch(e=>{
      console.log('error',e);
    })
  }

  get getTitle(): any { return this.studentForm.get('title'); }
  get getInfo(): any  { return this.studentForm.get('info'); }
  get getGithub(): any  { return this.studentForm.get('github'); }
  get getFacebook(): any { return this.studentForm.get('facebook'); }
  get getCodepen(): any  { return this.studentForm.get('codepen'); }
  get getLinkedin(): any  { return this.studentForm.get('linkedin'); }
}
