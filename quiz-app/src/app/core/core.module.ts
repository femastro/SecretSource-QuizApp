import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AuthRoutingModule } from '../auth/auth-routing.module';
import { AuthService, StoreService } from './services';
import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SharedModule } from '../shared/shared.module';

const components = [
  LayoutComponent,
  NavbarComponent,
  SidenavComponent
]

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    StoreService
  ],
  exports: [
    ...components
  ]
})
export class CoreModule { }
