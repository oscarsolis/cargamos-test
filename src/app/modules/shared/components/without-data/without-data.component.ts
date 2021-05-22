import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-without-data',
  templateUrl: './without-data.component.html',
  styleUrls: ['./without-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WithoutDataComponent {

  @Input()
  public message = 'Ups! no tenemos nada que mostrar';

}
