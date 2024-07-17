import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { IEmployee } from '../shared/models/Employee';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent implements OnChanges {
  @Input() data: IEmployee | null = null;
  @Input() formMode: any;
  @Output() onCloseModel = new EventEmitter();

  employeeForm!: FormGroup;
  EmployeeData: any[] = [];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.employeeForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      remaining: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      sellingPrice: new FormControl('', [Validators.required]),
      _id: Math.random() * 100
    });
  }

  onClose() {
    this.employeeForm.reset();
    this.onCloseModel.emit(false);
  }

  ngOnChanges(): void {
    if (this.data) {
      this.employeeForm.patchValue({
        name: this.data.name,
        category: this.data.category,
        quantity: this.data.quantity,
        remaining: this.data.remaining,
        price: this.data.price,
        sellingPrice: this.data.sellingPrice,
        _id: this.data._id
      });
    }
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      if (this.data && this.formMode === 'edit') {
        const eData = localStorage.getItem('EmpData');
        const data = JSON.parse(eData?eData:'');
        data.splice(data.findIndex((a: any) => a._id === this.data?._id) , 1)
        data.push(this.employeeForm.value);
        localStorage.setItem('EmpData', JSON.stringify(data));
        this.onClose();
        this.toastr.success('record Updated successfully...!');
        this.employeeForm.reset();
      } else {
        const eData = localStorage.getItem('EmpData');
        if(eData){
          const data = JSON.parse(eData?eData:'');
          data.push(this.employeeForm.value);
          localStorage.setItem('EmpData', JSON.stringify(data));
        } else {
          this.EmployeeData.push(this.employeeForm.value);
          localStorage.setItem('EmpData', JSON.stringify(this.EmployeeData));
        }
        this.onClose();
        this.toastr.success('record Inserted successfully...!');
        this.employeeForm.reset();
      }
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }

  resetEmployeeForm() {
    this.employeeForm.reset();
    this.onClose();
  }
}
