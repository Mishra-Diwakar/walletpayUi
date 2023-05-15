import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FundComponent } from './components/fund/fund.component';
import { LoginComponent } from './components/login/login.component';
import { PackagesComponent } from './components/packages/packages.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LedgerComponent } from './components/report/ledger/ledger.component';
import { PayInComponent } from './components/report/pay-in/pay-in.component';
import { PayOutComponent } from './components/report/pay-out/pay-out.component';
import { AddComponent } from './components/user/add/add.component';
import { ChangePasswordComponent } from './components/user/change-password/change-password.component';
import { EditComponent } from './components/user/edit/edit.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { UserCommissionComponent } from './components/user/user-commission/user-commission.component';
import { ViewUsersComponent } from './components/user/view-users/view-users.component';
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

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'view-user', component:ViewUsersComponent},
  { path: 'add-user', component:AddComponent},
  { path: 'edit-user', component:EditComponent},
  { path: 'update-profile', component:ProfileComponent},
  { path: 'change-password', component:ChangePasswordComponent},
  { path: 'transfer-amount', component:FundComponent},
  { path: 'ledger',component:LedgerComponent},
  { path: 'pay-in',component:PayInComponent},
  { path: 'pay-out', component:PayOutComponent},
  { path: 'package', component:PackagesComponent},
  { path: 'user-commission', component:UserCommissionComponent},
  { path: 'wallet-load', component:WalletLoadComponent},
  { path: 'packages', component:PackageListComponent },
  { path: 'assign-package', component:AssignPackageComponent},
  { path: 'my-commission', component:MyCommissionComponent},
  { path: 'wallet-out', component:WalletOutComponent },
  { path: 'edit-package', component:EditPackageComponent },
  { path: 'payment-link', component:PaymentLinkComponent},
  { path: 'onboarding_1', component:OnboardingOne },
  { path: 'onboarding_2', component:OnboardingTwo},
  { path: 'add-bank', component:AddBankComponent },
  { path: 'profit-loss', component:ProfitLossComponent },
  { path: 'forgot-password', component:ForgotPasswordComponent},
  { path: 'page-not-found', component:PageNotFoundComponent},  
  { path: 'vpa-list', component:VpaListComponent },
  { path: 'bank-list', component:BankListComponent },
  { path: 'edit-bank', component:EditBankComponent },
  { path: 'today-profit', component:TodayProfitComponent },
  { path: 'heal-data', component:HealDataComponent },
  { path: 'charge-back',component:ChargeComponent },
  { path: '**', redirectTo: 'page-not-found' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
