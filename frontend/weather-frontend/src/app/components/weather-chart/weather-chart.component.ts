import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-weather-chart',
  templateUrl: './weather-chart.component.html',
})
export class WeatherChartComponent {
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [28, 30, 27, 32, 29, 31, 33],
        label: 'Temperature (°C)',
        fill: true,
        tension: 0.4,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        pointBackgroundColor: '#2563eb',
      },
    ],
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#1e3a8a',
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#1e3a8a' },
        grid: { display: false },
      },
      y: {
        ticks: { color: '#1e3a8a' },
        grid: { color: 'rgba(37, 99, 235, 0.1)' },
      },
    },
  };
}
