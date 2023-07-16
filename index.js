// mảng để lưu lại các nhân viên
let employees = [];

// kiểm tra xem form đã được submit hay chưa
let isSubmitted = false;

init();

function init() {
  // student = null || []
  // || lấy giá trị true đầu tiên
  employees = JSON.parse(localStorage.getItem("employees")) || [];

  employees = employees.map((value) => {
    return new Employee(
      value.id,
      value.name,
      value.email,
      value.password,
      value.daysOfWork,
      value.basicSalary,
      value.position,
      value.timesOfWork
    );
  });

  display(employees);
}

getElement("btnThem").onclick = function () {
  getElement("btnCapNhat").disabled = true;
};

// Thêm nhân viên
function addEmployee() {
  isSubmitted = true;
  let employee = validate();
  if (!employee) {
    return;
  }

  employees.push(employee);
  resetForm();
  $("#myModal").modal("hide");

  localStorage.setItem("employees", JSON.stringify(employees));

  display(employees);
}

// Xóa nhân viên
function removeEmployee(employeeId) {
  employees = employees.filter((value) => {
    return value.id !== employeeId;
  });

  localStorage.setItem("employees", JSON.stringify(employees));
  display(employees);
}

// Hiển thị
function display(employees) {
  let html = employees.reduce((result, value) => {
    return (
      result +
      `
      <tr>
          <td>${value.id}</td>
          <td>${value.name}</td>
          <td>${value.email}</td>
          <td>${value.daysOfWork}</td>
          <td>${value.position}</td>
          <td>${value.calSalary()}</td>
          <td>${value.rankingEmployee()}</td>
          <td>
          <button onclick="selectEmployee('${
            value.id
          }')" class="btn btn-success">Chỉnh Sửa</button>
          <button onclick="removeEmployee('${
            value.id
          }')" class="btn btn-danger">Xóa</button>
          </td>
      </tr>
      `
    );
  }, "");

  getElement("tableDanhSach").innerHTML = html;
}

// Cập nhật
function updateEmployee() {
  let employee = validate();
  if (!employee) {
    return;
  }

  let index = employees.findIndex((value) => {
    return value.id === employee.id;
  });

  employees[index] = employee;
  resetForm();
  $("#myModal").modal("hide");

  localStorage.setItem("employees", JSON.stringify(employees));
  // B4: HIỂN THỊ
  display(employees);
}

// reset
function resetForm() {
  //input
  getElement("tknv").value = "";
  getElement("name").value = "";
  getElement("email").value = "";
  getElement("password").value = "";
  getElement("datepicker").value = "";
  getElement("luongCB").value = "";
  getElement("chucvu").value = "";
  getElement("gioLam").value = "";
  //span
  getElement("tbTKNV").innerHTML = "";
  getElement("tbTen").innerHTML = "";
  getElement("tbEmail").innerHTML = "";
  getElement("tbMatKhau").innerHTML = "";
  getElement("tbNgay").innerHTML = "";
  getElement("tbLuongCB").innerHTML = "";
  getElement("tbChucVu").innerHTML = "";
  getElement("tbGiolam").innerHTML = "";
}

// Lấy thông tin nhân viên
function selectEmployee(employeeId) {
  let employee = employees.find((value) => {
    return value.id === employeeId;
  });

  getElement("tknv").value = employee.id;
  getElement("name").value = employee.name;
  getElement("email").value = employee.email;
  getElement("password").value = employee.password;
  getElement("datepicker").value = employee.daysOfWork;
  getElement("luongCB").value = employee.basicSalary;
  getElement("chucvu").value = employee.position;
  getElement("gioLam").value = employee.timesOfWork;

  getElement("btnCapNhat").disabled = false;
  document.getElementById("tknv").disabled = true;
  document.getElementById("btnThemNV").disabled = true;

  $("#myModal").modal("show");
}

// Tìm nhân viên theo xếp loại
function findEmployee() {
  // B1 : DOM
  let search = document.getElementById("searchName").value;
  search = search.trim(); //xóa bỏ khoảng trắng đầu cuối
  search = search.toLowerCase();

  // B2 : LỌC
  let newEmployees = employees.filter((value) => {
    let type = value.rankingEmployee().trim().toLowerCase();
    return type.includes(search);
  });

  // B3 : HIỂN THỊ
  if (newEmployees.length === 0) {
    alert("Không có loại nhân viên bạn cần tìm");
  }
  display(newEmployees);
}

// Utils
function getElement(selector) {
  return document.getElementById(selector);
}

// Hàm kiểm tra giá trị có rỗng hay không
function isRequired(value) {
  // trim xỏa bỏ khảng trắng đầu và cuối
  if (!value.trim()) {
    // chuỗi rỗng là falsy value, !false => true , nếu true là chuỗi rỗng
    return false;
  }
  return true;
}

// Hàm kiểm tra mật khẩu
function isPassword(value) {
  let regex =
    /^(?=.*[A-Z])(?=.*[!&%\/()=\?\^\*\+\]\[#><;:,\._-|@])(?=.*[0-9])(?=.*[a-z]).{6,10}$/;

  // hàm test dành riêng cho chuỗi regex - regular expression , trả về boolean
  return regex.test(value);
}

// Hàm kiểm tra số tài khoản
function checkAccountNumber(accountNumber) {
  // Chuyển số tài khoản thành chuỗi
  var accountNumberString = accountNumber.toString();

  // Kiểm tra độ dài tài khoản
  var accountLength = accountNumberString.length;
  if (accountLength >= 4 && accountLength <= 6) {
    return true;
  } else {
    return false;
  }
}

// Hàm kiểm tra tên tài khoản
function checkAccountName(accountName) {
  if (
    typeof accountName === "string" &&
    /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/.test(
      accountName
    )
  ) {
    return true;
  } else {
    return false;
  }
}

// Hàm kiểm tra email
function isEmail(value) {
  let regex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
  return regex.test(value);
}

// Hàm kiểm tra lương
function checkBasicSalary(salary) {
  var regex = /^\d+$/; // Biểu thức chính quy kiểm tra chuỗi là một số hoàn toàn
  if (regex.test(salary)) {
    if (salary < 1000000 || salary > 20000000) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}

// Hàm kiểm giờ làm
function checkTimeWork(timework) {
  var regex = /^\d+$/; // Biểu thức chính quy kiểm tra chuỗi là một số hoàn toàn
  if (regex.test(timework)) {
    if (timework < 80 || timework > 200) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}

// Hàm validation
function validate() {
  let id = getElement("tknv").value;
  let name = getElement("name").value;
  let email = getElement("email").value;
  let password = getElement("password").value;
  let daysOfWork = getElement("datepicker").value;
  let basicSalary = getElement("luongCB").value;
  let position = getElement("chucvu").value;
  let timesOfWork = getElement("gioLam").value;

  let isValid = true;

  if (!isRequired(id)) {
    isValid = false;
    getElement("tbTKNV").innerHTML = "Mã không được để trống";
  } else if (!checkAccountNumber(id)) {
    isValid = false;
    getElement("tbTKNV").innerHTML = "Vui lòng nhập từ 4 đến 6 kí tự";
  }

  if (!isRequired(name)) {
    isValid = false;
    getElement("tbTen").innerHTML = "Tên không được để trống";
  } else if (!checkAccountName(name)) {
    isValid = false;
    getElement("tbTen").innerHTML = "Vui lòng nhập chuỗi";
  }

  if (!isRequired(email)) {
    isValid = false;
    getElement("tbEmail").innerHTML = "Email không được để trống";
  } else if (!isEmail(email)) {
    isValid = false;
    getElement("tbEmail").innerHTML = "Vui lòng nhập email hợp lệ";
  }

  if (!isRequired(password)) {
    isValid = false;
    getElement("tbMatKhau").innerHTML = "Mật khẩu không được để trống";
  } else if (!isPassword(password)) {
    isValid = false;
    getElement("tbMatKhau").innerHTML =
      "Quy định mật khẩu: mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt), không để trống";
  }

  if (!isRequired(daysOfWork)) {
    isValid = false;
    getElement("tbNgay").innerHTML = "Vui lòng không để trống ngày";
  }

  if (!isRequired(basicSalary)) {
    isValid = false;
    getElement("tbLuongCB").innerHTML = "Lương cơ bản không được để trống";
  } else if (!checkBasicSalary(basicSalary)) {
    isValid = false;
    getElement("tbLuongCB").innerHTML =
      "Vui lòng nhập SỐ lương cơ bản từ 1.000.000 đến 20.000.000";
  }

  if (!isRequired(position)) {
    isValid = false;
    getElement("tbChucVu").innerHTML = "Lương cơ bản không được để trống";
  } else if (getElement("chucvu").value === "Chọn chức vụ") {
    isValid = false;
    getElement("tbChucVu").innerHTML = "Vui lòng chọn chức vụ";
  }

  if (!isRequired(timesOfWork)) {
    isValid = false;
    getElement("tbGiolam").innerHTML = "Lương cơ bản không được để trống";
  } else if (!checkTimeWork(timesOfWork)) {
    isValid = false;
    getElement("tbGiolam").innerHTML =
      "Vui lòng nhập SỐ giờ làm từ 80 đến 200 giờ";
  }

  if (isValid) {
    let employee = new Employee(
      id,
      name,
      email,
      password,
      daysOfWork,
      +basicSalary,
      position,
      +timesOfWork
    );

    return employee;
  }

  return undefined;
}

// Tài khoản
getElement("tknv").oninput = (event) => {
  if (!isSubmitted) return;

  let idSpan = getElement("tbTKNV");

  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  }
};

// Tên
getElement("name").oninput = (event) => {
  if (!isSubmitted) return;

  let idSpan = getElement("tbTen");

  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  }
};

// Email
getElement("email").oninput = (event) => {
  if (!isSubmitted) return;

  let idSpan = getElement("tbEmail");

  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  }
};

// Password
getElement("password").oninput = (event) => {
  if (!isSubmitted) return;

  let idSpan = getElement("tbMatKhau");

  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  }
};

// Ngày làm
getElement("datepicker").oninput = (event) => {
  if (!isSubmitted) return;

  let idSpan = getElement("tbNgay");

  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  }
};

// Lương cơ bản
getElement("luongCB").oninput = (event) => {
  if (!isSubmitted) return;

  let idSpan = getElement("tbLuongCB");

  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  }
};

// Chức vụ
getElement("chucvu").oninput = (event) => {
  if (!isSubmitted) return;

  let idSpan = getElement("tbChucVu");

  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  }
};

// Giờ làm
getElement("gioLam").oninput = (event) => {
  if (!isSubmitted) return;

  let idSpan = getElement("tbGiolam");

  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  }
};
