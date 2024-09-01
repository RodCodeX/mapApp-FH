import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}
@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css'],
})
export class MarkersPageComponent implements AfterViewInit {
  @ViewChild('map') divMap?: ElementRef;
  markers: MarkerAndColor[] = [];
  map?: Map;
  currentLngLat: LngLat = new LngLat(-68.1921787711195, -16.525022017605238);

  ngAfterViewInit(): void {
    // console.log(this.divMap?.nativeElement);
    if (!this.divMap) throw 'El elemento HTML no fue encontrado';
    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: 13, // starting zoom
    });
    this.readFromLocalStorage();

    //?Referencia como crear un marcador en mapbox
    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Rodrigo Chuquimia';

    // const marker = new Marker({
    //   // color: 'red'
    //   element: markerHtml
    // })
    // .setLngLat(this.currentLngLat)
    // .addTo(this.map);
  }

  createMarker(): void {
    if (!this.map) return;
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const lngLat = this.map?.getCenter();
    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: LngLat, color: string): void {
    if (!this.map) return;
    const marker = new Marker({
      color: color,
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    this.markers.push({
      color: color,
      marker: marker,
    });
    this.saveToLocalStorage();
    marker.on('dragend',()=> this.saveToLocalStorage());
    // console.log(this.markers);
  }

  deleteMarker(index: number): void {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  flyTo(marker: Marker): void {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat(),
    });
  }

  saveToLocalStorage(): void {
    // console.log(this.markers);
    const plainMarkers: PlainMarker[] = this.markers.map(({ color, marker }) => {
        return {
          color,
          lngLat: marker.getLngLat().toArray(),
        };
      }
    );
    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
    // console.log(plainMarkers);
  }

  readFromLocalStorage(): void {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarker:PlainMarker[] = JSON.parse(plainMarkersString);
    console.log(plainMarker);
    plainMarker.forEach(({color, lngLat}) => {
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat)
      
      this.addMarker(coords, color);
    })
  }
}
