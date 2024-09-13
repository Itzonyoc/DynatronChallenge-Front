import { Component } from '@angular/core';
import { CRUDService } from 'src/service/crud.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CRUDComponent {
  constructor(
    public _crud: CRUDService
  ) { }

}
