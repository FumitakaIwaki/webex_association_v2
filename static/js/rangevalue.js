const inputElem = document.getElementsByName('ex');
const choicedValueElem = document.getElementsByName('ex-value');
const assoc_label = [0, 1, 2, 3, 4, 5, 6, 7]

// inputイベント時に値をセットする関数
const rangeOnChange = () => {
  for (let i=0; i < inputElem.length; i++) {
    choicedValueElem[i].innerText = assoc_label[inputElem[i].value];
  }
}

function rangevalue() {
  for (let i=0; i < inputElem.length; i++) {
    choicedValueElem[i].innerText = assoc_label[inputElem[i].value];
  }
  for (let i=0; i < inputElem.length; i++) {
      inputElem[i].addEventListener('input', rangeOnChange);
  }
}