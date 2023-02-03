function get_value() {
  let data = {};

  data['counter'] = Number(document.getElementById('counter').value);
  data['id'] = Number(data['counter']);

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

  $.post({
    url: "/post_data",
    data: JSON.stringify(data, null, ' '),
    contentType: 'application/json',
    dataType: "json",
    success: function() { 
      window.location.href = "/finish";
    },
    error: function() {
      alert("サーバーエラー\nもう一度お試しください");
      window.location.reload();
    }
  });
}