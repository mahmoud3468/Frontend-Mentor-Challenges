const billInput = document.getElementById("bill-input");
const personInput = document.getElementById("person-input");
const tipCustomInput = document.getElementById("tip-input");

const tipsGrid = document.querySelector(".tip-grid");
const resetBtn = document.querySelector(".reset-btn");

const personTip = document.querySelector(".person-tip");
const personBill = document.querySelector(".person-bill");

// prettier-ignore
let tipValue, personsNum, totalBill, totalTip, billPerPerson, tipPerPerson;

const state = {};

function validate(input, value, errMsg, errDiv) {
  try {
    if (value <= 0 || !value) {
      input.classList.add("error");
      throw new Error(errMsg);
    }

    input.classList.remove("error");
    document.querySelector(`.${errDiv}`).innerHTML = "";
    return true;
  } catch (err) {
    document.querySelector(`.${errDiv}`).innerHTML = err.message;
  }
}

billInput.addEventListener("input", (e) => {
  state.billValue = e.target.value;
  validate(billInput, state.billValue, "Positive number needed", "bill-err");
});

tipsGrid.addEventListener("click", function (e) {
  this.querySelectorAll(".tip-amount").forEach((tip) => {
    tip.classList.remove("active-tip");
  });

  if (
    !validate(billInput, state.billValue, "Positive number needed", "bill-err")
  )
    return;

  e.target.classList.add("active-tip");
  state.tipValue = e.target.getAttribute("value");
});

personInput.addEventListener("input", (e) => {
  if (
    !validate(billInput, state.billValue, "Positive number needed", "bill-err")
  ) {
    personInput.value = "";
    return;
  }

  state.personsNum = e.target.value;
  if (!validate(personInput, state.personsNum, "Can't be zero", "people-err"))
    return;
  calcTip();
});

function calcTip() {
  if (state.tipValue) {
    totalTip = state.billValue * state.tipValue;
    tipPerPerson = totalTip / state.personsNum;
    totalBill = Number(totalTip) + Number(state.billValue);
    billPerPerson = totalBill / state.personsNum;

    personTip.innerHTML = "";
    personTip.insertAdjacentText("afterbegin", `$${tipPerPerson.toFixed(2)}`);
  }

  billPerPerson = totalBill / state.personsNum;
  personBill.innerHTML = "";
  personBill.insertAdjacentText("afterbegin", `$${billPerPerson.toFixed(2)}`);
}

resetBtn.addEventListener("click", () => {
  billInput.value = "";
  personInput.value = "";
  state.tipValue = 0;

  personTip.innerHTML = "$0.00";
  personBill.innerHTML = "$0.00";

  if (!document.querySelector(".active-tip")) return;
  document.querySelector(".active-tip").classList.remove("active-tip");
});
