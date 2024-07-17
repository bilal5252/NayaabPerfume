import { Component, OnInit } from '@angular/core';
import { ModelComponent } from '../shared/ui/model/model.component';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { ToastrService } from 'ngx-toastr';
import { IEmployee } from '../shared/models/Employee';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [ModelComponent, EmployeeFormComponent, FormsModule, CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit {
  isModelOpen = false;
  employees: IEmployee[] = [];
  employee!: IEmployee;
  formMode: any;
  searchText: any;
  cEmployees: any;

  constructor(
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllEmployee();
  }

  getAllEmployee() {
    const EmpData = localStorage.getItem('EmpData');
    // localStorage.removeItem('EmpData')
    if(EmpData){
      this.employees = JSON.parse(EmpData);
      this.cEmployees = this.employees;
    }
    console.log(this.employees)
  }

  loadEmployee(employee: IEmployee) {
    this.employee = employee;
    this.openModel();
    this.formMode = 'edit';
  }

  deleteEmployee(id: string) {
    const eData = localStorage.getItem('EmpData');
    const data = JSON.parse(eData?eData:'');
    data.splice(data.findIndex((a: any) => a._id === id) , 1);
    localStorage.setItem('EmpData', JSON.stringify(data));
    this.toastr.success("record Deleted successfully...!");
    this.getAllEmployee();
  }

  search(e: any){
    console.log(e.target.value);
    if (this.searchText == '') {
      this.employees = this.cEmployees;
    } else {
      const filteredEmployees = this.employees.filter(element =>
      element.name.includes(e.target.value.toLowerCase()));
      this.employees = filteredEmployees;
    }
  }

  openModel() {
    this.isModelOpen = true;
    this.formMode = 'add';
  }

  closeModel() {
    this.isModelOpen = false;
    this.getAllEmployee();
  }
}
