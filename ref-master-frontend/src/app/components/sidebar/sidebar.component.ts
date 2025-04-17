import { Component } from '@angular/core';
import { faChartLine, faTableList, faHome, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  collapsed = false;

  // FontAwesome icons
  faChartLine = faChartLine;
  faHome = faHome;
  faTableList = faTableList;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }
}
