s = '2021-04-15T16:56:44.613Z'

date = s.split('T')[0]
time = s.split('T')[1].split('Z')[0]

s = date + ' ' + time

print(s)