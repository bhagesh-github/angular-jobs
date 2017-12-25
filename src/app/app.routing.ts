import {NgModule} from '@angular/core';
import {RouterModule,Routes,PreloadingStrategy,PreloadAllModules} from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './pages/map/map.component';
import { MapDumbComponent } from './components/map/map.dumb.component';

const ROUTES:Routes = [
    {path:'',redirectTo:'auth',pathMatch:'full'},
    {path:'auth',loadChildren:'./pages/auth/auth.module#AuthModule'},
    {path:'map', component:MapComponent}
]

@NgModule({
    declarations:[MapComponent,MapDumbComponent],
    imports:[
        RouterModule.forRoot(ROUTES,{useHash:true,preloadingStrategy:PreloadAllModules}),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD51Z8SQ2k7Xwh_4AdTYAlBvxVFKTgn3d0'
        })
    ],
    exports:[
        RouterModule
    ]
})

export class RoutingModule {}
