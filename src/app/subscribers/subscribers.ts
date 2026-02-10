import { Component } from '@angular/core';
import { SubSer } from '../services/sub-ser';

@Component({
  selector: 'app-subscribers',
  imports: [],
  templateUrl: './subscribers.html',
  styleUrl: './subscribers.css',
})
export class Subscribers {

  subArr: any[] = []; 

  constructor(private subSer: SubSer  ) { }

  ngOnInit(): void {
    this.subSer.loadData().subscribe(data => {
      this.subArr = data;
      console.log('Subscribers data:', data);
    }); 
  }

  onDelete(id: string) {  
    this.subSer.deleteData(id);
  }

}
