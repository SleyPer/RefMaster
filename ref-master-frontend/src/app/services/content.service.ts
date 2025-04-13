import { ElementRef, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ContentService {
  contentRef!: ElementRef<HTMLElement>;

  setContentRef(ref: ElementRef<HTMLElement>) {
    this.contentRef = ref;
  }

  scrollToTop(): void {
    this.contentRef?.nativeElement?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToBottom(): void {
    const el = this.contentRef?.nativeElement;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  }
}
