import xlsxwriter
from pymongo import MongoClient
from pprint import pprint
import datetime
import os
import win32com.client as win32

file_name = 'real_deal_non_responders_db_export.xlsx'
path = "C:/Users/josricka/Dev/webex-bot-starter/non_responders_db_export.xlsx"

client = MongoClient('localhost', 27017)
db = client['real-deal']
survey_collection = db['non-responders']
survey_records = [survey_record for survey_record in survey_collection.find({})]

workbook = xlsxwriter.Workbook(file_name)
ws = workbook.add_worksheet()

def password_protect_wb(file,password):
    if os.path.isfile(file):
        excel = win32.gencache.EnsureDispatch('Excel.Application')
        #Before saving the file set DisplayAlerts to False to suppress the warning dialog:
        excel.DisplayAlerts = False
        wb = excel.Workbooks.Open(file)

        wb.SaveAs(file, 51, password)                                               
        wb.Close() 
        excel.Application.Quit()
    else:
        print('file does not exist')

def parse_date_string(str):

    date_str = str

    date = date_str.split('T')[0]
    time = date_str.split('T')[1].split('Z')[0]

    date_str = date + ' ' + time

    return date_str


headers = [
    'name',
    'email',
    'Date Submitted',
    'I was too busy',
    'I forgot to respond',
    'I did not see the survey request',
    'I do not trust the confidentiality of the survey',
    'I do not believe the survey is a valuable use of my time',
    'Other'
]
col = 0
row = 0
for header in headers:
    ws.write(row, col, header)
    col += 1

col = 0

for record in survey_records:

    date_time_str = parse_date_string(record['attachmentAction']['created'])
    date_time_obj = datetime.datetime.strptime(date_time_str, '%Y-%m-%d %H:%M:%S.%f')

    r = [
        record['person']['displayName'],
        record['person']['emails'][0],
        date_time_obj.date(),
        record['attachmentAction']['inputs']['choice1'],
        record['attachmentAction']['inputs']['choice2'],
        record['attachmentAction']['inputs']['choice3'],
        record['attachmentAction']['inputs']['choice4'],
        record['attachmentAction']['inputs']['choice5'],
        record['attachmentAction']['inputs']['comment']
    ]

    row+=1
    for i in r:
        ws.write(row,col,i)
        col+=1
    col = 0

print('Spreadsheet created')
workbook.close()



#password_protect_wb(path,'031521')
