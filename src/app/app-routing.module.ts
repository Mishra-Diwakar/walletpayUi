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


  { path: 'page-not-found', component:PageNotFoundComponent},  
  { path: '**', redirectTo: 'page-not-found' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
