const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,

    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}
function addData(obj) {
  data.push(obj);
  updateDom();
}
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDom();
}
function sortTheRichest() {
  data.sort((lower, higher) => higher.money - lower.money);
  updateDom();
}
function showMillionaires() {
  data = data.filter((item) => item.money > 1000000);
  updateDom();
}
function calculateEntireWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatNum(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

function updateDom(providedData = data) {
  main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`;
  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong><i class="fas fa-crown"></i> ${
      item.name
    } </strong> 
    ${formatNum(item.money)}`;
    main.appendChild(element);
  });
}
function formatNum(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortTheRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateEntireWealth);
