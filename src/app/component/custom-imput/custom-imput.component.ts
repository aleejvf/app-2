import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-imput',
  templateUrl: './custom-imput.component.html',
  styleUrls: ['./custom-imput.component.scss'],
  standalone : false
})
export class CustomImputComponent  implements OnInit {
  @Input() control!: FormControl;
  @Input() type!: string;
  @Input() label!: string;
  @Input() autocomplete!: string; // Nota: corregido "autcomplete"
  @Input() icon!: string;
  

  constructor() { }

  ngOnInit() {}

}
