import pandas as pd
import glob

N = 9999999
E = 96
columns = ['qnum', 'id', 'language', 'jender', 'age']
for i in range(E):
  columns.append('ex'+str(i+1))
df = pd.DataFrame(columns=columns)
files = glob.glob("data/res*")

for file in files:
  tmp = pd.read_csv(file)
  df = pd.concat([df, tmp], axis=0)

df.to_csv("data/ex_results.csv", index=False)
