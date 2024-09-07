import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { MapsRoutingModule } from './maps-routing.module';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';

import * as mapboxgl from 'mapbox-gl';
import { CounterAloneComponent } from '../alone/components/counter-alone/counter-alone.component';
import { SideMenuComponent } from '../alone/components/side-menu/side-menu.component';

(mapboxgl as any).accessToken =
  'pk.eyJ1Ijoicm9kcnkwNyIsImEiOiJjbTBpd2R6ZTQwaTNiMmpvbjNvd2R6cHVwIn0.2TaP8KaOtA44WB_vfq1jyQ';

@NgModule({
  declarations: [
    MiniMapComponent,
    MapsLayoutComponent,
    FullScreenPageComponent,
    MarkersPageComponent,
    PropertiesPageComponent,
    ZoomRangePageComponent,
  ],
  imports: [
    CommonModule, 
    MapsRoutingModule, 
    CounterAloneComponent,
    SideMenuComponent,
  ],
})

//!NOTA 
//? Todos los standole components se tienen que declarar en el import (module)
export class MapsModule {}
