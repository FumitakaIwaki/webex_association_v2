// input要素取得
const inputElem1 = document.getElementById('ex1');
const inputElem2 = document.getElementById('ex2');
const inputElem3 = document.getElementById('ex3');

// 埋め込み先の取得
const choicedValueElem1 = document.getElementById('ex1-value');
const choicedValueElem2 = document.getElementById('ex2-value');
const choicedValueElem3 = document.getElementById('ex3-value');

const assoc_label = ['全く連想しない', 'やや連想する', '連想する', 'かなり連想する', '強く連想する']

// inputイベント時に値をセットする関数
const rangeOnChange = () => {
  choicedValueElem1.innerText = assoc_label[inputElem1.value];
  choicedValueElem2.innerText = assoc_label[inputElem2.value];
  choicedValueElem3.innerText = assoc_label[inputElem3.value];
}

// json読み込み
function read_json(filename) {
  var json = $.ajax({
      type: 'GET',
      url: filename,
      async: false,
      dataType: 'json'
  }).responseText;
  return JSON.parse(json);
}

function embed_text() {
  // 問題データ
  const questoins = read_json("static/js/question.json");
  // カウンター
  let qnum  = "q" + document.getElementById("counter").value;

  // 問題ラベル
  const ElemT = document.getElementsByName("lab-t");
  const ElemEx1 = document.getElementById("lab-ex1");
  const ElemEx2 = document.getElementById("lab-ex2");
  const ElemEx3 = document.getElementById("lab-ex3");

  // 文字埋め込み
  let len = ElemT.length;
  for (let i = 0; i < len; i++){
    ElemT[i].innerText = questoins[qnum]['t'];
  }
  ElemEx1.innerText = questoins[qnum]['ex1'];
  ElemEx2.innerText = questoins[qnum]['ex2'];
  ElemEx3.innerText = questoins[qnum]['ex3'];
}

window.onload = function() {
  // 文章埋め込み
  embed_text()
  // 変更に合わせてイベントを発火する
  inputElem1.addEventListener('input', rangeOnChange);
  inputElem2.addEventListener('input', rangeOnChange);
  inputElem3.addEventListener('input', rangeOnChange);
  // ページ読み込み時の値をセット
  choicedValueElem1.innerText = assoc_label[inputElem1.value];
  choicedValueElem2.innerText = assoc_label[inputElem2.value];
  choicedValueElem3.innerText = assoc_label[inputElem3.value];
}