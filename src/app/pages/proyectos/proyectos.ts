import { Component, OnInit }                  from '@angular/core';
import { HttpClient, HttpErrorResponse }       from '@angular/common/http';
import { catchError }                         from 'rxjs/operators';
import { of }                                 from 'rxjs';
import { CommonModule }                       from '@angular/common';
import { HttpClientModule }                   from '@angular/common/http';

interface WeatherData {
  city:      string;
  temp:      number;
  desc:      string;
  icon:      string;
  humidity:  number;
  windSpeed: number;
}

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports:      [ CommonModule, HttpClientModule ],
  templateUrl:  './proyectos.html',
  styleUrls:    ['./proyectos.css']
})
export class Proyectos implements OnInit {
  // ─── Carrusel de imágenes ──────────────────────────────────────────────────
  images: string[] = [
    '/assets/images/headers/Header1.jpg',
    '/assets/images/headers/Header2.jpg',
    '/assets/images/headers/Header3.jpg',
    '/assets/images/headers/Header4.jpg',
    '/assets/images/headers/Header5.jpg',
    '/assets/images/headers/Header6.jpg',
    '/assets/images/headers/Header7.jpg',
    '/assets/images/headers/Header8.jpg',
    '/assets/images/headers/Header9.jpg',
    '/assets/images/headers/Header10.jpg',
  ];
  currentIndex = 0;
  isFading     = false;

  // ─── Datos del clima ─────────────────────────────────────────────────────
  weatherList: WeatherData[] = [];
  loadingWthr = true;
  errorWthr?: string;

  // ─── Lista de ciudades a consultar ────────────────────────────────────────
  private cities = [
    'Bogota,co',
    'Medellin,co',
    'Barranquilla,co',
    'Cartagena,co',
    'Villavicencio,co'
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // 1) Iniciar carrusel
    setInterval(() => this.transition(), 10000);

    // 2) Por cada ciudad, lanzar consulta al clima
    this.cities.forEach(city => this.fetchWeather(city));
  }

  /** fade-out / fade-in del carrusel */
  private transition() {
    this.isFading = true;
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.isFading     = false;
    }, 1000);
  }

  get currentImage(): string {
    return this.images[this.currentIndex];
  }

  /** consulta a OpenWeather por ciudad y acumula en weatherList */
  private fetchWeather(city: string): void {
    const apiKey = '668f505853d1b06c088492700d8a5714';  // ← tu clave
    const url    = `https://api.openweathermap.org/data/2.5/weather`
                 + `?q=${encodeURIComponent(city)}`
                 + `&units=metric&appid=${apiKey}`;

    this.http.get<any>(url).pipe(
      catchError((err: HttpErrorResponse) => {
        // Si cualquiera falla, lo registramos pero seguimos con las demás
        this.errorWthr   = `No pude cargar el clima de ${city}`;
        return of(null);
      })
    ).subscribe(resp => {
      if (resp?.main && resp.weather?.[0]) {
        this.weatherList.push({
          city:      resp.name,
          temp:      resp.main.temp,
          desc:      resp.weather[0].description,
          icon:      `https://openweathermap.org/img/wn/${resp.weather[0].icon}@2x.png`,
          humidity:  resp.main.humidity,
          windSpeed: resp.wind.speed
        });
      }
      // Una vez que termine la última petición, ocultamos el loader
      if (this.weatherList.length === this.cities.length) {
        this.loadingWthr = false;
      }
    });
  }
}