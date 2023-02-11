# AWS EC2へのssh接続
# ssh -i ~/.ssh/iwaki.pem ec2-user@  {Public IPv4 DNS}
# 起動(本番)
# gunicorn --bind 0.0.0.0:5000 --daemon app:app
# --workers n で同時アクセスをn人に制限できる

from flask import Flask, render_template, request, jsonify
import pandas as pd
 
app = Flask(__name__)
# カウンター
CNT = -1

# 導入画面
@app.route("/")
def index():
    return render_template('header.html')
 
# 実験画面
@app.route("/experiment")
def experiment():
    global CNT
    CNT+=1
    print(f"No.{CNT} start ex")

    return render_template('index.html', cnt=CNT)

# データポスト
@app.route("/post_data", methods=['GET', 'POST'])
def post():
    data = request.get_json()
    res_df = pd.DataFrame(data, index=[data['counter']])
    res_df.to_csv(f"data/res{data['counter']}.csv", index=False)
    print(f"***No.{data['counter']} port result")

    return jsonify(data)

# 終了画面（承認されなかった場合）
@app.route("/finish", methods=['GET', 'POST'])
def fin():
    return render_template('finish.html')

# if __name__ == "__main__":
    # app.run(host="0.0.0.0", port=5000, debug=True)
    # serve(app, host="0.0.0.0", port=5000)