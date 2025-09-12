import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ApiService } from '../../../core/services/charts.service';
import { VWGastosMensaisPorCategoriaResponseDTO } from '../../../core/models';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
})
export class ChartsComponent implements OnInit {

  chartData: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    console.log("ChartsComponent initialized");
    // Exemplo de chamada. Adapte os filtros conforme sua necessidade.
    this.apiService.getGastosMensais(undefined, 2024).subscribe(data => {
      this.chartData = this.transformDataForChart(data.content);
    });
  }

  transformDataForChart(data: VWGastosMensaisPorCategoriaResponseDTO[]): any[] {
    const monthlyData: { [key: string]: number } = {};

    // Agrupa os gastos por mês
    for (const item of data) {
      const monthName = new Date(item.ano, item.mes - 1, 1).toLocaleString('default', { month: 'long' });
      if (monthlyData[monthName]) {
        monthlyData[monthName] += item.totalGasto;
      } else {
        monthlyData[monthName] = item.totalGasto;
      }
    }

    // Formata para o formato que o ngx-charts espera
    return Object.keys(monthlyData).map(month => {
      return {
        name: month,
        value: monthlyData[month]
      };
    });
  }

  onSelect(event: any): void {
    console.log(event);
  }
}