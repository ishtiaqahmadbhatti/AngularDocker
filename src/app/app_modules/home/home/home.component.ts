import { Component } from '@angular/core';
import { FooterComponent } from "../../../app_layouts/footer/footer.component";
import { Router } from '@angular/router';
import { EncryptionService } from '../../../app_controllers/services.controller'

@Component({
  selector: 'app-home',
  imports: [FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true
})
export class HomeComponent {

  ngOnInit() {
    const testEncrypted = this.encryptionService.encrypt('/convert/pdf-to-word');
    console.log('Test Encrypted:', testEncrypted);
    
    const testDecrypted = this.encryptionService.decrypt(testEncrypted);
    console.log('Test Decrypted:', testDecrypted);
  }
  constructor(private route: Router, private encryptionService: EncryptionService) { }

  convertPDFToWord() {
    const encryptedRoute = this.encryptionService.encrypt('/convert/pdf-to-word');
    this.route.navigate(['/secure', encryptedRoute]);
  }

  convertWordToPDF() {
    this.route.navigate(['/convert/word-to-pdf']);
  }

  convertPDFToImage(){
    this.route.navigate(['/convert/pdf-to-image']);
  }

  convertImageToPDF() {
    this.route.navigate(['/convert/image-to-pdf']);
  }

  mergePDFs() {
    this.route.navigate(['/convert/merge-pdfs']);
  }

  convertVideoToAudio(): void {
    this.route.navigate(['/convert/video-to-audio']);
  }
}
