import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../services/user/user";
import {ModalDirective} from "ng2-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-admin-user-manage',
  templateUrl: './admin-user-manage.component.html',
  styleUrls: ['./admin-user-manage.component.scss']
})
export class AdminUserManageComponent implements OnInit {
  @ViewChild('userEditModal') public userEditModal:ModalDirective;
  private users: User[] = [];
  private editingUser: User;
  private userForm: FormGroup;
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  constructor(private userService: UserService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
      });

    this.userForm = this.formBuilder.group({
      Email: ['', [<any>Validators.required, <any>Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$")]],
      Password: ['', [<any>Validators.required, <any>Validators.minLength(4)]],
      PasswordVerify: ['', [<any>Validators.required, <any>Validators.minLength(4)]],
      Firstname: ['', [<any>Validators.required]],
      Lastname: ['', [<any>Validators.required]],
      Birthday: ['', [<any>Validators.required]],
      Phone: ['', [<any>Validators.required, <any>Validators.pattern(/\([1-9]\d{2}\) \d{3}\-\d{4}/)]],
      Gender: ['', [<any>Validators.required]],
      Type: ['', [<any>Validators.required]]
    }, {validator: this.matchingPasswords('Password', 'PasswordVerify')});
  }

  private matchingPasswords(passwordKey: string, passwordConfirmKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey];
      let passwordConfirmationInput = group.controls[passwordConfirmKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
    }
  }

  updateUser(user: User) {
    this.userService.updateUser(user)
      .toPromise();
  }

  addUser(user: User) {

  }

  submitUser() {
    if (this.editingUser === null) {
      let user = new User();
      user.fromJSON(this.userForm.value);
      this.addUser(user);
    }
    else {
      this.editingUser.fromJSON(this.userForm.value);
      this.updateUser(this.editingUser)
    }
  }

  editUser(user: User = null) {
    this.editingUser = user;

    if (user !== null)
      this.userForm.reset(user);
    else
      this.userForm.reset();

    this.userEditModal.show();
  }
}
