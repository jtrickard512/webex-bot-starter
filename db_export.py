import xlsxwriter
from pymongo import MongoClient
import datetime


client = MongoClient('localhost', 27017)
db = client['real-deal']
survey_collection = db['redirect']
survey_records = [survey_record for survey_record in survey_collection.find({})]

workbook = xlsxwriter.Workbook('db_export.xlsx')
ws = workbook.add_worksheet()

headers = [
    'SurveyId',
    'Date'
]
col = 0
row = 0
for header in headers:
    ws.write(row, col, header)
    col += 1
col = 0

for i,record in enumerate(survey_records):
	try:
		db_row = [
			record['survey_id'],
			record['created']
		]
		row+=1
		col = 0
		for r in db_row:
			ws.write(row,col,r)
			col += 1
	except KeyError:
		continue
print('Spreadsheet created')
workbook.close()