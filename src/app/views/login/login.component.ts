import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  title: string = 'Iniciar sesión';
  formData!: FormGroup;
  username: any;
  password: any;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  Login(data: any) {
    this.username = data.username;
    this.password = data.password;
    //Login
    this.apiService.login(this.username, this.password).subscribe((data) => {
      //console.log('Is Login Success: ' + data);
      if (data) this.router.navigate(['/home']);
    });
  }
}
