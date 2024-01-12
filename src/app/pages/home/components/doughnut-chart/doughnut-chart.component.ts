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
  @Input() select: 'expenses' | 'incomes' = 'expenses';

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
            data: this.data[this.select].map((item) => parseFloat(item.value)),
            backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C'],
          },
        ],
        labels: ['Red', 'Green', 'Yellow'],
      },
    });
  }
}
