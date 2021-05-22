import { Component } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import firebase from 'firebase/app';

import { AuthService } from '@services/auth.service';
import { NotificationService } from '@services/notification.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  public signInForm: FormGroup;
  public isVerifyingUser = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService
  ) {
    this.createForm();
  }

  public onSubmit(): void {
    if (this.signInForm.valid) {
      this.isVerifyingUser = true;
      this.authService
        .signIn(this.signInForm.value.email, this.signInForm.value.password)
        .then((user: firebase.auth.UserCredential) => {
          this.authService.setUser(user.user);
          this.authService.goToTasks();
          this.notificationService.success('Inicio de sesión exitoso!');
        })
        .catch(({ message }) => {
          this.notificationService.error(message || 'Ups! algo salio mal');
        })
        .finally(() => {
          this.isVerifyingUser = false;
        });
    } else {
      this.signInForm.markAllAsTouched();
    }
  }

  private createForm(): void {
    this.signInForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', Validators.required)
    });
  }

}
