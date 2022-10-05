import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() title    : string = 'Inactivar';
  @Input() question : string = '¿Desea inactivar el registro?';

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  ok():void{
    this.activeModal.close(true);
  }

}
