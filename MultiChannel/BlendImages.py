from PIL import Image

image1 = Image.open('MultiChannel/blendPicturesNew/6_1000.jpg')
image2 = Image.open('MultiChannel/blendPicturesNew/6_0100.jpg')
image3 = Image.open('MultiChannel/blendPicturesNew/6_0010.jpg')
image4 = Image.open('MultiChannel/blendPicturesNew/6_0001.jpg')

alpha = 0.5
alpha3 = 0.333

tmp12 = Image.blend(image1, image2, alpha)
tmp13 = Image.blend(image1, image3, alpha)
tmp14 = Image.blend(image1, image4, alpha)
tmp23 = Image.blend(image2, image3, alpha)
tmp24 = Image.blend(image2, image4, alpha)
tmp34 = Image.blend(image3, image4, alpha)

tmp123 = Image.blend(tmp12, image3, alpha3)
tmp124 = Image.blend(tmp12, image4, alpha3)
tmp134 = Image.blend(tmp13, image4, alpha3)
tmp234 = Image.blend(tmp23, image4, alpha3)

result = Image.blend(tmp12, tmp34, alpha)

tmp12.save('MultiChannel/blendPicturesNew/6_1100.jpg')
tmp13.save('MultiChannel/blendPicturesNew/6_1010.jpg')
tmp14.save('MultiChannel/blendPicturesNew/6_1001.jpg')
tmp23.save('MultiChannel/blendPicturesNew/6_0110.jpg')
tmp24.save('MultiChannel/blendPicturesNew/6_0101.jpg')
tmp34.save('MultiChannel/blendPicturesNew/6_0011.jpg')
tmp123.save('MultiChannel/blendPicturesNew/6_1110.jpg')
tmp124.save('MultiChannel/blendPicturesNew/6_1101.jpg')
tmp134.save('MultiChannel/blendPicturesNew/6_1011.jpg')
tmp234.save('MultiChannel/blendPicturesNew/6_0111.jpg')
result.save('MultiChannel/blendPicturesNew/6_1111.jpg')

result.show()


# import cv2
# import numpy as np

# # Create an all-black image
# width, height = 370, 369
# all_black_image = np.zeros((height, width, 3), dtype=np.uint8)

# # Save the black image to a file
# cv2.imwrite('MultiChannel/blendPicturesNew/6_0000.jpg', all_black_image)
