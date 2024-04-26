// Handle Dark Mode

if(localStorage.getItem("dark-mode") === "yes") {
  document.documentElement.id = "dark";
} else {
  document.documentElement.id = "";
}

let countryDetails = document.querySelector(".country-infomation .container .country-details");
let image = countryDetails.querySelector(".image img");
let details = countryDetails.querySelector(".details");
let countryName = details.querySelector(".name");

let firstLink = details.querySelectorAll(".links")[0];
let firstLinkLi1 = firstLink.querySelectorAll("ul li p span")[0];
let firstLinkLi2 = firstLink.querySelectorAll("ul li p span")[1];
let firstLinkLi3 = firstLink.querySelectorAll("ul li p span")[2];
let firstLinkLi4 = firstLink.querySelectorAll("ul li p span")[3];
let firstLinkLi5 = firstLink.querySelectorAll("ul li p span")[4];

let secondLink = details.querySelectorAll(".links")[1];
let secondLinkLi1 = secondLink.querySelectorAll("ul li p span")[0];
let secondLinkLi2 = secondLink.querySelectorAll("ul li p span")[1];
let secondLinkLi3 = secondLink.querySelectorAll("ul li p span")[2];
let countryBordersBox = details.querySelector(".country-border");
let countryBorders = countryBordersBox.querySelector("ul");
console.log(countryBordersBox);

let myReq = new XMLHttpRequest();

myReq.open("GET", "JS/data.json");
myReq.send();

myReq.onreadystatechange = () => {
  if(myReq.status === 200 && myReq.readyState === 4) {
    let finalData = JSON.parse(myReq.responseText);

    finalData.forEach((el, i) => {
      el.id = i + 1;

      if(el.id === +localStorage.getItem("id-link")) {
        document.title = el.name + ` (${el.region})`;
        image.setAttribute("src", el.flags.svg);
        image.setAttribute("alt", el.name);
        countryName.textContent = el.name;
        firstLinkLi1.textContent = el.nativeName;
        firstLinkLi2.textContent = el.population;
        firstLinkLi3.textContent = el.region;
        firstLinkLi4.textContent = el.subregion;
        firstLinkLi5.textContent = el.capital;
        secondLinkLi1.textContent = el.topLevelDomain;
        secondLinkLi2.textContent = el.currencies[0].name;
        function languagesJoin(arr) {
          let array = [];
          for(let i = 0; i < arr.length; i++) {
            array.push(arr[i].name);
          }
          return array.join(", ");
        }
        secondLinkLi3.textContent = languagesJoin(el.languages);
        let borders = el.borders || 0;

        if(borders == 0) {
          let noBorders = document.createElement("li");
          noBorders.textContent = `${el.name} has no borders`;
          countryBorders.appendChild(noBorders);
        }
        let arr = [];
        borders.forEach(border => {
          finalData.forEach(el => {
            if(border === el.alpha3Code) {
              arr.push(el.name);
            }
          })
        })
        arr.forEach(border => {
          let li = document.createElement("li");
          li.textContent = border;
          countryBorders.appendChild(li);
        })
      }
    })
  }
}