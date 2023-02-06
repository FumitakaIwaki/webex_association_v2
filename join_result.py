import pandas as pd
import sys

N = int(sys.argv[1])
df = pd.DataFrame()

for i in range(N+1):
  try:
    tmp = pd.read_csv(f"data/res{i}.csv")
    df = pd.concat([df, tmp], axis=0)
  except:
    print(f"res{i}.csv is not found")

df.to_csv("data/ex_result.csv", index=False)
