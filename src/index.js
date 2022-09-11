import { Request } from "./requests";
import { UI } from "./ui";

//ELEMETLERİ SEÇME

const form = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const employeesList = document.getElementById("employees");
const updateEmployeeButton = document.getElementById("update");

const request = new Request("http://localhost:3000/employees");
const ui = new UI();

let updateState = null;
eventListeners();

function eventListeners(){
    document.addEventListener("DOMContentLoaded", getAllEmployees);
    form.addEventListener("submit", addEmployee);
    employeesList.addEventListener("click", updateOrDelete);
    updateEmployeeButton.addEventListener("click", updateEmployee);
}

function getAllEmployees(){
    
    request.get()
    .then(employees => {
        ui.addAllEmployeeToUI(employees);
    })
    .catch(err => console.error(err));

}

function addEmployee(e){
    const employeeName = nameInput.value.trim();
    const employeeDepartment = departmentInput.value.trim();
    const employeeSalary = salaryInput.value.trim();

    if (employeeName === "" || employeeDepartment ==="" || employeeSalary === ""){
        alert("Lütfen Tüm Alanları Doldurunuz.")
    }else{
        request.post({name: employeeName, department: employeeDepartment, salary: Number(employeeSalary)})
        .then(employee => {
            ui.addEmployeeToUI(employee)
        })
        .catch(err => console.error(err));
    }
    


    ui.clearInputs();
    e.preventDefault();
}

function updateOrDelete(e){

    if(e.target.id === "delete-employee"){
        //Silme İşlemi
        deleteEmployee(e.target);
    }else if(e.target.id === "update-employee"){
        //Güncelleme İşlemi
        updateEmployeeController(e.target.parentElement.parentElement);
        
    }

}
function deleteEmployee(targetEmployee){
    const id = targetEmployee.parentElement.previousElementSibling.previousElementSibling.textContent;

    request.delete(id)
    .then(message => {
        ui.deleteEmployeeFromUI(targetEmployee.parentElement.parentElement);
    })
    .catch(err => console.error(err))
}

function updateEmployeeController(targetEmployee){
    ui.toggleUpdateButton(targetEmployee);


    if (updateState === null){
        updateState = {
            updateId : targetEmployee.children[3].textContent,
            updateParent : targetEmployee
        }
    }else{
        updateState = null;
    }
}
function updateEmployee(){
    if(updateState){
        //Güncelleme
        const data = {name: nameInput.value.trim(), department: departmentInput.value.trim(), salary: Number(salaryInput.value.trim())}
        request.put(updateState.updateId, data)
        .then(updatedEmployee => {
            ui.updateEmployeeOnUI(updatedEmployee, updateState.updateParent);
            
        })
        .catch(err => console.error(err))
    }
}




