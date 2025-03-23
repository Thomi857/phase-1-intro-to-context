// Your code here

function createEmployeeRecord(employeeArray) {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeesArray) {
    return employeesArray.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })

    return employee
}

function createTimeOutEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })

    return employee
}

function hoursWorkedOnDate(employee, data) {
    let timeIn = employee.timeInEvents.find(event => event.date === data)
    let timeOut = employee.timeOutEvents.find(event => event.date === data)

    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employee, data) {
    return hoursWorkedOnDate(employee, data) * employee.payPerHour
}

function allWagesFor(employee) {
    return employee.timeInEvents.reduce((total, event) => total + wagesEarnedOnDate(employee, event.date), 0)
}

function calculatePayroll(employees){
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0)
}