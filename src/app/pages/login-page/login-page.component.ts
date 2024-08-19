import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {LoginInterfaces} from "../../data/interfaces/login.interfaces";


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  form: FormGroup;
  authService = inject(AuthService);
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
          console.log(res)
        }
      )
    }
  }
}
