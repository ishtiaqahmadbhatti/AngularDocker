import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncryptionService } from '../../app_controllers/services.controller'

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html'
})
export class SecureComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private encryptionService: EncryptionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const encryptedData = params.get('encryptedData');
      const decryptedRoute = encryptedData ? this.encryptionService.decrypt(encryptedData) : null;

      if (decryptedRoute) {
        console.log('Decrypted Route:', decryptedRoute);
        this.router.navigateByUrl(decryptedRoute); // Navigate to actual route
      } else {
        console.error('Invalid or expired URL');
        this.router.navigate(['/']); // Redirect to home if invalid
      }
    });
  }
}
