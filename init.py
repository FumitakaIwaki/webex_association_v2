import pandas as pd
import pickle

def init():
  # 追記保存の回答結果csv
  E = 96
  columns = ['qnum', 'id', 'language', 'jender', 'age']
  for i in range(E):
    columns.append('ex'+str(i+1))

  df = pd.DataFrame(columns=columns)
  df.to_csv('data/dyna_results.csv', index=False)
  df.to_csv('data/ex_results.csv', index=False)

  # カウンターのオブジェクト
  counter = -1
  with open("counter.pkl", "wb") as f:
    pickle.dump(counter, f)

if __name__=='__main__':
  init()

