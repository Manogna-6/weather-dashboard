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
  weatherIcon: string = '';

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

        // ✅ Fix: WeatherAPI icon URL already contains a valid path
        this.weatherIcon = `https:${data.current.condition.icon}`;

        // ✅ Update the chart after loading data
        this.updateChart();
      },
      error: (err) => console.error('Error fetching data:', err)
    });
  }

  setUnit(unit: 'C' | 'F') {
    this.unit = unit;
    this.updateChart(); // update chart units dynamically
  }

  displayTemp(tempC: number, tempF: number): string {
    return this.unit === 'C' ? `${tempC} °C` : `${tempF} °F`;
  }

  updateChart() {
  if (!this.weatherData?.forecast?.forecastday) return;

  const labels = this.weatherData.forecast.forecastday.map((d: any) => d.date);
  const temps = this.weatherData.forecast.forecastday.map((d: any) =>
    this.unit === 'C' ? d.day.avgtemp_c : d.day.avgtemp_f
  );

  this.chartData = {
    labels,
    datasets: [
      {
        label: `Temperature (°${this.unit})`,
        data: temps,
        backgroundColor: 'rgba(37, 99, 235, 0.4)',
        borderColor: 'rgba(37, 99, 235, 1)',
        borderWidth: 2,
        borderRadius: 6,
      },
    ],
  };

  this.chartOptions = {
    responsive: true,
    scales: {
      y: { beginAtZero: true },
    },
  };
}
}

