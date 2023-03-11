# python scraping.py <url> <アクセス数>
import requests
import sys

url = sys.argv[1]
N = int(sys.argv[2])

for i in range(N):
  r = requests.get(url)

print("complete scraping!")