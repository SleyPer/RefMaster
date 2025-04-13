import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isDarkMode = false;

  ngOnInit(): void {
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    }
  }

  toggleDarkMode(event: any): void {
    this.isDarkMode = event.target.checked;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }
}
