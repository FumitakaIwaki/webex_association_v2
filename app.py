# AWS EC2へのssh接続
# ssh -i ~/.ssh/iwaki.pem ec2-user@ec2-54-199-34-112.ap-northeast-1.compute.amazonaws.com

from flask import Flask, render_template, request
import pandas as pd
import init 
 
app = Flask(__name__)
# カウンター
CNT = 0
 
# 実験画面
@app.route("/")
def index():
    global CNT
    CNT+=1
    return render_template('index.html', cnt=CNT)

# 終了画面
@app.route("/finish", methods=['GET', 'POST'])
def fin():
    data = dict(request.form)
    res_df = pd.DataFrame(data, index=[CNT])
    print(res_df)
    df = pd.read_csv("data/result.csv")
    pd.concat([df, res_df], axis=0).to_csv("data/result.csv", index=False)

    return render_template('finish.html')

if __name__ == "__main__":
    df = init.init()

    app.run(host="0.0.0.0", port=5000, debug=True)