import { Component } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import firebase from 'firebase/app';

import { AuthService } from '@services/auth.service';
import { NotificationService } from '@services/notification.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  public signUpForm: FormGroup;
  public isSavingUser = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService
  ) {
    this.createForm();
  }

  public onSubmit(): void {
    if (this.signUpForm.valid) {
      this.isSavingUser = true;
      this.authService
        .signUp(this.signUpForm.value.email, this.signUpForm.value.password)
        .then((user: firebase.auth.UserCredential) => {
          this.authService.setUser(user.user);
          this.authService.goToTasks();
          this.notificationService.success('Usuario registrado correctamente!');
        })
        .catch(({ message }) => {
          this.notificationService.error(message || 'Ups! algo salio mal');
        })
        .finally(() => {
          this.isSavingUser = false;
        });
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }

  private createForm(): void {
    this.signUpForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', Validators.required)
    });
  }

}
