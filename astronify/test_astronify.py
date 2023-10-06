from astronify.series import SoniSeries 
from astropy.table import Table
import lightkurve   
import matplotlib.pyplot as plt
# from mingus.midi import fluidsynth
# from mingus.containers import Note 
"""Fluidsynth cannot be easily installed in windows. Perhaps use Linux instead?"""

# # find a soundfont file for the timbre
# fluidsynth.init(driver="alsa")
# fluidsynth.play_Note(Note("C-5"))

# search_lightcurvefile() is deprecated
kep12b_lc = lightkurve.search_lightcurve("KIC 11804465", cadence="long", quarter=1).download_all()[0].SAP_FLUX.to_table()    
data_soni = SoniSeries(kep12b_lc)
data_soni.sonify()

"""
Sonification will not play when run in a script— Currently sonifications cannot be played 
(using the play() method from python scripts (as opposed to in interactive mode). 
Instead write the sonification to a file and play the result in the audio player of your choice.
"""
data_soni.write("test.wav")

f, ax = plt.subplots(figsize=(12, 6))
ax.plot(kep12b_lc['time'].jd, kep12b_lc['flux'])
ax.set_xlabel("Time (JD)")
ax.set_ylabel("Flux")

plt.show()
# data_soni.play()   