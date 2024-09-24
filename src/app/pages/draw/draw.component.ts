import { Component, OnInit } from '@angular/core';
import { NavbarSharedComponent } from "../../shared/navbar-shared/navbar-shared.component";
import { DrawRankComponent } from "../../shared/draw-shared/draw-rank/draw-rank.component";
import { DrawOverviewComponent } from '../../shared/draw-shared/draw-overview/draw-overview.component';
import { FooterSharedComponent } from '../../shared/footer-shared/footer-shared.component';

@Component({
  selector: 'app-draw',
  standalone: true,
  imports: [NavbarSharedComponent, DrawRankComponent, DrawOverviewComponent, FooterSharedComponent],
  templateUrl: './draw.component.html',
  styleUrl: './draw.component.css'
})
export class DrawComponent implements OnInit {
  pageState: string = 'draw';

  ngOnInit(): void {
     window.scrollTo(0, 0);
  }
}
