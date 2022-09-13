let curUrl = window.location;
let url = new URL(curUrl);
let searchParams = new URLSearchParams(url.search);
let curMark = eval(searchParams.get("curMark"));
console.log(curUrl + " -> " + searchParams.get("curPoly"));

var myMap;
ymaps.ready(init);

const objectsButton = document.querySelector("#objectsButton");
const objectsButtonMenu = document.querySelector(".button-menu");
const objectsButtonMenuList = document.querySelector(".button-menu-list");
objectsButton.addEventListener(
  "click",
  (evt) => {
    console.log(evt);
    const evtTarget = evt.target;
    if (evtTarget.localName == "li") {
      evt.stopPropagation();
      evt.preventDefault();
      evtTarget.classList.toggle("button-menu__item_active");
    } else {
      objectsButton.classList.toggle("button_toggled");
      objectsButtonMenu.classList.toggle("button-menu_hidden");
    }
  },
  false
);

function init() {
  var myMap = new ymaps.Map(
      "map",
      {
        center: [55.76, 37.64],
        zoom: 10,
      },
      {
        searchControlProvider: "yandex#search",
      }
    ),
    objectManager = new ymaps.ObjectManager({
      clusterize: true,
    });

  myMap.geoObjects.add(objectManager);

  $.ajax({
    url: "./uploads/hills_riv.json",
  }).done(function (data) {
    objectManager.add(data);
  });

  $.ajax({
    url: "./uploads/00_layers_ind.json",
  }).done(function (data) {
    console.log(data);
    //// let dataObj = JSON.parse(data);
    let itemsTempl = "";
    for (let item of data.layers) {
      itemsTempl += `<li class="button-menu__item" data-layerurl="${item.layUrl}">${item.name}</li>`;
      console.log(item);
    }
    objectsButtonMenuList.innerHTML = itemsTempl;
  });
}
