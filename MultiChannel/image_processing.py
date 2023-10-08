import os
import argparse
import numpy as np
import math
import json
from astropy.io import fits



if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('data_path', type=str)
    args = parser.parse_args()

    data_path = args.data_path

    # os.mkdir('output')

    
    # basson: C2~B4

    ### 1st type

    piano_mapping = [   "D1", "F#1", "G1", "B1",
                        "D2", "F#2", "G2", "B2",
                        "D3", "F#3", "G3", "B3",
                        "D4", "F#4", "G4", "B4",
                        "D5", "F#5", "G5", "B5",
                        "D6", "F#6", "G6", "B6",
                        "D7", "F#7", "G7", "B7"]

    basson_mapping = [  "D3", "F#3", "G3", "B3",
                        "D4", "F#4", "G4"]

    clarinet_mapping=[  "D3", "F#3", "G3", "B3",
                        "D4", "F#4", "G4", "B4",
                        "D5", "F#5", "G5", "B5",
                        "D6", "F#6"]

    contrabass_mapping=["F#1", "G1", "B1",
                        "D2", "F#2", "G2", "B2",
                        "D3", "F#3", "G3", "G#3"]

    ### 2nd type 

    # piano_mapping = [   "C#1", "D#1", "F#1", "G#1", "A#1",
    #                     "C#2", "D#2", "F#2", "G#2", "A#2",
    #                     "C#3", "D#3", "F#3", "G#3", "A#3",
    #                     "C#4", "D#4", "F#4", "G#4", "A#4",
    #                     "C#5", "D#5", "F#5", "G#5", "A#5",
    #                     "C#6", "D#6", "F#6", "G#6", "A#6",
    #                     "C#7", "D#7", "F#7", "G#7", "A#7"]

    # basson_mapping = [  "D#3", "F#3", "G#3", "A#3", 
    #                     "C#4", "D#4", "F#4", "G#4"]

    # clarinet_mapping=[  "D#3", "F#3", "G#3", "A#3",
    #                     "C#4", "D#4", "F#4", "G#4", "A#4",
    #                     "C#5", "D#5", "F#5", "G#5", "A#5",
    #                     "C#6", "D#6", "F#6"]

    # contrabass_mapping=["F#1", "G#1", "A#1",
    #                     "C#2", "D#2", "F#2", "G#2", "A#2",
    #                     "C#3", "D#3", "F#3", "G#3"]

    ### 3rd type

    # piano_mapping = [   "C1", "D#1", "F1", "A1", 
    #                     "C2", "D#2", "F2", "A2", 
    #                     "C3", "D#3", "F3", "A3", 
    #                     "C4", "D#4", "F4", "A4", 
    #                     "C5", "D#5", "F5", "A5", 
    #                     "C6", "D#6", "F6", "A6", 
    #                     "C7", "D#7", "F7", "A7"]

    # basson_mapping = [  "D#3", "F3", "A3",
    #                     "C4", "D#4", "F4", "A4"]

    # clarinet_mapping=[  "D#3", "F3", "A3", 
    #                     "C4", "D#4", "F4", "A4", 
    #                     "C5", "D#5", "F5", "A5", 
    #                     "C6", "D#6", "F6"]

    # contrabass_mapping=["A1",
    #                     "C2", "D#2", "F2", "A2", 
    #                     "C3", "D#3", "F3"]

    ### 4th type

    # piano_mapping = [   "C1", "D1", "E1", "G1", "B1",
    #                     "C2", "D2", "E2", "G2", "B2",
    #                     "C3", "D3", "E3", "G3", "B3",
    #                     "C4", "D4", "E4", "G4", "B4",
    #                     "C5", "D5", "E5", "G5", "B5",
    #                     "C6", "D6", "E6", "G6", "B6",
    #                     "C7", "D7", "E7", "G7", "B7"]

    # basson_mapping = [  "D3", "E3", "G3", "B3",
    #                     "C4", "D4", "E4", "G4"]

    # clarinet_mapping=[  "D3", "E3", "G3", "B3",
    #                     "C4", "D4", "E4", "G4", "B4",
    #                     "C5", "D5", "E5", "G5", "B5",
    #                     "C6", "D6", "E6"]

    # contrabass_mapping=["G1", "B1",
    #                     "C2", "D2", "E2", "G2", "B2",
    #                     "C3", "D3", "E3", "G3"]

    ### default

    # piano_mapping = [   "C1", "C#1", "D1", "D#1", "E1", "F1", "F#1", "G1", "G#1", "A1", "A#1", "B1",
    #                     "C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2",
    #                     "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3",
    #                     "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
    #                     "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5",
    #                     "C6", "C#6", "D6", "D#6", "E6", "F6", "F#6", "G6", "G#6", "A6", "A#6", "B6",
    #                     "C7", "C#7", "D7", "D#7", "E7", "F7", "F#7", "G7", "G#7", "A7", "A#7", "B7"]

    # basson_mapping = [  "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3",
    #                     "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4"]

    # clarinet_mapping=[  "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3",
    #                     "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
    #                     "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5",
    #                     "C6", "C#6", "D6", "D#6", "E6", "F6", "F#6"]

    # contrabass_mapping=["F#1", "G1", "G#1", "A1", "A#1", "B1",
    #                     "C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2",
    #                     "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3"]

    mapping = [piano_mapping, clarinet_mapping, basson_mapping, contrabass_mapping]
    name = ['piano_note', 'clarinet_note', 'basson_note','contrabass_note']
    velocity = [1, 1, 1, 1]

    files = ['w1.fits', 'w2.fits', 'w3.fits', 'w4.fits']

    # os.remove(os.path.join(data_path, 'melody.js'))
    file_path = '../frontend/src/constant/melody3.js'
    # os.remove(file_path)

    for j, file in enumerate(files):
        image_data = fits.open(os.path.join(data_path, file))[0].data
        image_data = np.array(image_data)
        # print(image_data.shape)
        data = np.log10(image_data)
        data = (data- np.mean(data))/np.std(data)
        print(data.shape)

        total_t = 10
        dt = 0.1
        dx = int(data.shape[0] * dt / total_t)
        

        total_class = len(mapping[j])
        # class = int(math.floor(y / data[1] * total_class))
        dy = int(math.floor((data.shape[1] / total_class)))

        pulse = {}
        for i in range(total_class):
            pulse[i] = []
        
        x = 0
        total_x = data.shape[0]
        dt = total_t * dx / total_x
        
        while x + dx < total_x:
            t = total_t * x / total_x

            for i in range(total_class):
                if np.max(data[x:x+dx, i*dy:((i+1)*dy)]) > 2:
                    if len(pulse[i]) > 0:
                        last_t, last_dt = pulse[i][-1]
                        if abs(t - (last_t + last_dt)) < dt:
                            pulse[i][-1] = (last_t, last_dt + dt)
                        else:
                            pulse[i].append((t, dt))
                    else:
                        pulse[i].append((t, dt))
            
            x += dx

        # print(pulse)

        arr = []
        for i in range(total_class):
            for (t, dt) in pulse[i]:
                new_dict = {}
                new_dict['pitch'] = mapping[j][i]
                new_dict['timing'] = t
                new_dict['duration'] = dt
                new_dict['velocity'] = velocity[j]
                arr.append(new_dict)
        # print(arr)
        # file_path = os.path.join(data_path, 'melody.js')

        with open(file_path, 'a') as f:
            f.write(f"export const {name[j]}_3 = ")
        with open(file_path, 'a') as f:
            json.dump(arr, f, indent=2)
            f.write('\n')     


        



    