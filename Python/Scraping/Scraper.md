Source: https://link.medium.com/3K114wsLX3 

~~~

from bs4 import BeautifulSoup
from requests import get
import pandas as pd
import itertools
import matplotlib.pyplot as plt
import seaborn as sns
sns.set()

headers = ({'User-Agent':
            'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'})

%%time

n_pages = 0

for page in range(0,900):
    n_pages += 1
    sapo_url = 'https://casa.sapo.pt/Venda/Apartamentos/?sa=11&lp=10000&or=10'+'&pn='+str(page)
    r = get(sapo_url, headers=headers)
    page_html = BeautifulSoup(r.text, 'html.parser')
    house_containers = page_html.find_all('div', class_="searchResultProperty")
    if house_containers != []:
        for container in house_containers:

            # Price            
            price = container.find_all('span')[2].text
            if price == 'Contacte Anunciante':
                price = container.find_all('span')[3].text
                if price.find('/') != -1:
                    price = price[0:price.find('/')-1]
            if price.find('/') != -1:
                price = price[0:price.find('/')-1]
            
            price_ = [int(price[s]) for s in range(0,len(price)) if price[s].isdigit()]
            price = ''
            for x in price_:
                price = price+str(x)
            prices.append(int(price))

            # Zone
            location = container.find_all('p', class_="searchPropertyLocation")[0].text
            location = location[7:location.find(',')]
            zone.append(location)

            # Title
            name = container.find_all('span')[0].text
            titles.append(name)

            # Status
            status = container.find_all('p')[5].text
            condition.append(status)

            # Area
            m2 = container.find_all('p')[9].text
            if m2 != '-':
                m2 = m2.replace('\xa0','')
                m2 = float("".join(itertools.takewhile(str.isdigit, m2)))
                areas.append(m2)
                
            else:
                m2 = container.find_all('p')[7].text
                if m2 != '-':
                    m2 = m2.replace('\xa0','')
                    m2 = float("".join(itertools.takewhile(str.isdigit, m2)))
                    areas.append(m2)
                else:
                    areas.append(m2)

            # Creation date
            date = pd.to_datetime(container.find_all('div', class_="searchPropertyDate")[0].text[21:31])
            created.append(date)

            # Description
            desc = container.find_all('p', class_="searchPropertyDescription")[0].text[7:-6]
            descriptions.append(desc)

            # url
            link = 'https://casa.sapo.pt/' + container.find_all('a')[0].get('href')[1:-6]
            urls.append(link)

            # image
            img = str(container.find_all('img')[0])
            img = img[img.find('data-original_2x=')+18:img.find('id=')-2]
            thumbnails.append(img)
    else:
        break
    
    sleep(randint(1,2))
    

print('You scraped {} pages containing {} properties.'.format(n_pages, len(titles)))






~~~
