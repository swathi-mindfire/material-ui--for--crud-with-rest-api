import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';



const matmodules = [
                          MatButtonModule,
                          MatGridListModule,
                          MatCardModule,
                          MatInputModule,
                          MatRadioModule,
                          MatSelectModule
                      ];
@NgModule({
  
  imports: [matmodules],
  exports: [matmodules]
})
export class MaterialUiModule { }
