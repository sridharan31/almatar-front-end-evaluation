import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, NgIf } from '@angular/common';
//declare var $: any;

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports:[RouterModule, CommonModule, NgIf],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems:RouteInfo[]=[];
  // this is for the open close


  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onMenuClick(menuItem: RouteInfo): void {
    if (menuItem.submenu.length > 0) {
      menuItem.expanded = !menuItem.expanded;
    } else {
      this.showMenu = menuItem.title;
    }
  }
  navigateWithFilter(path: string, filterValue: string): void {
    if(filterValue){
      this.router.navigate([path], { queryParams: { filter: filterValue } });
    } else {
      this.router.navigate([path]);
    }
    
  }

  ngOnInit() {
    this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
  }
}
