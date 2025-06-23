import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proyectos',
  // Como tu componente ya es standalone, solo hay que asegurarse de que importe lo necesario:
  standalone: true,
  templateUrl: './proyectos.html',
  styleUrls: ['./proyectos.css']
})
export class Proyectos implements OnInit {
  // Lista de rutas a tus imágenes; ajusta los nombres según estén en tu carpeta:
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
  isFading = false;

  ngOnInit(): void {
    // Cada 10s iniciamos fade
    setInterval(() => this.transition(), 10000);
  }

  private transition() {
    // Comienza el fade-out
    this.isFading = true;

    // Tras 1s (la duración del fade), cambiamos la imagen y fade-in
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.isFading = false;
    }, 1000); // debe coincidir con tu transición CSS
  }

  get currentImage(): string {
    return this.images[this.currentIndex];
  }
}
