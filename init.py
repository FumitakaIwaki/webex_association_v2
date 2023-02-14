import pandas as pd

E = 96
columns = ['qnum', 'id', 'language', 'jender', 'age']
for i in range(E):
  columns.append('ex'+str(i+1))

df = pd.DataFrame(columns=columns)
df.to_csv('data/dyna_results.csv', index=False)