// src/app/pages/servicios/servicios.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { Router }            from '@angular/router';

interface Servicio {
  id: string;
  title: string;
  imageUrl: string;
}

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servicios.html',
  styleUrls:  ['./servicios.css']
})
export class Servicios implements OnInit {
  servicios: Servicio[] = [
    { id: 'ambiental', title: 'Asesoría Ambiental',               imageUrl: '/assets/images/servicios/ambiental.png' },
    { id: 'avaluos',   title: 'Avalúos y Ordenamiento Territorial', imageUrl: '/assets/images/servicios/avaluos.png' },
    { id: 'granja',    title: 'Proyecto Granja Urbana',            imageUrl: '/assets/images/servicios/granja.png' },
    { id: 'pavimentos',title: 'Geotecnia y Pavimentos',            imageUrl: '/assets/images/servicios/pavimentos.png' },
    { id: 'topografia',title: 'Topografía, Cartografía y SIG',     imageUrl: '/assets/images/servicios/topo.png' },
    { id: 'vias',      title: 'Diseño Geométrico de Vías',         imageUrl: '/assets/images/servicios/vias.jpg' }
  ];

  selectedId: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  select(serv: Servicio) {
    this.selectedId = serv.id;
    this.router.navigate(['/contacto'], { queryParams: { servicio: serv.id } });
  }
}

