import { Component, OnInit } from '@angular/core';
import { Bill } from '../models/billdetail.model';
import {UploadService } from '../upload.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  bill: Bill = {
    gstin : '',
    company : '',
    amount : '',
    paidby : '',
    date : '',
    vendornum : '',
    notes : ''
  };
  constructor( private uploadService: UploadService) { }

  ngOnInit() {
  }

  onSubmit() {
  // tslint:disable-next-line:curly
  console.log('entered onSubmit method');
  if ( this.bill.amount !== '' && this.bill.date !== '') {
    this.uploadService.addDetail(this.bill);
    this.bill.gstin = '';
    this.bill.amount = '';
    this.bill.notes = '';
    this.bill.date = '';
    this.bill.vendornum = '';
    this.bill.company = '';
  }
  }

}
