import json
import random

words = [
  '喜び', '信頼', '恐れ', '驚き', '悲しみ', '嫌悪', '怒り', '期待',
  '恍惚', '平穏', '感嘆', '容認', '恐怖', '心配', '驚嘆', '動揺',
  '悲痛', '憂い', '憎悪', '退屈', '激怒', '苛立ち', '警戒', '興味',
  '楽観', '希望', '不安', '愛', '罪悪感', '歓喜', '服従', '好奇心',
  '感傷', '畏敬', '絶望', '恥', '失望', '不審', '憤慨', '自責',
  '嫉妬', '悲観', '軽蔑', '冷笑', '陰鬱', '積極性', '誇り', '優位'
]
W = len(words) # 単語数
Q = W * (W-1) # 問題数

# 全組み合わせの問題辞書
qnums = ['q' + str(i) for i in range(Q)] # 問題ラベル
q_dict = {} # 問題ラベルと対応する問題の辞書
k = 0
for i in range(W):
  for j in range(W):
    if i != j:
      q_dict[qnums[k]] = [i, j]
      k += 1

# 人数分のパーティション
N = 1200
groups = 24
partition = 94
p_dict = {} # 参加者piと対応する問題番号の配列の辞書
k = 0
random.shuffle(qnums)
for i in range(N):
  if k == groups:
    k = 0
    random.shuffle(qnums)
  p_dict['p'+str(i)] = qnums[partition*k:partition*(k+1)]
  k+=1
  

file1 = open('static/js/words.json', mode="w")
json.dump(words, file1, indent=2, ensure_ascii=False)
file1.close()

file2 = open('static/js/questions.json', mode="w")
json.dump(q_dict, file2, indent=2, ensure_ascii=False)
file2.close()

file3 = open('static/js/partitions.json', mode="w")
json.dump(p_dict, file3, indent=2, ensure_ascii=False)
file3.close()