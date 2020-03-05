# Dependencies
import pandas as pd
from splinter import Browser
from bs4 import BeautifulSoup as bs
import time
import requests
import pymongo

# Initialize PyMongo to work with MongoDBs
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

# https://splinter.readthedocs.io/en/latest/drivers/chrome.html
!which chromedriver

# If you get error, need to copy "chromedriver.exe" into script execution location or add where Chromedriver.exe is to the path

executable_path = {'executable_path': '/usr/local/bin/chromedriver'}
browser = Browser('chrome', **executable_path, headless=False)

# If you still get errors, turn headless=True to disable the need to pop up a window

# | 03 | | Scrape the [NASA Mars News Site](https://mars.nasa.gov/news/) to get Title and Paragraph Text
url = 'https://mars.nasa.gov/news/'

browser = Browser('chrome', headless=False)
browser.visit(url)
time.sleep(2) 
html = browser.html
soup = bs(html, 'html.parser')


