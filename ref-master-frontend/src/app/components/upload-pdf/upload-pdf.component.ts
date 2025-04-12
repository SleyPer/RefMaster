import { Component, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PdfService } from 'src/app/services/upload-pdf.service';

@Component({
  selector: 'app-upload-pdf',
  templateUrl: './upload-pdf.component.html',
  styleUrls: ['./upload-pdf.component.scss']
})
export class UploadPdfComponent {
  @Output() designationCreated = new EventEmitter<void>();
  selectedFile: File | null = null;
  isDragOver = false;

  constructor(
    private pdfService: PdfService,
    private toastr: ToastrService
  ) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.uploadPdf();
    }
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;

    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        this.selectedFile = file;
        this.uploadPdf();
      }
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  uploadPdf(): void {
    if (this.selectedFile) {
      this.pdfService.uploadPdf(this.selectedFile).subscribe({
        next: (response) => {
          this.designationCreated.emit();
          this.toastr.success('PDF téléchargé avec succès!');
        },
        error: (error) => {
          this.toastr.error('Echec du téléchargement du PDF!');
        }
      });
    }
  }
}
