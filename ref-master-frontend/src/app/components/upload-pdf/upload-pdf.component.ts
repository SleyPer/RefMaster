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
  isDragOver = false;
  totalFiles = 0;
  validPdfCount = 0;
  isUploading = false;

  constructor(
    private pdfService: PdfService,
    private toastr: ToastrService
  ) { }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFiles(input.files);
    }
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;

    const items = event.dataTransfer?.items;
    if (!items) return;

    const files: File[] = [];

    const traverseFileTree = (item: any, path: string): Promise<void> => {
      return new Promise((resolve) => {
        if (item.isFile) {
          item.file((file: File) => {
            files.push(file);
            resolve();
          });
        } else if (item.isDirectory) {
          const dirReader = item.createReader();
          dirReader.readEntries((entries: any[]) => {
            const promises = entries.map(entry => traverseFileTree(entry, path + item.name + "/"));
            Promise.all(promises).then(() => resolve());
          });
        }
      });
    };

    const readAllFiles = async () => {
      const promises: Promise<void>[] = [];

      for (let i = 0; i < items.length; i++) {
        const entry = items[i].webkitGetAsEntry?.();
        if (entry) {
          promises.push(traverseFileTree(entry, ""));
        }
      }

      await Promise.all(promises);

      const areAllPdf = files.every(file => file.type === 'application/pdf');

      if (!areAllPdf) {
        this.toastr.error('Tous les fichiers du dossier doivent être des fichiers PDF uniquement.');
        return;
      }

      const dataTransfer = new DataTransfer();
      files.forEach(file => {
        dataTransfer.items.add(file);
      });

      this.handleFiles(dataTransfer.files);
    };

    readAllFiles();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  private handleFiles(fileList: FileList): void {
    const files = Array.from(fileList);
    this.totalFiles = files.length;

    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    this.validPdfCount = pdfFiles.length;

    if (this.validPdfCount !== this.totalFiles) {
      this.toastr.error(`Seuls les fichiers PDF sont autorisés. ${this.validPdfCount}/${this.totalFiles} sont valides.`);
      return;
    }

    this.isUploading = true;
    this.pdfService.uploadPdf(pdfFiles).subscribe({
      next: () => {
        this.isUploading = false;
        this.designationCreated.emit();
        const msg = pdfFiles.length > 0 ? pdfFiles.length + ' désignations téléchargées avec succès !' : '1 désignation ajoutée avec succès !';
        this.toastr.success(msg);
      },
      error: () => {
        this.isUploading = false;
        this.toastr.error('Une erreur est survenue !');
      }
    });
  }
}
