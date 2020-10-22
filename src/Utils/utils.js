export function setUserInLocalStorage(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUserInLocalStorage() {
  const user = localStorage.getItem("user");
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
}

export function clearUserInLocalStorage() {
  localStorage.removeItem("user");
}

export function extractDateString(d) {
  let dateString = "";

  let date = new Date(d);
  if (date !== null) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (countDigits(day) < 2) {
      day = "0" + day.toString();
    }

    if (countDigits(month) < 2) {
      month = "0" + month.toString();
    }

    dateString =
      day.toString() + "-" + month.toString() + "-" + year.toString();
  }
  return dateString;
}

export function countDigits(number) {
  let counter = 0;

  while (number > 0) {
    counter++;
    number = Math.floor(number / 10);
  }

  return counter;
}

export function generateID() {
  return "T" + Math.random().toString(36).substr(2, 9);
}

export function isPhoneValid(phone) {
  if (typeof phone !== "string") {
    return false;
  }

  let isValid = false;

  //checking for 10 digits
  if (phone.match(/^\d{10}$/)) {
    //checking for non-zero starting
    if (phone.match(/^[1-9][0-9]*$/)) {
      isValid = true;
    }
  }

  return isValid;
}

export function isAmountValid(amount) {
  if (typeof amount !== "string") {
    return false;
  }

  return true;
}

export function isCardValid(cardno) {
  if (typeof cardno !== "string") {
    return false;
  }

  if (!cardno.match(/^\d+$/)) {
    if (cardno.length !== 16) {
      return false;
    }
  }

  return true;
}
