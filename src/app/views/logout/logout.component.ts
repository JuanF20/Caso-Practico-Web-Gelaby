import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent {
  constructor(private apiService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.logout();
    this.router.navigate(['/login']);
  }
}
