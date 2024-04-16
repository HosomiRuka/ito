// TODO +を押したらinputの中の数字を増やす -で減らす
// TODO 入力した分のhtmlを生成する
// TODO 乱数を生成する
// TODO 入力した分の乱数を生成 + 乱数をhtmlに表示
// TODO クリックしたらカードを表向きにする
// TODO 数字を生成するを押したら、増えるんじゃなくてもう一回その枚数生成される

const minus = document.getElementById("minus");
const plus = document.getElementById("plus");
const createCardNumber = document.getElementById("number");
const cardWrap = document.querySelector(".card-wrap");
const newCardCreateBtn = document.querySelector("#new");
const decisionBtn = document.querySelector("#decision");

/*--------------------
+-ボタン
--------------------*/
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

/*--------------------
これで決定！ボタン
--------------------*/
decisionBtn.addEventListener("click", () => {
  // 一番上に書くと、読み込まれた直後に要素を探しにいくから、今回みたいに生成されたものを取得してくれない。
  // 読み込まれた時 → ない
  // クリックされた時 → ある ←ここから探さないと。
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.classList.add("hidden");
    card.classList.remove("open");
  });

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("open");
    });
  });
});

/*--------------------
数字を生成するボタン
--------------------*/
// 乱数を指定の個数分生成する関数
function randomCreate() {
  let inputNumber = createCardNumber.value;
  console.log(inputNumber + "：インプットの中身");

  let randomNumber = [];
  console.log(randomNumber);

  // ランダムな入力された数だけ数字を生成する
  for (let i = 0; i < inputNumber; i++) {
    let random = Math.floor(Math.random() * 100) + 1;
    console.log(random + "：ランダムな数");

    randomNumber.push(random);
    console.log(randomNumber + "：配列格納後");
  }
  //returnにすると配列じゃなくなる？？？？？？？？forの中にいれとったわ
  return randomNumber;
}

// 生成したランダムな数字をカードに表示させる
function cardOutput(randomNumber) {
  let backText = "?";
  const fronts = document.querySelectorAll(".front");
  const backs = document.querySelectorAll(".back");

  fronts.forEach((front) => {
    front.textContent = randomNumber;
  });
  backs.forEach((back) => {
    back.textContent = backText;
  });
}

// カードを生成するボタンを押して上記二つを発火させる
newCardCreateBtn.addEventListener("click", () => {
  // きっと関数とかにまとめて書いたほうがいいんだろうけど、書き方がわからないのでまとめて書きます。

  // 1回前のカードを消す。
  while (cardWrap.firstChild) {
    cardWrap.removeChild(cardWrap.firstChild);
  }

  let inputNumber = createCardNumber.value;
  // inputに入ってる数分コピーを繰り替えす
  for (let i = 0; i < inputNumber; i++) {
    // htmlを生成
    let newLi = document.createElement("li");
    let newFront = document.createElement("div");
    let newBack = document.createElement("div");

    newLi.classList.add("card");
    newBack.classList.add("back");
    newFront.classList.add("front");

    cardWrap.appendChild(newLi);
    newLi.appendChild(newBack);
    newLi.appendChild(newFront);
  }

  // ランダムな入力された数だけ数字を生成する
  // for (let i = 0; i < inputNumber; i++) {
  //   let random = Math.floor(Math.random() * 100) + 1;
  //   const fronts = document.querySelectorAll(".front");

  //   // 数字をカードに表示させる
  //   fronts.forEach((front) => {
  //     front.textContent = random;
  //   });

  //   console.log(random);
  // }

  let randomNumber = randomCreate();
  cardOutput(randomNumber);

  let backText = "?";
  const backs = document.querySelectorAll(".back");

  backs.forEach((back) => {
    back.textContent = backText;
  });
});

// 戻り値練習
// function test() {
//   let a = "aです";

//   return a;
// }

// decisionBtn.addEventListener("click", () => {
//   let a = test();
//   console.log(a + "よね？");
// });
