import { Component, OnInit } from '@angular/core';
import { TirageListSharedComponent } from '../../../shared/admin/tirage-list-shared/tirage-list-shared.component';
import { LotteriesOverviewResponse } from '../../../constants/ressources/user/tirageUserRessource';
import { TirageListService } from './service/tirage-list.service';

@Component({
  selector: 'app-tirage-list',
  standalone: true,
  imports: [TirageListSharedComponent],
  templateUrl: './tirage-list.component.html',
  styleUrl: './tirage-list.component.css',
})
export class TirageListComponent implements OnInit {
  tirages: LotteriesOverviewResponse;

  constructor(private tirageListService: TirageListService) {
    this.tirages = [] as LotteriesOverviewResponse;
  }

  ngOnInit(): void {
    this.loadTirages();
  }

  loadTirages(): void {
    this.tirageListService.getTirageList().subscribe({
      next: (data) => {
        this.tirages = data.data;
      },
      error: (err) => {},
    });
  }

  onUpdate(): void {
    this.loadTirages();
  }
}
