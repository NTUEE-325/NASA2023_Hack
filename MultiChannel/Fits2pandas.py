import numpy as np
import matplotlib.pyplot as plt
import cmocean
from matplotlib.colors import ListedColormap
import json
from astropy.table import Table
from astropy.io import fits

data_bands_name = 'image1/w4.fits'

fits.info(data_bands_name)

hdul = fits.open(data_bands_name)
hdu = hdul[0]
data = hdu.data
print(data)
print(type(data))

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

plt.savefig('1-4.png')

plt.show()
