import pandas as pd

def init():
  df = pd.DataFrame(columns=[
    'jender',
    'age',
    'ex1',
    'ex2',
    'ex3'
  ])
  df.to_csv("data/ex_result.csv", index=False)

  return df

if __name__ == '__main__':
  init()
