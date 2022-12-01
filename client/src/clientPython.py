import requests

url = 'http://127.0.0.1:8383/something'
myobj = {'somekey': 'somevalue'}

x = requests.post(url, json = myobj)

print(x.text)