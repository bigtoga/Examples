Source: https://link.medium.com/VQdx2BiLX3 
~~~

import os
import requests
from lxml import etree
import wget

# prepare
download_directory = 'slides/'
url = 'http://inst.eecs.berkeley.edu/~cs61a/fa18/'

# make request
r = requests.get(url)
html = etree.HTML(r.text)

# extract links
slide_links = html.xpath('//li/a[text()="8pp"]/@href')
slide_links = list(set(slide_links)) # remove the duplicated links
print(len(slide_links))

# download
for slide in slide_links:
  print(slide)
  download_link = url+slide
  file_name = os.path.basename(slide)
  download_path = download_directory + file_name # complete download link
  wget.download(download_link, download_path)

~~~
