import {Component, OnDestroy, OnInit} from '@angular/core';
import { Routes, Route, Router } from '@angular/router';
import { UserService } from "../services/user/user.service";
import {User} from "../services/user/user";
import {Observable} from "rxjs";
import {AuthService} from "../services/user/auth.service";
import {UserPhoto} from "../services/user/user-photo";
import {NotificationService} from "../services/notifications/notification.service";
import {NotificationModel} from "../services/notifications/notification.model";
import {Subscription} from "rxjs/Subscription";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private isCollapsed: boolean = true;
  private loggedInUser: Observable<User>;
  private isLoggedIn: boolean;
  private type: "ADMINISTRATOR" | "HOST" | "STUDENT";
  private displayName: string;
  private userId: number;
  private defaultPhotoURL: string = "/assets/profile-placeholder-default.png";
  private photoURL: string = this.defaultPhotoURL;
  private photoBaseURL: string = "/api/v1/user-photos";
  private notificationSub: Subscription = null;
  private notifications: Array<NotificationModel> = [];

  constructor(private userService: UserService, private router: Router, private authService: AuthService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.loggedInUser = this.authService.getLoggedInUser();
    this.loggedInUser.subscribe((user) => {
      if (user != null) {
        this.isLoggedIn = true;
        this.type = user.Type;
        this.displayName = this.userService.getUserDisplayName(user);
        this.userId = user.Id;
        this.userService.getUserPhotosByUserId(this.userId)
          .subscribe((photos: UserPhoto[]) => {
            if (photos.length > 0)
              this.photoURL = `${this.photoBaseURL}/${photos[0].Id}`;
            else
              this.photoURL = this.defaultPhotoURL;
          });

        if (this.notificationSub !== null)
          this.notificationSub.unsubscribe();

        this.notificationSub = this.notificationService.getNotifications()
          .subscribe((notifs: NotificationModel[]) => {
            this.notifications = notifs;
          });
      }
      else {
        this.isLoggedIn = false;
        this.type = null;
        this.displayName = "";
        this.userId = null;
        this.photoURL = this.defaultPhotoURL;
      }
    });
  }

  ngOnDestroy(): void {
    this.notificationSub.unsubscribe();
  }

  logout() {
    this.authService.logout().toPromise();
  }

  dismissNotification(notification): void {
    this.notifications.splice(this.notifications.indexOf(notification), 1);
  }

}
