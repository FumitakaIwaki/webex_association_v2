function get_value() {
  let data = {};
  
  data['qnum'] = Number(document.getElementById('qnum').value);
  data['id'] = document.getElementById('userid').value;

  elements = document.getElementsByName('language');
  for (let i = 0; i < elements.length; i++){
    if (elements.item(i).checked){
      data['language'] = Number(elements.item(i).value);
    }
  }

  elements = document.getElementsByName('jender');
  for (let i = 0; i < elements.length; i++){
    if (elements.item(i).checked){
        data['jender'] = Number(elements.item(i).value);
    }
  }

  data['age'] = Number(document.getElementById('age').value);

  elements = document.getElementsByName('ex');
  for (let i=0; i < elements.length; i++) {
    data['ex'+(i+1)] = Number(elements[i].value);
  }

  // サーバーへ送信
  $.post({
    url: "/post_data",
    data: JSON.stringify(data, null, ' '),
    contentType: 'application/json',
    dataType: "json",
    success: function() { 
      document.getElementById("experiment").style.display = "none";
      document.getElementById("end").style.display = "inline";
      window.scroll({top: 0, behavior: 'auto'});
    },
    error: function() {
      alert("サーバーエラー\nもう一度お試しください");
    }
  });
}