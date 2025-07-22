# -*- coding: utf-8 -*-
import requests
import json

CQTOKEN = "app.24760.0102e040655205f22ce63408208378f37b09733231aa2131"
def run(event, context):
    user = json.loads(event['body']['user'])
    quiz = user['props_custom'].get('Интересуемая услуга'.encode('unicode_escape').decode('unicode_escape'), '')
    phone = str(user['props'].get('$phone', '')).replace(' ','').replace('+7','8')
    userId = str(user['id'])
    subdomain = str(user['props_custom'].get('subdomain'))
    
    formattedQuizProperty = ''
    for index, item in enumerate(quiz):
        formattedQuizProperty += (str(index + 1) + '. ' + str(item) + '<br>')
        
    dataText = "Клиент прошел квиз (опрос) и оставил телефон: " + phone + " <br>\
        subdomain: " + subdomain + "<br>\
        Carrot uid: " + userId + "<br>\
        Интересумая услуга:<br>" + formattedQuizProperty + "\
        "
        
    data = {
        'from_email': 'support@mail.carrotquest.io',
        'to_emails': json.dumps(['alikin@carrotquest.io']),
        'subject': 'Заявка с сайта',
        'html': dataText,
        'auth_token': CQTOKEN
    }
    r = requests.post("https://api.carrotquest.io/v1/utils/email", data=data)
    return r.json()