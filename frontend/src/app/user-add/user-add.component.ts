import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  userForm: FormGroup;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
      phone: new FormControl('', [Validators.required]),
      userProfile: new FormControl(''),
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

    this.userService.createUser(params).subscribe(result => {
      this.router.navigate(['/users']);
    });
    return true;
  }
}
