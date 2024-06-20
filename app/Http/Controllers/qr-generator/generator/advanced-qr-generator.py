import qrcode
import qrcode.image.svg
import sys
import json
import logging
from PIL import Image
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.colormasks import SolidFillColorMask

sentData = json.loads(sys.argv[1])
logging.basicConfig(filename="/home/vagrant/code/qr-generator/app/Http/Controllers/qr-generator/generator/data.log", level=logging.INFO)
logging.info(sentData)

def GenerateQrCode(data, bg_color, fg_color, qr_format, size, logo_path, file_name, account_id, campaign_id):

    if logo_path != None:
        logo_path = f'/home/vagrant/code/qr-generator/storage/app/{logo_path}'


    if qr_format == 'svg':
        logging.info(qr_format)
        
        factory = qrcode.image.svg.SvgPathFillImage
        mmCalc = int(format(size/11.713653136531365, ".0f"))
        try:
            qr = qrcode.QRCode(
                version=1,
                error_correction=qrcode.constants.ERROR_CORRECT_M,
                box_size=mmCalc,
                border=1,
                image_factory=factory
            )
            qr.add_data(data)
            qr.make(fit=True)

            if logo_path is not None:
                img = qr.make_image(fill_color=f"{fg_color}", back_color=f"{bg_color}", embeded_image_path=f'{logo_path}')
            else:
                img = qr.make_image(fill_color=f"{fg_color}", back_color=f"{bg_color}")

            # img = qr.make_image(attrib={'class': 'test19','background': f'{bg_color}', 'fill': f'{fg_color}'}, embeded_image_path=f'{logo_path}')

            url = f"/home/vagrant/code/qr-generator/storage/app/public/account_images/{account_id}/{campaign_id}/{file_name}.{qr_format}"
            img.save(url)
            fin = open(url, "rt")
            data = fin.read()
            data = data.replace('fill="white"', f'fill="{bg_color}"').replace('id="qr-path" fill="#000000"', f'id="qr-path" fill="{fg_color}"')
            fin.close()
            fin = open(url, 'wt')
            fin.write(data)
            fin.close
        
        except Exception:
            logging.error("message")
            logging.error(Exception)
            logging.exception("message")
            logging.exception(Exception)
    else:
        try:
            qr = qrcode.QRCode(
                version=1,
                error_correction=qrcode.constants.ERROR_CORRECT_H,
                box_size=10,
                border=1 
            )
            qr.add_data(data)
            qr.make(fit=True)
            if logo_path is not None:
                # img = qr.make_image(color_mask=SolidFillColorMask(front_color=f"{fg_color}"), back_color=f"{bg_color}", embeded_image_path=f'{logo_path}', image_factory=StyledPilImage)
                img = qr.make_image(fill_color=f"{fg_color}", back_color=f"{bg_color}")
                addLogo(img, file_name, account_id, campaign_id, qr_format, logo_path)
            else:
                img = qr.make_image(fill_color=f"{fg_color}", back_color=f"{bg_color}")
                addLogo(img, file_name, account_id, campaign_id, qr_format)


            
        
        except Exception:
            logging.error("message")
            logging.error(Exception)
            logging.exception("message")
            logging.exception(Exception)
        
def addLogo(img, file_name, account_id, campaign_id, qr_format, logo=None):
    img = img.resize((size, size))
    if logo is not None:
        # img = Image.open(img, 'r')
        img_w, img_h = img.size
        logo_img = Image.open(logo)
        logo_img = logo_img.resize((int(28 / 100 * img_w), int(28 / 100 * img_h)))
        logo_img_w, logo_img_h = logo_img.size
        logging.info(logo_img_w)
        logging.info(logo_img_h)
        offset = (int((img_w - logo_img_w) // 2), int((img_h - logo_img_h) // 2))
        logging.info(offset)
        logo_img.convert("RGBA")
        img.paste(logo_img, offset, logo_img)
    
    url = f"/home/vagrant/code/qr-generator/storage/app/public/account_images/{account_id}/{campaign_id}/{file_name}.{qr_format}"
    img.save(url)


        

# Create data variables
qr_type = sentData['qr_type']
bg_color = sentData['bg_color']
fg_color = sentData['fg_color']
qr_format = sentData['format']
size = int(sentData['size'])
logo_path = None
logging.info(f"FG Color: {fg_color}")
if sentData.get('logo_path') is not None:
    logo_path = sentData['logo_path']
else: 
    logo_path = None

name = sentData['qr_name']
account_id = sentData['account_id']
campaign_id = sentData['campaign_id']

# Determine the use selection of qr type
if qr_type == 'dynamic':
    if sentData['selection'] == 'url':
        url = sentData['url']['default_short_url']
        data = url
    
    GenerateQrCode(data, bg_color, fg_color, qr_format, size, logo_path, name, account_id, campaign_id)
elif qr_type == 'static':
    test = ""



