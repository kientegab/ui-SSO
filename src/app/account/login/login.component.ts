import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ILoginVM, LoginVM } from 'src/app/shared/model/login-vm';
import { AuthenticationService } from 'src/app/shared/service/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {

	rememberMe: boolean = false;
	@ViewChild('dtf') form!: NgForm; 

	account: ILoginVM = new LoginVM();

	isOpInProgress!: boolean;
	isDialogOpInProgress!: boolean;
	message: any;
	dialogErrorMessage: any;
	timeoutHandle: any;

	constructor(
		private layoutService: LayoutService,
		private authService: AuthenticationService,
		private router: Router
		) {}

	get dark(): boolean {
		return this.layoutService.config.colorScheme !== 'light';
	}

	seConnecter(): void {
		this.clearDialogMessages();
		this.isDialogOpInProgress = true;
		this.router.navigate(['/admin']);
		// this.authService
		//   .login(this.account)
		//   .subscribe(
		// 	{
		// 		next: (response) => {
		// 		  this.showMessage({ severity: 'success', summary: 'Vous êtez authentifié avec succès' });
		// 		},
		// 		error: (error) => {
				 // console.error("error" + JSON.stringify(error));
			// 	  this.isOpInProgress = false;
			// 	  this.showMessage({ severity: 'error', summary: error.message });
	
			// 	}
			//   });
			// (success: any) => { 
			//   if (success) {
				
			//   }
			// },
			// () => {
			 
			// }
		  //);
	  }

	  
  showMessage(message: Message) {
    this.message = message;
    this.timeoutHandle = setTimeout(() => {
      this.message = null;
    }, 5000);
  }

	  // Errors
  handleError(error: HttpErrorResponse) {
    console.error(`Processing Error: ${JSON.stringify(error)}`);
    this.isDialogOpInProgress = false;
    this.dialogErrorMessage = error.error.title;
  }
  // Messages

  clearDialogMessages() {
    this.dialogErrorMessage = null;
  }


}
