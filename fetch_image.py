import urllib.request
import re

url = 'https://www.freepik.com/premium-psd/png-confident-professional-woman-smiling_359417550.htm'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    matches = re.findall(r'https://img\.freepik\.com/[^\s\"\'\>]+', html)
    print("\n".join(set(matches)))
except Exception as e:
    print('Error:', e)
