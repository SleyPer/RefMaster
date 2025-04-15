import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ContentService } from './services/content.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('content') contentRef!: ElementRef<HTMLElement>;

  sidebarOpen = false;

  constructor(private contentService: ContentService) { }

  ngAfterViewInit(): void {
    this.contentService.setContentRef(this.contentRef);
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
