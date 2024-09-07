import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CounterAloneComponent } from '../../components/counter-alone/counter-alone.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';

@Component({
  selector: 'alone-page',
  standalone: true,
  imports: [CommonModule, CounterAloneComponent, SideMenuComponent],
  templateUrl: './alone-page.component.html',
  styleUrls: ['./alone-page.component.css']})
export class AlonePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
