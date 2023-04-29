import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fintechUi';
  isLoggedIn = false;
  constructor(private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/' || event['url']=='' ||event['url'] == '/login'|| event['url'] == '/page-not-found') {         
          this.isLoggedIn = false;
        } else if(event['url'] == '/dashboard' || event['url'] == '/view-user' || event['url'] == '/add-user' || event['url'] == '/edit-user' || 
          event['url'] == '/update-profile' || event['url'] == '/change-password' || event['url'] == '/ledger' ||
          event['url'] == '/transfer-amount' || event['url']=='/pay-in' || event['url']=='/pay-out' || event['url'] == '/assign-package' ||
          event['url'] == '/package' || event['url'] == '/user-commission' || event['url'] == '/wallet-load' || event['url'] == '/packages'||
          event['url'] == '/wallet-out' || event['url'] == '/edit-package' || event['url'] == '/payment-link'){
          this.isLoggedIn = true;
        }
      }
    });
  }

}
