import {NgModule} from '@angular/core';
import {RouterModule,Routes,PreloadingStrategy,PreloadAllModules} from '@angular/router';

const ROUTES:Routes = [
    {path:'',redirectTo:'auth',pathMatch:'full'},
    {path:'auth',loadChildren:'./pages/login/auth.module#AuthModule'}
]

@NgModule({
    declarations:[],
    imports:[
        RouterModule.forRoot(ROUTES,{useHash:true,preloadingStrategy:PreloadAllModules})
    ],
    exports:[
        RouterModule
    ]
})

export class RoutingModule {}
