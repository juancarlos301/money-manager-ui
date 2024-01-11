import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

import { BalanceResponseType } from '../../../../types';

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  imports: [],
  templateUrl: './doughnut-chart.component.html',
  styleUrl: './doughnut-chart.component.scss',
})
export class DoughnutChartComponent implements OnInit {
  @Input() data!: BalanceResponseType;
  chart!: any;

  ngOnInit(): void {
    this.createChart();
  }
  createChart() {
    this.chart = new Chart('DoughnutChart', {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [10, 20, 30],
            backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C'],
          },
          {
            data: [10, 20, 30],
            backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C'],
          },
        ],
        labels: ['Red', 'Green', 'Yellow'],
      },
    });
  }
}
