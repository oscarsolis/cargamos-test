import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) { }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? true : false;
  }

  public signOut(): void {
    this.afAuth.signOut().then(() => {
      this.removeUser();
      this.router.navigate(['auth/']);
    });
  }

  public signIn(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  public signUp(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  public goToTasks(): void {
    this.router.navigate(['tasks']);
  }

  public goToAuth(): void {
    this.router.navigate(['auth']);
  }

  public setUser(user: firebase.User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public removeUser(): void {
    localStorage.removeItem('user');
  }

  public verifySession(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

}
