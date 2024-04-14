// TODO +を押したらinputの中の数字を増やす -で減らす
// TODO 入力した分のhtmlを生成する
// TODO 乱数を生成する
// TODO 入力した分の乱数を生成 + 乱数をhtmlに表示
// TODO クリックしたらカードを表向きにする

const minus = document.getElementById("minus");
const plus = document.getElementById("plus");
const createCardNumber = document.getElementById("number");
const cardWrap = document.querySelector(".card-wrap");
const newCardCreateBtn = document.querySelector("#new");
const front = document.querySelector(".front");
const cards = document.querySelectorAll(".card");
const decisionBtn = document.querySelector("#decision");

// 読み込まれた時に1以下ならボタンを押せないようにする
window.addEventListener("load", () => {
  if (createCardNumber.value <= 1) {
    minus.style.pointerEvents = "none";
    minus.style.opacity = "0.5";
  }
});

// -を押した時2以下ならボタンを押せないようにする、それ以外は押せる
// valueの中身を減らす
minus.addEventListener("click", () => {
  if (createCardNumber.value <= 2) {
    minus.style.pointerEvents = "none";
    minus.style.opacity = "0.5";
  } else {
    minus.style.pointerEvents = "auto";
    minus.style.opacity = "1";
  }

  createCardNumber.value--;
});

// +を押した時1含む1以上の数字なら-ボタンを押せるように
// valueの値を増やす。
plus.addEventListener("click", () => {
  if (createCardNumber.value >= 1) {
    minus.style.pointerEvents = "auto";
    minus.style.opacity = "1";
  }

  createCardNumber.value++;
});

newCardCreateBtn.addEventListener("click", () => {
  let inputNumber = createCardNumber.value;

  // inputに入ってる数分コピーを繰り替えす
  for (let i = 0; i < inputNumber; i++) {
    let newDivs = document.createElement("li");
    let newFront = document.createElement("div");
    let newBack = document.createElement("div");

    newDivs.classList.add("card");
    newBack.classList.add("back");
    newFront.classList.add("front");

    cards.forEach((card) => {
      cardWrap.appendChild(newDivs);
      card.appendChild(newBack);
      card.appendChild(newFront);
    });
  }

  let random = Math.floor(Math.random() * 100) + 1;
  front.textContent = random;
});

// カード開閉
cards.forEach((card) => {
  decisionBtn.addEventListener("click", () => {
    card.classList.add("hidden");
    card.classList.remove("open");
  });

  card.addEventListener("click", () => {
    card.classList.toggle("open");
  });
});
