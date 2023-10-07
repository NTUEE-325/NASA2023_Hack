import numpy as np
from astropy.table import Table
from astropy.io import fits

fits.info('0017p333_ac51/0017p333_ac51-w3-int-3_ra2.198833333_dec33.43333333_asec600.000.fits')

hdul = fits.open('0017p333_ac51/0017p333_ac51-w3-int-3_ra2.198833333_dec33.43333333_asec600.000.fits')
hdu = hdul[0]
data = hdu.data
print(data)
# print(max(data))

# dat = Table.read('0017p333_ac51/0017p333_ac51-w2-int-3_ra2.198833333_dec33.43333333_asec600.000.fits', format='fits')
# df = dat.to_pandas()
# print(dat)