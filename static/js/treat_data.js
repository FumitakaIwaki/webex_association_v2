function get_value() {
  let data = {}

  const cnt = document.getElementById("counter");
  data['qnum'] = "q" + ((cnt.value % 2) + 1)

  elements = document.getElementsByName('jender');
  let len = elements.length;
  for (let i = 0; i < len; i++){
    if (elements.item(i).checked){
        data['jender'] = elements.item(i).value;
    }
  }
  
  data['age'] = document.getElementById('age').value;
  data['ex1'] = document.getElementById('ex1').value;
  data['ex2'] = document.getElementById('ex2').value;
  data['ex3'] = document.getElementById('ex3').value;

  console.log(data)
}