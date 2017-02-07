import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes}   from '@angular/router';
import {AlertModule, DropdownModule, CollapseDirective} from 'ng2-bootstrap';

import { NavbarComponent } from './navbar/navbar.component';
import { AppComponent } from './app.component';
import { ResultComponent } from './result/result.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { ContactComponent } from './contact/contact.component';
import { HeroCoverComponent } from './home/hero-cover/hero-cover.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavLoginComponent } from './navbar/nav-login/nav-login.component';
import { ChatComponent } from './chat/chat.component';
import { AdminManageComponent } from './admin-manage/admin-manage.component';
import { FileUploadModule } from "ng2-file-upload";
import {SocketService} from "./services/socket/socket.service";
import {UserService} from "./services/user/user.service";
import {ConfigService} from "./services/config/config.service";
import {AlertService} from "./services/alert/alert.service";
import { AlertsComponent } from './navbar/alerts/alerts.component';
import {LoggedinGuard} from "./guards/loggedin-guard";
import { RegisterHostAdditionalPersonalInformationComponent } from './register/register-host-additional-personal-information/register-host-additional-personal-information.component';
import { RegisterHostAdditionalPreferencesComponent } from './register/register-host-additional-preferences/register-host-additional-preferences.component';
import { RegisterStudentAdditionalPersonalInformationComponent } from './register/register-student-additional-personal-information/register-student-additional-personal-information.component';
import { RegisterStudentAdditionalPreferencesComponent } from './register/register-student-additional-preferences/register-student-additional-preferences.component';
import {AppRoutes} from "./routes";
import {NotLoggedinGuard} from "./guards/not-loggedin-guard";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterGeneralInformationComponent } from './register/register-general-information/register-general-information.component';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';
import { ConsumeTokenPageComponent } from './consume-token-page/consume-token-page.component';
import { StudentSearchPageComponent } from './student-search-page/student-search-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ResultComponent,
    DashboardComponent,
    ContactComponent,
    HeroCoverComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavLoginComponent,
    ChatComponent,
    AdminManageComponent,
    AlertsComponent,
    CollapseDirective,
    RegisterHostAdditionalPersonalInformationComponent,
    RegisterHostAdditionalPreferencesComponent,
    RegisterStudentAdditionalPersonalInformationComponent,
    RegisterStudentAdditionalPreferencesComponent,
    PageNotFoundComponent,
    RegisterGeneralInformationComponent,
    ConsumeTokenPageComponent,
    UserProfilePageComponent,
    StudentSearchPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
    AlertModule.forRoot(),
    DropdownModule.forRoot(),
    FileUploadModule
  ],
  providers: [UserService, SocketService, ConfigService, AlertService, LoggedinGuard, NotLoggedinGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
