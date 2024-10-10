import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-cutome-dialog-box',
  templateUrl: './custom-dialog-box.component.html',
  styleUrl: './custom-dialog-box.component.css'
})
export class CustomDialogBoxComponent {


  constructor(private dialogRef: MatDialogRef<CustomDialogBoxComponent>) {}

  onNoClick(): void {
    this.dialogRef.close(false); // Pass false when "No" is clicked
  }

  onYesClick(): void {
    this.dialogRef.close(true); // Pass true when "Yes" is clicked
  }

}
