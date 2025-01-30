import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConvertService, EncryptionService } from '../../../app_controllers/services.controller'

@Component({
  selector: 'app-pdf-to-word',
  templateUrl: './pdf-to-word.component.html',
  styleUrls: ['./pdf-to-word.component.css'],
  standalone: true,
  imports: []
})
export class PdfToWordComponent implements OnInit {
  selectedFile: File | null = null;

  constructor(
    private convertService: ConvertService,
    private route: ActivatedRoute,
    private encryptionService: EncryptionService,
    private router: Router
  ) { }

  ngOnInit() {
    debugger;
    this.route.paramMap.subscribe(params => {
      debugger
      const encryptedData = params.get('encryptedData');
      const decryptedRoute = encryptedData ? this.encryptionService.decrypt(encryptedData) : null;
      debugger;
      if (decryptedRoute) {
        console.log('✅ Decrypted Route:', decryptedRoute);
        this.router.navigateByUrl(decryptedRoute);
      } else {
        console.warn('🔴 Invalid or Expired URL');
        this.router.navigate(['/']);  // Redirect to error page
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  convertPdfToWord(): void {
    debugger;
    if (this.selectedFile) {
      this.convertService.convertPdfToWord(this.selectedFile).subscribe(response => {
        this.downloadFile(response, 'converted.docx');
      }, error => {
        console.error('Error converting PDF to Word:', error);
      });
    }
  }

  private downloadFile(data: Blob, filename: string): void {
    const url = window.URL.createObjectURL(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

}
