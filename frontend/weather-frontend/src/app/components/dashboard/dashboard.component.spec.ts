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

  // ✅ Fetch weather data
  getWeatherData() {
    if (!this.city.trim()) return;
    this.ws.getWeather(this.city).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.updateChart();
      },
      error: (err) => console.error('Error fetching data:', err)
    });
  }

  // ✅ Switch between Celsius and Fahrenheit
  setUnit(unit: 'C' | 'F') {
    this.unit = unit;
    this.updateChart(); // update chart when unit changes
  }

  // ✅ Display correct temperature
  displayTemp(tempC: number, tempF: number): string {
    return this.unit === 'C' ? `${tempC} °C` : `${tempF} °F`;
  }

  // ✅ Generate simple chart with mock weekly data (optional: make dynamic later)
  updateChart() {
    const tempsC = [28, 25, 29, 22, 24, 30, 31];
    const tempsF = tempsC.map(t => (t * 9/5) + 32);
    const temps = this.unit === 'C' ? tempsC : tempsF;

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
