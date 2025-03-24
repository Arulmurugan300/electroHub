import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SIGN_IN_CONSTANTS } from '../../constants/sign-in.constants';
import { SignInModel, SignInResponseModel } from '../../models/sign-in.models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'eh-sign-in',
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit {
  /**
   * Form group for user login.
   * @type {FormGroup<SignInModel>}
   */
  loginForm!: FormGroup<SignInModel>;
  /**
   * Constants for sign-in page labels and static texts.
   * @type {any}
   */
  signInConstants = SIGN_IN_CONSTANTS;
  /**
   * Tracks the visibility of the password field.
   * @type {boolean}
   */
  isPasswordVisible = false;
  /**
   * Constructor to inject Router, HttpClient, and MatSnackBar services.
   * @param {Router} route - Router service for navigation.
   * @param {HttpClient} httpClient - HttpClient service for making HTTP requests.
   * @param {MatSnackBar} _snackBar - MatSnackBar service for displaying snack bar notifications.
   */
  constructor(
    private route: Router,
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar
  ) { }
  /**
   * Angular lifecycle hook that initializes the login form with validators.
   */
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')
      ]),
      password: new FormControl('', [Validators.required])
    });
  }
  /**
   * Toggles the visibility of the password input field.
   */
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  /**
   * Submits the login form if valid, sends a POST request to authenticate the user,
   * and handles navigation and success/error responses.
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.httpClient.post<SignInResponseModel>('http://localhost:3000/v1/login', this.loginForm.value)
        .subscribe((response) => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            this.route.navigate(['/dashboard']);
            this.openSnackBar(response.message, 'OK');
          }
        });
    }
  }
  /**
   * Displays a snack bar with the provided message and action.
   * @param {string} message - The message to be displayed.
   * @param {string} action - The action button text (e.g., 'OK').
   */
  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, { duration: 2000 });
  }

}