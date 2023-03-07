// 質問数
const N = 96; // 94問 + IMC2問
// 1ページに表示する質問数
const E = 25;
// 質問ページ数
const G = Math.ceil(N / E);

// 「次へ」の操作
function next_div(k) {
  if (k == 0) {
    document.getElementById("introduction").style.display = "none";
    document.getElementById("experiment").style.display = "inline";
    window.scroll({top: 0, behavior: 'auto'});
    document.getElementById('page').innerText = "質問ページ数 ： " + (k+1) + " / " + G;
  }else{
    document.getElementById("g"+(k-1)).style.display = "none";
    document.getElementById("g"+k).style.display = "inline";
    window.scroll({top: 0, behavior: 'auto'});
    document.getElementById('page').innerText = "質問ページ数 ： " + (k+1) + " / " + G;
  }
}
// 「戻る」の操作
function back_div(k) {
  if (k == 1) {
    document.getElementById("introduction").style.display = "inline";
    document.getElementById("experiment").style.display = "none";
    window.scroll({top: 0, behavior: 'auto'});
  }else{
    document.getElementById("g"+(k-1)).style.display = "none";
    document.getElementById("g"+(k-2)).style.display = "inline";
    window.scroll({top: 0, behavior: 'auto'});
    document.getElementById('page').innerText = "質問ページ数 ： " + (k-1) + " / " + G;
  }
}


function embed_block() {
  var Elem = document.getElementById('ex-block');
  for (let g=0; g < G; g++) {
    if (g == 0) {
      Elem.innerHTML += `<p id="g${g}" name="g" style="display: inline;"></p>`;
    }else{
      Elem.innerHTML += `<p id="g${g}" name="g" style="display: none;"></p>`;
    }
  }

  var Elem = document.getElementsByName('g');
  for (let g=0; g < Elem.length; g++) {
    for (let i=0; i < E; i++) {
      let n = (g*E)+i+1;
      if (n > N) {break;}
      // 40問目にIMC
      if (n == 40) {
        var html = `<div class="ex">【質問${n}】<label name="lab-t" class="lab-t"></label>は<label for="ex${n}" id="lab-ex${n}" name="lab-ex" class="lab-ex"></label>に似ていると思いますか？<br>質問に回答せず<span style="font-weight: bold;">4</span>を選択してください
        <p>全く思わない <input type="range" id="ex${n}" value="3" name="ex" min="0" max="7"></input> 強く思う</p>
        <span id="ex${n}-value" name="ex-value" class="ex-value">回答してください</span></div>`;
        Elem[g].innerHTML += html;
      // 80問目にIMC
      }else if (n == 80) {
        var html = `<div class="ex">【質問${n}】<label name="lab-t" class="lab-t"></label>は<label for="ex${n}" id="lab-ex${n}" name="lab-ex" class="lab-ex"></label>に似ていると思いますか？<br>質問に回答せず<span style="font-weight: bold;">4</span>を選択してください
        <p>全く思わない <input type="range" id="ex${n}" value="3" name="ex" min="0" max="7"></input> 強く思う</p>
        <span id="ex${n}-value" name="ex-value" class="ex-value">回答してください</span></div>`;
        Elem[g].innerHTML += html;
      }else{
        var html = `<div class="ex">【質問${n}】<label name="lab-t" class="lab-t"></label>は<label for="ex${n}" id="lab-ex${n}" name="lab-ex" class="lab-ex"></label>に似ていると思いますか？
        <p>全く思わない <input type="range" id="ex${n}" value="3" name="ex" min="0" max="7"></input> 強く思う</p>
        <span id="ex${n}-value" name="ex-value" class="ex-value">回答してください</span></div>`;
        Elem[g].innerHTML += html;
      }
    }
    if (g < Elem.length-1) {
      var html = `<div><button type="button" class="nb-button" onclick="back_div(k=${g+1});">戻る</button><button type="button" class="nb-button" onclick="is_answer(n=${g+1});">次へ</button></div>`;
      Elem[g].innerHTML += html;
    }else{
      var html = `<div><button type="button" class="nb-button" onclick="back_div(k=${g+1});">戻る</button><button type="button" class="nb-button" onclick="is_answer(n=${g+1});">回答</button></div>`;
      Elem[g].innerHTML += html;
    }
  }

  embed_text();
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
  const words = read_json("static/js/words.json");
  const questions = read_json("static/js/questions.json");
  const partitions = read_json("static/js/partitions.json");
  // 乱数
  // var rand = Math.round(Math.random() * 10000000);
  var rand = Math.random();
  // 調査完了ID
  var id = (Array(7).join('0') + Math.round(rand * 10000000)).slice(-7);
  document.getElementById('userid_display').innerHTML = id;
  document.getElementById('userid').value = id;
  // 問題番号
  // 乱数で問題選択
  // let qnum = Math.round(rand * 240);
  // document.getElementById('qnum').value = qnum;
  // let qnums = partitions['p'+qnum];
  // counterで問題選択
  let qnum = document.getElementById('counter').value;
  document.getElementById('qnum').value = qnum;
  let qnums = partitions['p'+qnum];
  
  // 問題ラベル
  const ElemT = document.getElementsByName("lab-t");
  const ElemEx = document.getElementsByName("lab-ex");

  // 文字埋め込み
  for (let i=0; i < ElemT.length; i++) {
    ElemT[i].innerText = words[questions[qnums[i]][0]];
  }
  for (let i=0; i < ElemEx.length; i++) {
    ElemEx[i].innerText = words[questions[qnums[i]][1]];
  }
}

function preventBrowserBack() {
  history.pushState(null, null, location.href);
  window.addEventListener('popstate', (e) => {
      alert("ブラウザバックを使用しないでください")
      history.go(1);
  });
}