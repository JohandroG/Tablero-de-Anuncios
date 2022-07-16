import { Component, OnInit } from '@angular/core';
import { CompConnectionService } from '../services/comp-connection.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  navInfo = {
    title: "Información de la App",
    search : false,
    profile: true,
    utilities: false
  }



  constructor(private _compConnService: CompConnectionService) { }

  ngOnInit(): void {
    this.emitNavInfo();
  }

  emitNavInfo(){
    this._compConnService.navinfo.emit(this.navInfo)
  }

}
