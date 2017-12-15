import {NgModule} from '@angular/core';
import {RouterModule,Routes,PreloadingStrategy,PreloadAllModules} from '@angular/router';
import { MapComponent } from './pages/map/map.component';

const ROUTES:Routes = [
    {path:'',redirectTo:'auth',pathMatch:'full'},
    {path:'auth',loadChildren:'./pages/auth/auth.module#AuthModule'},
    {path:'map', component:MapComponent}
]

@NgModule({
    declarations:[MapComponent],
    imports:[
        RouterModule.forRoot(ROUTES,{useHash:true,preloadingStrategy:PreloadAllModules})
    ],
    exports:[
        RouterModule
    ]
})

export class RoutingModule {}
