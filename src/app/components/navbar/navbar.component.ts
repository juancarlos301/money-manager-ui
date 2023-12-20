import { Component, ElementRef, ViewChild } from '@angular/core';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { MatSidenav } from '@angular/material/sidenav';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

    @ViewChild('sidenav') 
     private sideMenu!: MatSidenav;

  onResize(event:any):void{
    let widthWindow: number = event.target.innerWidth;

    if(widthWindow > 800){
      this.sideMenu.close();
    }

  }

}
