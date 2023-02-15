from flask import Flask, render_template, request, jsonify
import pandas as pd
 
app = Flask(__name__)

# 導入画面
@app.route("/")
def index():
    print("Join experiment")
    return render_template('header.html')
 
# 実験画面
@app.route("/experiment")
def experiment():

    return render_template('index.html')

# データポスト
@app.route("/post_data", methods=['GET', 'POST'])
def post():
    data = request.get_json()
    res_df = pd.DataFrame(data, index=[0])
    res_df.to_csv(f"data/res{data['id']}.csv", index=False)

    df = pd.read_csv("data/dyna_results.csv")
    df = pd.concat([df, res_df], axis=0)
    df.to_csv("data/dyna_results.csv", index=False)

    print(f"***ID:{data['id']} ports result")

    return jsonify(data)

# 終了画面（承認されなかった場合）
@app.route("/finish", methods=['GET', 'POST'])
def fin():
    return render_template('finish.html')

# if __name__ == "__main__":
    # app.run(host="0.0.0.0", port=5000, debug=True)
    # serve(app, host="0.0.0.0", port=5000)