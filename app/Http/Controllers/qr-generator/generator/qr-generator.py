import qrcode
import sys
import json
import logging
from PIL import Image

generateValues = json.loads(sys.argv[1])

logging.basicConfig(filename="D:/projects/vatadev/qr-templar/app/Http/Controllers/qr-generator/generator/data.log", level=logging.INFO)

# logging.info(generateValues)

data = ''
qrSize = int(generateValues['qrSize'])

if(generateValues['selection'] == 'url'):
    data = f"https://{generateValues['values']['url']}"

if(generateValues['selection'] == 'text'):
    data = f"{generateValues['values']['text']}"

if(generateValues['selection'] == 'vcard'):
    logging.info(generateValues)

    try:
        first_name = generateValues['values']['first_name'] or ''
        last_name = generateValues['values']['last_name'] or ''
        email = generateValues['values']['email'] or ''
        company = generateValues['values']['company'] or ''
        job_title = generateValues['values']['job_title'] if generateValues['values']['job_title'] != None else ' '
        tel = generateValues['values']['contact_number'] or ''
        url = f"https://{generateValues['values']['website_url']}" or ''
        address = generateValues['values']['address'] or ''
        city = generateValues['values']['city'] or ''
        postal_code = generateValues['values']['postal_code'] or ''
        country = generateValues['values']['country'] or ''
    except Exception as e:
        logging.error(e)

    logging.info(first_name, last_name, email, company, job_title, tel, url, address, city, postal_code, country)

    data = f"""BEGIN:VCARD
VERSION:3.0
N:{first_name};{last_name};;;
FN:{first_name} {last_name}
ORG:{company};{job_title}
EMAIL;type=INTERNET;type=WORK;type=pref:{email}
TEL;type=CELL:{tel}
URL:{url}
ADR;type=WORK:{address},{city},{postal_code},{country}
NOTE:
item3.URL;type=pref:{url}
CATEGORIES:Work,Business
END:VCARD"""
logging.info(data)

if(generateValues['selection'] == 'email'):
    to = generateValues['values']['mail']
    subject = generateValues['values']['subject']
    mail_body = generateValues['values']['body']

    data = f"mailto:{to}?subject={subject}&body={mail_body}"

if(generateValues['selection'] == 'tel'):
    tel = generateValues['values']['telephone']

    data = f"tel:{tel}"

background = generateValues['background']
foreground = generateValues['foreground']

# Generate the QR images with attributes

qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_M,
    box_size=10,
    border=1,
)
qr.add_data(data)
qr.make(fit=True)

# try:
# except Exception:
#     logging.error("message")
#     logging.error(Exception)
#     logging.exception("message")
#     logging.exception(Exception)

logging.info(qr)

img = qr.make_image(fill_color=f"{foreground}", back_color=f"{background}")
img = img.resize((qrSize,qrSize))
# logging.info(img)


url = f"D:/projects/vatadev/qr-templar/storage/app/public/temp_generated_qr_codes/{generateValues['url']}.png"
img.save(url)

print(url)
