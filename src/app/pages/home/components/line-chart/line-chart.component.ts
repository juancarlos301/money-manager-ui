import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

import { BalanceResponseType } from '../../../../types';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
})
export class LineChartComponent implements OnInit {
  @Input() data!: BalanceResponseType;
  chart!: Chart<'line', { x: Date; y: number }[], unknown>;

  ngOnInit(): void {
    this.createChart();
  }
  createChart() {
    console.log(this.data);
    this.chart = new Chart('LineChart', {
      type: 'line',

      data: {
        datasets: [
          {
            label: 'Incomes',
            data:
              this.data?.incomes?.map((item) => {
                return { x: item.createdAt, y: parseFloat(item.value) };
              }) || [],
            backgroundColor: '#f44336',
            borderColor: '#f44336',
            tension: 0.1,
          },
          {
            label: 'Expenses',
            data:
              this.data?.expenses?.map((item) => {
                return { x: item.createdAt, y: parseFloat(item.value) };
              }) || [],
            backgroundColor: '#3f51b5',
            borderColor: '#3f51b5',
            tension: 0.1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            bodyFont: {
              size: 14,
            },
            titleFont: {
              size: 16,
              weight: 'bold',
            },
          },
        },
      },
    });
  }
}
