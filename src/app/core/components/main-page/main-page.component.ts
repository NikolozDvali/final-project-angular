import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, SidebarComponent, NavbarComponent],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
}
