from flask import Flask,request
import numpy as np
import pydicom
from PIL import Image
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api')
def convert():
    name = request.args['img']
    image = pydicom.dcmread(name)
    print(image)
    image = image.pixel_array.astype(float)
    print(image.shape)
    # print(image[256])
    scale = (np.maximum(image,0)/image.max())*255
    print("image.max   ",image.max())
    print()
    final_im = np.uint8(scale)
    print(final_im)
    final_im = Image.fromarray(final_im)
    print(" from array !!",final_im)
    final_im.save('./image/photo.jpg')
    return name

if __name__ == '__main__':
    app.run(debug=True, port=6000)