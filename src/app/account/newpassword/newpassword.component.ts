import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Message } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ForgotPassword, IForgotPassword } from 'src/app/shared/model/forget-password';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
	templateUrl: './newpassword.component.html'
})
export class NewPasswordComponent {

	rememberMe: boolean = false;
	forgotPassword: IForgotPassword = new ForgotPassword();

	isOpInProgress!: boolean;
	isDialogOpInProgress!: boolean;
	message: any;
	dialogErrorMessage: any;
	timeoutHandle: any;

	constructor(
		private layoutService: LayoutService,
		private userService: UserService
		) {}

	get dark(): boolean {
		return this.layoutService.config.colorScheme !== 'light';
	}
	newPassword(): void {
		this.clearDialogMessages();
		this.isDialogOpInProgress = true;
		this.userService.forgotPassword(this.forgotPassword)
			.subscribe(
				{
					next: (response) => {
						if (response) {
							this.showMessage({ severity: 'success', summary: 'Vous êtez authentifié avec succès' });
						}
					},
					error: (error) => {
						console.error("error" + JSON.stringify(error));
						this.isOpInProgress = false;
						this.showMessage({ severity: 'error', summary: error.message });

					}
				});
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

