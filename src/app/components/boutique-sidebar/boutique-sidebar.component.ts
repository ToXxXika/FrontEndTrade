import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/trade', title: 'Gestion de Transactions',  icon: 'ni-tv-2 text-primary', class: '' },
  {path:'/user-profile',title: 'Profile utilisateur', icon: 'ni-tv-2 text-primary', class:''},
  {path:'/QrScanner',title: 'Gestion des Produits', icon: 'ni-tv-2 text-primary', class:''}

];
@Component({
  selector: 'app-boutique-sidebar',
  templateUrl: './boutique-sidebar.component.html',
  styleUrls: ['./boutique-sidebar.component.css']
})
export class BoutiqueSidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true
  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

}
