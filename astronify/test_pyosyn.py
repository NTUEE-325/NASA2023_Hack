from pyo import *

s = Server().boot()

class Piano:
    '''
    inputs: trig, pitch, dur, mul (pyo objects, polyphonic, 多聲部)
    '''
    def __init__(self, trig, pitch, dur):
        self.trig = trig
        self.pitch = pitch
        self.dur = dur
        self.ta = ExpTable(list=[(0,0),(20,1),(8191,0)], exp=2)
        self.ex = TrigEnv(self.trig, self.ta, dur=self.dur, interp=1)
        self.f = SumOsc(freq=MToF(self.pitch), ratio=0.5, index=.2, mul=self.ex)
        self.ch = Chorus(self.f, depth=2.5, feedback=0.2, bal=.3, mul=0.3)
        # mul: multiply?(音量)
        # self.rv = Freeverb(self.ch, size=.4, damp=.9, bal=.65, mul=1)
        # self.ret = Mix(self.ch+self.rv,2)
        self.ret = self.ch
    def output(self):
        return self.ret
    def setMul(self, mul):
        self.ch.setMul = mul
    def setDur(self, dur):
        self.ex.setDur = dur
    def setPitch(self, pitch):
        self.f.setFreq = pitch

tm = 0.5
# isochornous (等時) triggered signal, poly: # of melody lines in the polyphony
mt = Metro([tm,tm*2], poly=1).play()

m = Percent(mt, 100)

# 84 = C6
pm2 = [84, 83, 81, 79, 77, 76, 74, 72] 
tc = TrigChoice(m, pm2) # pitch: random notes of a scale
tl = TrigChoice(m, [1]) # random choice for note length

pa = Piano(m, tc, tl) # Piano(trig, midi pitch, dur, mul)

# p = Pan(pa.output(), outs=2, pan=[.3,.7], spread=0)     .out()
p = Pan(pa.output(), outs=2, pan=0.5, spread=0)     .out()
s.start()
time.sleep(4)
p.stop()
s.stop()
