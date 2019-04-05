import { Component, OnInit } from '@angular/core';
import {UploadService } from '../upload.service';
import {Upload } from '../models/upload.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.css']
})
export class UploadDetailsComponent {
  files: FileList;
  upload: Upload;
  constructor(private uploadService: UploadService) { }

  handleFiles(event) {
   this.files = event.target.files;
  }
  uploadFiles() {
   const filesToUpload = this.files;
  const filesIdx = _.range(filesToUpload.length);
  console.log(_.range(filesToUpload.length));
  _.each(filesIdx, (idx) => {
    // console.log(filesToUpload[idx]);
    this.upload = new Upload(filesToUpload[idx]);
    this.uploadService.uploadFile(this.upload);
  });
  }

}
