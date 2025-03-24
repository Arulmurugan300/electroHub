import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SignInInputModel, SignInResponseModel } from '../models/sign-in.models';
import { Observable } from 'rxjs';
import { API_ROUTES } from '../../routes/api-routes';
import { API_BASE_URL } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(
    private http: HttpClient,
    @Inject(API_BASE_URL) private apiBaseUrl: string
  ) { }

  login(input: SignInInputModel): Observable<SignInResponseModel> {
    return this.http.post<SignInResponseModel>(this.apiBaseUrl + API_ROUTES.LOGIN, input);
  }
}
