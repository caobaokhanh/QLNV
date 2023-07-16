function Employee(
  id,
  name,
  email,
  password,
  daysOfWork,
  basicSalary,
  position,
  timesOfWork
) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.password = password;
  this.daysOfWork = daysOfWork;
  this.basicSalary = basicSalary;
  this.position = position;
  this.timesOfWork = timesOfWork;
}

Employee.prototype.calSalary = function () {
  if (this.position === "Sếp") {
    return this.basicSalary * 3;
  }
  if (this.position === "Trưởng phòng") {
    return this.basicSalary * 2;
  }
  if (this.position === "Nhân viên") {
    return this.basicSalary * 1;
  }
};

Employee.prototype.rankingEmployee = function () {
  if (this.timesOfWork >= 192) {
    return "Xuất sắc";
  } else if (this.timesOfWork >= 176) {
    return "Giỏi";
  } else if (this.timesOfWork >= 160) {
    return "Khá";
  } else {
    return "Trung bình";
  }
};
