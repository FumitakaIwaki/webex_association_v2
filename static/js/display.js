function inline_div(k) {
  if (k == 0) {
    document.getElementById("introduction").style.display = "none";
    document.getElementById("experiment").style.display = "inline";
    window.scroll({top: 0, behavior: 'auto'});
    document.getElementById('page').innerText = "質問ページ数 ： " + (k+1) + " / 6";

  }else{
    document.getElementById("g"+(k-1)).style.display = "none";
    document.getElementById("g"+k).style.display = "inline";
    window.scroll({top: 0, behavior: 'auto'});
    document.getElementById('page').innerText = "質問ページ数 ： " + (k+1) + " / 6";
  }
}

function embed_block() {
  var Elem = document.getElementById('ex-block');
  for (let g=0; g < 6; g++) {
    if (g == 0) {
      Elem.innerHTML += `<p id="g${g}" name="g" style="display: inline;"></p>`;
    }else{
      Elem.innerHTML += `<p id="g${g}" name="g" style="display: none;"></p>`;
    }
  }

  var Elem = document.getElementsByName('g');
  for (let g=0; g < Elem.length; g++) {
    for (let i=0; i < 50; i++) {
      let n = (g*50)+i+1;
      if (n > 282) {break;}
      var html = `<div class="ex">【質問${n}】<label name="lab-t" class="lab-t"></label>と<label for="ex${n}" id="lab-ex${n}" name="lab-ex" class="lab-ex"></label>は、似ていると思いますか？
      <p>全く思わない <input type="range" id="ex${n}" value="0" name="ex" min="0" max="7"></input> 強く思う</p>
      <p>選択: <span id="ex${n}-value" name="ex-value" class="ex-value"></span></p></div>`;
      Elem[g].innerHTML += html;
    }
    if (g < Elem.length-1) {
      var html = `<div><button type="button" onclick="inline_div(k=${g+1});">次へ</button></div>`;
      Elem[g].innerHTML += html;
    }else{
      var html = `<div><button type="button" onclick="get_value();">回答</button></div>`;
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
  // カウンター
  let cnt  = document.getElementById("counter").value;
  let qnums = partitions['p'+cnt];
  
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