from PIL import Image

image1 = Image.open('1-1.png')
image2 = Image.open('1-2.png')
image3 = Image.open('1-3.png')
image4 = Image.open('1-4.png')

alpha = 0.5
tmp1 = Image.blend(image1, image2, alpha)
tmp2 = Image.blend(image3, image4, alpha)
result = Image.blend(tmp1, tmp2, alpha)

tmp1.save('1-1-2.png')
result.save('1-result.png')

result.show()