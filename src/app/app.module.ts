import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/InterceptorService';
import { AuthGuardService } from './services/AuthGuardService';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DatePipe } from '@angular/common';
import { ViewUsersComponent } from './components/user/view-users/view-users.component';
import { AddComponent } from './components/user/add/add.component';
import { EditComponent } from './components/user/edit/edit.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { ChangePasswordComponent } from './components/user/change-password/change-password.component';
import { FundComponent } from './components/fund/fund.component';
import { LedgerComponent } from './components/report/ledger/ledger.component';
import { PayInComponent } from './components/report/pay-in/pay-in.component';
import { PayOutComponent } from './components/report/pay-out/pay-out.component';
import { PackagesComponent } from './components/packages/packages.component';
import { UserCommissionComponent } from './components/user/user-commission/user-commission.component';
import { WalletLoadComponent } from './components/wallet-load/wallet-load.component';
import { PackageListComponent } from './components/user/package-list/package-list.component';
import { AssignPackageComponent } from './components/user/assign-package/assign-package.component';
import { MyCommissionComponent } from './components/user/my-commission/my-commission.component';
import { WalletOutComponent } from './components/wallet-out/wallet-out.component';
import { EditPackageComponent } from './components/user/edit-package/edit-package.component';
import { PaymentLinkComponent } from './components/report/payment-link/payment-link.component';
import { OnboardingOne } from './components/onboarding_1/onboarding_1.component';
import { OnboardingTwo } from './components/onboarding_2/onboarding_2.component';
import { AddBankComponent } from './components/add-bank/add-bank.component';
import { ProfitLossComponent } from './components/report/profit-loss/profit-loss.component';
import { ForgotPasswordComponent } from './components/user/forgot-password/forgot-password.component';
import { VpaListComponent } from './components/user/vpa-list/vpa-list.component';
import { BankListComponent } from './components/add-bank/bank-list/bank-list.component';
import { EditBankComponent } from './components/add-bank/edit-bank/edit-bank.component';
import { TodayProfitComponent } from './components/report/today-profit/today-profit.component';
import { HealDataComponent } from './components/report/heal-data/heal-data.component';
import { ChargeComponent } from './components/user/charge/charge.component';
import { BalanceSheetComponent } from './components/report/balance-sheet/balance-sheet.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ViewUsersComponent,
    AddComponent,
    EditComponent,
    ProfileComponent,
    ChangePasswordComponent,
    FundComponent,
    LedgerComponent,
    PayInComponent,
    PayOutComponent,
    PackagesComponent,
    UserCommissionComponent,
    WalletLoadComponent,
    PackageListComponent,
    AssignPackageComponent,
    MyCommissionComponent,
    WalletOutComponent,
    EditPackageComponent,
    PaymentLinkComponent,
    OnboardingOne,
    OnboardingTwo,
    AddBankComponent,
    ProfitLossComponent,
    ForgotPasswordComponent,
    VpaListComponent,
    BankListComponent,
    EditBankComponent,
    TodayProfitComponent,
    HealDataComponent,
    ChargeComponent,
    BalanceSheetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    Ng2OrderModule,
    Ng2SearchPipeModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true, 
     }, AuthGuardService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
