import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from '@app/_services/local-storage.service';
import { UserService } from '@modules/auth/services';

@Component({
    selector: 'sb-top-nav-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
})
export class TopNavUserComponent implements OnInit {
    constructor(
        public userService: UserService,
        private localStorage: LocalstorageService,
        private router: Router
    ) {}
    ngOnInit() {}
    onLogout() {
        this.localStorage.destroyToken();
        this.router.navigateByUrl('/');
    }
}
