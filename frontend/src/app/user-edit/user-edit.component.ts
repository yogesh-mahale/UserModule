import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/user.service';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup;
  email: string = this.route.snapshot.params['email'];
  user: {};

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {

    this.getUser(this.email);

    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
      phone: new FormControl('', [Validators.required]),
      userProfile: new FormControl(''),
    });
  }

  getUser(email: string) {
    console.log("--> | email ", email);

    this.userService.getUser(email).subscribe(result => {
      this.user = result.data;
      this.userForm.get('email').setValue(this.user['email']);
      this.userForm.get('firstName').setValue(this.user['firstName']);
      this.userForm.get('lastName').setValue(this.user['lastName']);
      this.userForm.get('phone').setValue(this.user['phone']);
    });
  }

  submitForm() {
    if (!this.userForm.valid) {
      return false;
    }
    const params = {
      email: this.userForm.value.email,
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      phone: this.userForm.value.phone,
    };

    this.userService.updateUser(params.email, params).subscribe(result => {
      this.router.navigate(['/users']);
    });
    return true;
  }

}
