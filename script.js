let employees = JSON.parse(localStorage.getItem("employees")) || [];
let editEmployeeId = null;

displayEmployees();

function addEmployee() {

    let id = document.getElementById("empId").value;
    let name = document.getElementById("empName").value;
    let dept = document.getElementById("empDept").value;
    let salary = document.getElementById("empSalary").value;

    if (id === "" || name === "" || dept === "" || salary === "") {
        alert("Please fill all fields");
        return;
    }

    if (editEmployeeId) {

        employees = employees.map(emp => {

            if (emp.id === editEmployeeId) {
                return {
                    id: id,
                    name: name,
                    dept: dept,
                    salary: salary
                };
            }

            return emp;
        });

        editEmployeeId = null;

    } else {

        employees.push({
            id: id,
            name: name,
            dept: dept,
            salary: salary
        });
    }

    localStorage.setItem(
        "employees",
        JSON.stringify(employees)
    );

    displayEmployees();

    document.getElementById("empId").value = "";
    document.getElementById("empName").value = "";
    document.getElementById("empDept").value = "";
    document.getElementById("empSalary").value = "";
}

function displayEmployees() {

    let table = document.getElementById("employeeTable");

    table.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
    `;

    employees.forEach(function(emp) {

        let row = table.insertRow();

        row.insertCell(0).innerHTML = emp.id;
        row.insertCell(1).innerHTML = emp.name;
        row.insertCell(2).innerHTML = emp.dept;
        row.insertCell(3).innerHTML = emp.salary;

        row.insertCell(4).innerHTML =
        `<button onclick="editEmployee('${emp.id}')">Edit</button>`;

        row.insertCell(5).innerHTML =
        `<button onclick="deleteEmployee('${emp.id}')">Delete</button>`;
    });

    updateEmployeeCount();
}

function editEmployee(employeeId) {

    let employee = employees.find(
        emp => emp.id === employeeId
    );

    document.getElementById("empId").value = employee.id;
    document.getElementById("empName").value = employee.name;
    document.getElementById("empDept").value = employee.dept;
    document.getElementById("empSalary").value = employee.salary;

    editEmployeeId = employeeId;
}

function deleteEmployee(employeeId) {

    employees = employees.filter(
        emp => emp.id !== employeeId
    );

    localStorage.setItem(
        "employees",
        JSON.stringify(employees)
    );

    displayEmployees();
}

function updateEmployeeCount() {

    document.getElementById("employeeCount").innerHTML =
    "Total Employees: " + employees.length;
}

function searchEmployee() {

    let input =
    document.getElementById("searchInput").value.toLowerCase();

    let rows =
    document.querySelectorAll("#employeeTable tr");

    for (let i = 1; i < rows.length; i++) {

        let name =
        rows[i].cells[1].innerHTML.toLowerCase();

        if (name.includes(input)) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}