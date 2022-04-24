import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  email: string = this.route.snapshot.params['email'];
  user:any = {};
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.getUser(this.email);
  }

  getUser(email: string) {
    this.userService.getUser(email).subscribe(result => {
      this.user = result.data;
    });
  }

}
