const inputElem = document.getElementsByName('ex');
const choicedValueElem = document.getElementsByName('ex-value');
const assoc_label = [0, 1, 2, 3, 4, 5, 6, 7]

// 1ページに表示する質問数
// ページ内全て回答されているかどうか
// E*(n-1) ~ E*n までのelemを調べる
function is_answer(n) {
  let En = Math.min(E*n, N);
  let Flag = true;
  for (let i=E*(n-1); i < En; i++) {
    // 全て回答しているかどうか
    if (choicedValueElem[i].innerText == "回答してください") {
      alert("回答していない質問があります");
      Flag = false;
      break;
    }
  }
  if (Flag) {
    if (n != G) {
      // 次のページへ
      next_div(k=(n+2));
    }else{
      // 最後のページの場合、回答送信
      get_value();
    }
  }
}

function is_answer_intro() {
  var flag_lang = false;
  var flag_jend = false;

  langs = document.getElementsByName('language');
  jends = document.getElementsByName('jender');

  for (var i=0; i < langs.length;i++) {
    console.log(langs[i])
    if (langs[i].checked) {
      flag_lang = true;
    }
  }
  for (var i=0; i < jends.length;i++) {
    console.log(jends[i])
    if (jends[i].checked) {
      flag_jend = true;
    }
  }

  if (flag_lang && flag_jend) {
    next_div(k=1);
  } else {
    alert("回答していない質問があります")
  }
}

// inputイベント時に値をセットする関数
const rangeOnChange = (e) => {
  let id = Number(e.target.id.replace("ex", "")) -1;
  choicedValueElem[id].innerText = assoc_label[inputElem[id].value];
}

function rangevalue() {
  for (let i=0; i < inputElem.length; i++) {
      inputElem[i].addEventListener('input', rangeOnChange);
  }
}