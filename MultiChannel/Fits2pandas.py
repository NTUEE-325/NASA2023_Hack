import numpy as np
import matplotlib.pyplot as plt
import cmocean
from matplotlib.colors import ListedColormap
import json
from astropy.table import Table
from astropy.io import fits

data_bands_name = 'MultiChannel/image5/w4.fits'

fits.info(data_bands_name)

hdul = fits.open(data_bands_name)
hdu = hdul[0]
data = hdu.data
# print(data)
# print(type(data))

data = np.log10(data)

data_mean = np.mean(data)
data_std = np.std(data)

normalized_data = (data-data_mean)/data_std

# min_val = np.min(normalized_data)
max_val = np.max(normalized_data)
# print(min_val, max_val)

final_data = max_val-normalized_data

cmap1 = cmocean.cm.dense
cmap2 = cmocean.cm.algae
cmap3 = cmocean.cm.turbid
cmap4 = cmocean.cm.amp


plt.imshow(final_data, cmap=cmap4)

# plt.colorbar()
plt.axis('off')
plt.margins(0,0)
plt.gca().xaxis.set_major_locator(plt.NullLocator())
plt.gca().yaxis.set_major_locator(plt.NullLocator())

plt.savefig('MultiChannel/blendPicturesNew/5_0001.jpg', bbox_inches = 'tight', pad_inches=0)

plt.show()
