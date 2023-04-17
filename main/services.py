import logging
import re
import json
import requests
from bs4 import BeautifulSoup

from main.models import UrlsContent, UrlsPoster

logger = logging.getLogger(__name__)


''' парсер для считывания данных с сайта kassy.ru '''
def created_mailing_list():
    ticket_dates = []
    headers = {
        'Accept': '*/*',
        'User_Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
                      'Chrome/102.0.0.0 Safari/537.36'
    }

    with open('json_url.json', 'r', encoding='utf-8') as file:
        urls = json.load(file)

    for value in urls:
        url = value.pop('poster_url')

        req = requests.get(url, headers=headers)

        with open('parser.html', 'w', encoding='utf-8') as file:
            file.write(req.text)

        with open('parser.html', encoding='utf-8') as file:
            src = file.read()
            soup = BeautifulSoup(src, 'lxml')
        try:
            name_event = soup.find(class_='content').find('h1').find('a').string.lower()
        except Exception:
            name_event = 'Не нашли названия'
        try:
            rate = soup.find(class_='RARS').string
        except Exception:
            rate = 'нет ценза'
        try:
            date_event_all = soup.find(class_='venue').text.split('\n')[-2]
            date_event = ' '.join(date_event_all.split()[:2])
            time_event = soup.find(class_='venue').find('b').text
        except Exception:
            date_event = 'не нашли дату'
            time_event = 'не нашли время'
        try:
            venue = soup.find(class_='venue').find('a').string
        except Exception:
            venue = 'не нашли место'
        try:
            price = soup.find(class_='price').find('p').text.split(':')[1].replace('', '')
        except Exception:
            price = 'не нашли цену'

        try:
            content_text = soup.find(class_='content').find('div', class_=None).get_text()
        except Exception:
            content_text = 'Описания мероприятия нет, запрашивайте у организатора'

        poster = {
            'poster_url': url,
        }

        urls_data = {
            #'poster_url': url,
            'name_event': name_event,
            'rate': rate,
            'date_event': date_event,
            'time_event': time_event,
            'venue': venue,
            'price': price,
            'content_text': content_text
        }

        ticket_dates.append(urls_data)

        UrlsPoster.objects.create(**poster)
        UrlsContent.objects.create(**urls_data)


    with open('json_content.json', 'w', encoding='utf8') as file:     # 'static/main/js/json_content.js'
        json.dump(ticket_dates, file, indent=4)

    return ticket_dates


''' распаковываем json в словарь для передачи в контекст '''
def unpack(context):
    with open('json_content.json', 'r', encoding='utf8') as file:
        file = json.load(file)
        for date in file['content']:
            context.update(date['unchantedcontent'])
            context.update(date['generalcontent'])
            context.update(date['transfer'])
    with open('json_url.json', 'r', encoding='utf-8') as file:
        file = json.load(file)
        for url in file:
            context.update(url)
    return context


def unpuck_all(context):
    with open('json_content.json', 'r', encoding='utf8') as file:
        file = json.load(file)
        for date in file['contents']:
            context.update(date['UnchangedContent'])
        for key, value in file.items():
            if key in context:
                context[key].extend(value)
            else:
                context[key] = value
    return context



