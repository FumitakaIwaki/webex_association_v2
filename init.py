import sqlite3
Q = 282 #1人辺りの質問数

def init(dbname, conn, cur):
  sql = "SELECT COUNT(*) FROM sqlite_master WHERE TYPE = 'table' AND name = 'data'"
  cur.execute(sql)
  r = cur.fetchone() 
  if r[0] == 1:
    cur.execute("drop table data;")
    print("Drop Exist Table")

  sql = "\
    CREATE TABLE\
    data(\
      counter INTEGER,\
      id INTEGER PRIMARY KEY AUTOINCREMENT,\
      jender INTEGER,\
      age INTEGER,\
    "
  for i in range(Q):
    if i < Q-1:
      sql += f"ex{i+1} INTEGER,"
    else:
      sql += f"ex{i+1} INTEGER);"

  cur.execute(sql)
  conn.commit()
  conn.close()
  print("Create Table!")

  return

if __name__ == '__main__':
  dbname = "data/result.sqlite3"
  conn = sqlite3.connect(dbname)
  cur = conn.cursor()
  init(dbname, conn, cur)
