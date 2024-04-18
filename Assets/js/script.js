// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// Collect employee data
const collectEmployee = () => {
  let firstName = prompt("Enter employee's First Name");
  if (!firstName) {
    firstName = "Unknown";
  }

  let lastName = prompt("Enter employee's Last Name");
  if (!lastName) {
    lastName = "Unknown";
  }

  let salary = parseFloat(prompt("Enter employee's salary"));
  if (isNaN(salary)) {
    salary = 0;
  }
  return {
    firstName,
    lastName,
    salary,
  }
}

const collectEmployees = () => {
  const employees = []
  while (true) {
    const employee = collectEmployee()
    employees.push(employee);
    const addAnother = confirm("Add another employee?")
    if (addAnother === false) {
      break;
    }
  }
  return employees;
}

// Display the average salary
const displayAverageSalary = (employeesArray) => {
  const reducerCallback = (accumulator, currentValue) => {
    return accumulator + currentValue.salary;
  };
  const initialValue = 0;
  const totalSalary = employeesArray.reduce(reducerCallback, initialValue);
  const average = totalSalary / employeesArray.length;
  console.log(`The average employee salary between our ${employeesArray.length} employee(s) is ${average.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  })} `);
}

// Select a random employee
const getRandomEmployee = (employeesArray) => {
  const indexofWinner = (Math.floor(Math.random() * employeesArray.length));
  randomWinner = employeesArray[indexofWinner];
  console.log(`Congratulations to ${randomWinner.firstName} ${randomWinner.lastName}, our random drawing winner! `)
}

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function (employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function () {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function (a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
