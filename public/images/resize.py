import cv2
import glob
import pathlib

images = glob.glob("qr-templar-logo-draft-1.png")

i = 0

for image in images:
    path = pathlib.PurePath(image)
    image_name = path.name
    print(image_name)
    img = cv2.imread(image,1)
    # resize = cv2.resize(img, (int(img.shape[0]/2),int(img.shape[1]/2)))
    resize = cv2.resize(img, (200,56))
    cv2.imwrite("qr-templar-logo-header.png", resize)
    i += 1
    cv2.imshow(image_name, resize)
    cv2.waitKey(500)
    cv2.destroyAllWindows