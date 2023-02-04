function get_value() {
  let data = {};

  data['counter'] = Number(document.getElementById('counter').value);
  var id = Math.round(Math.random() * 10000000);
  data['id'] = (Array(7).join('0') + id).slice(-7);
  document.getElementById('userid').innerHTML += data['id'];

  elements = document.getElementsByName('jender');
  let len = elements.length;
  for (let i = 0; i < len; i++){
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