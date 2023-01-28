import pandas as pd

def init():
  df = pd.DataFrame(columns=[
    'qnum',
    'jender',
    'age',
    'ex1',
    'ex2',
    'ex3'
  ])
  df.to_csv("data/result.csv", index=False)

  return df

if __name__ == '__main__':
  init()
