import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {LoginInterfaces} from "../../data/interfaces/login.interfaces";
import {Router} from "@angular/router";


@Component({
    selector: 'app-login-page',
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  form: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);
  constructor(private fb:FormBuilder) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit() {
    console.log(this.form.value)

    if (this.form.valid){
       let userCred: LoginInterfaces = this.form.value;
       console.log(userCred);
      this.authService.login(userCred)
        .subscribe(res =>{
          this.router.navigate([''])
          console.log(res)
        }
      )
    }
  }
}
