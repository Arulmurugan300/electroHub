import { FormControl } from "@angular/forms";

export interface SignInModel {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

export interface SignInInputModel {
  email: string | null;
  password: string | null;
}

export interface SignInResponseModel {
  token: string;
  message: string;
}