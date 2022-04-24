import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(result => {
      console.log("--> | results ", result);
      this.users = result.data;
    },
    error => {
      console.log("--> | error ", error);
    });
  }

  deleteUser(email: string) {
    this.userService.deleteUser(email).subscribe(result => {
      this.getUsers();
    });
  }
}
