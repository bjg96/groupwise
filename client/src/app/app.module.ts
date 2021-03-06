import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes}   from '@angular/router';
import {
  AlertModule, BsDropdownModule, CollapseModule, TabsModule, ModalModule, CarouselModule,
  PaginationModule, AccordionModule
} from 'ngx-bootstrap';

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
import { AlertsComponent } from './alerts/alerts.component';
import {LoggedinGuard} from "./guards/loggedin-guard";
import {AppRoutes} from "./routes";
import {NotLoggedinGuard} from "./guards/not-loggedin-guard";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterGeneralInformationComponent } from './register/register-general-information/register-general-information.component';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';
import { ConsumeTokenPageComponent } from './consume-token-page/consume-token-page.component';
import { StudentSearchPageComponent } from './student-search-page/student-search-page.component';
import {RegisterAttributeFieldComponent} from "./register/register-attributes/register-attribute-field/register-attribute-field.component";
import {RegisterAttributesComponent} from "./register/register-attributes/register-attributes.component";
import {AttributeService} from "./services/attributes/attribute.service";
import { MyDatePickerModule } from 'mydatepicker';
import { DateSelectComponent } from './date-select/date-select.component';
import { ChatMessageComponent } from './chat/chat-message/chat-message.component';
import {MomentModule} from "angular2-moment";
import { AdminConfigurationComponent } from './admin-manage/admin-configuration/admin-configuration.component';
import { AdminAttributesComponent } from './admin-manage/admin-attributes/admin-attributes.component';
import { AdminReportingComponent } from './admin-manage/admin-reporting/admin-reporting.component';
import { ChatWindowComponent } from './chat/chat-window/chat-window.component';
import {ChatService} from "./services/chat/chat.service";
import { RegisterAddonPageComponent } from './register/register-addon-page/register-addon-page.component';
import {AuthService} from "./services/user/auth.service";
import { ProfileAttributeComponent } from './user-profile-page/profile-attribute/profile-attribute.component';
import { AutoFocusDirective } from './auto-focus.directive';
import {AdminGuard} from "./guards/admin-guard";
import {StudentGuard} from "./guards/student-guard";
import {HostGuard} from "./guards/host-guard";
import {MatchService} from "./services/match/match.service";
import { PageEditorComponent } from './admin-manage/admin-configuration/page-editor/page-editor.component';
import { RemoteHtmlContentComponent } from './remote-html-content/remote-html-content.component';
import { FaqPageComponent } from './faq-page/faq-page.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import {TextMaskModule} from 'angular2-text-mask';
import {MyMatchesPageComponent} from "./my-matches-page/my-matches-page.component";
import {ChartsModule} from "ng2-charts";
import {ReportUserAcquisitionComponent} from "./admin-manage/admin-reporting/report-user-acquisition/report-user-acquisition.component";
import { ReportUserTotalComponent } from './admin-manage/admin-reporting/report-user-total/report-user-total.component';
import { ReportMatchActivityComponent } from './admin-manage/admin-reporting/report-match-activity/report-match-activity.component';
import { ReportEntityTableComponent } from './admin-manage/admin-reporting/report-entity-table/report-entity-table.component';
import {Ng2TableModule} from "ng2-table";
import { ReportUsersTableComponent } from './admin-manage/admin-reporting/report-users-table/report-users-table.component';
import { CookieModule } from 'ngx-cookie';
import {CsvService} from "./services/report/csv.service";
import { AdminApprovalQueueComponent } from './admin-manage/admin-approval-queue/admin-approval-queue.component';
import {ListService} from "./services/list/list.service";
import { ListsEditorComponent } from './admin-manage/admin-configuration/lists-editor/lists-editor.component';
import { TosComponent } from './register/tos/tos.component';
import { AdminUserManageComponent } from './admin-manage/admin-configuration/admin-user-manage/admin-user-manage.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { TinyMceValueAccessorDirective } from './tiny-mce-value-accessor.directive';
import {ContactService} from "./services/contact/contact.service";
import { NotificationCardComponent } from './notification-card/notification-card.component';
import {NotificationService} from "./services/notifications/notification.service";
import { FeedbackComponent } from './feedback/feedback.component';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ConsumeTokenService} from "./services/token/consume-token.service";
import { MatchStatusPipe } from './match-status.pipe';

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
    RegisterAttributesComponent,
    PageNotFoundComponent,
    RegisterGeneralInformationComponent,
    ConsumeTokenPageComponent,
    UserProfilePageComponent,
    StudentSearchPageComponent,
    RegisterAttributeFieldComponent,
    DateSelectComponent,
    ChatMessageComponent,
    AdminConfigurationComponent,
    AdminAttributesComponent,
    AdminReportingComponent,
    ChatWindowComponent,
    RegisterAddonPageComponent,
    ProfileAttributeComponent,
    AutoFocusDirective,
    PageEditorComponent,
    RemoteHtmlContentComponent,
    FaqPageComponent,
    SpinnerComponent,
    AdminApprovalQueueComponent,
    ListsEditorComponent,
    MyMatchesPageComponent,
    ReportUserAcquisitionComponent,
    ReportUserTotalComponent,
    ReportMatchActivityComponent,
    ReportEntityTableComponent,
    ReportUsersTableComponent,
    AdminUserManageComponent,
    AccountPageComponent,
    TinyMceValueAccessorDirective,
    TosComponent,
    NotificationCardComponent,
    FeedbackComponent,
    LandingPageComponent,
    MatchStatusPipe
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    TextMaskModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    CollapseModule.forRoot(),
    FileUploadModule,
    MyDatePickerModule,
    MomentModule,
    TabsModule.forRoot(),
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    CookieModule.forRoot(),
    ChartsModule,
    Ng2TableModule,
    MultiselectDropdownModule
  ],
  providers: [UserService, SocketService, ConfigService, AlertService, LoggedinGuard, NotLoggedinGuard, AttributeService,
    ChatService, AuthService, AdminGuard, StudentGuard, HostGuard, MatchService, ListService, CsvService, ContactService,
    NotificationService, ConsumeTokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
