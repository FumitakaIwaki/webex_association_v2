from flask import Flask, render_template, request, jsonify
import pandas as pd
import pickle
 
app = Flask(__name__)

# 導入画面
# @app.route("/")
# def index():
#     return render_template('header.html')
 
# 実験画面
@app.route("/")
def experiment():
    # 被験者数
    N = 480
    # カウンタの読み込み
    with open("counter.pkl", "rb") as f:
        counter = pickle.load(f)
    # カウンタのインクリメント & 更新
    with open("counter.pkl", "wb") as f:
        if counter > (N-2):
            counter = 0
        else:
            counter+=1
        pickle.dump(counter, f)

    return render_template('index.html', cnt=counter)

# データポスト
@app.route("/post_data", methods=['GET', 'POST'])
def post():
    data = request.get_json()
    res_df = pd.DataFrame(data, index=[0])
    res_df.to_csv(f"data/res{data['id']}.csv", index=False)

    df = pd.read_csv("data/dyna_results.csv")
    df = pd.concat([df, res_df], axis=0)
    df.to_csv("data/dyna_results.csv", index=False)

    return jsonify(data)

# 終了画面（承認されなかった場合）
@app.route("/finish", methods=['GET', 'POST'])
def fin():
    return render_template('finish.html')

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000, debug=True)
    # serve(app, host="0.0.0.0", port=5000)