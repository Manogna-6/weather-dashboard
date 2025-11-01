import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  city: string = 'Hyderabad';
  weatherData: any;
  unit: 'C' | 'F' = 'C';

  chartData: any;
  chartOptions: any;

  constructor(private ws: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherData();
  }

  getWeatherData() {
    if (!this.city) return;
    this.ws.getWeather(this.city).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.updateChart();
      },
      error: (err) => console.error('Error fetching data:', err)
    });
  }

  setUnit(unit: 'C' | 'F') {
    this.unit = unit;
  }

  displayTemp(tempC: number, tempF: number): string {
    return this.unit === 'C' ? `${tempC} °C` : `${tempF} °F`;
  }

  updateChart() {
    const temps = [28, 30, 26, 32, 29, 30, 31];
    this.chartData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: `Temperature (°${this.unit})`,
        data: temps,
        backgroundColor: 'rgba(37, 99, 235, 0.4)',
        borderColor: 'rgba(37, 99, 235, 1)',
        borderWidth: 1
      }]
    };

    this.chartOptions = {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    };
  }
}
