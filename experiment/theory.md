

#### Band Reject Filter (BRF):

<ul>
  A Band Reject Filter, also known as a Notch Filter or Band Stop Filter, is a type of electronic filter that allows most frequencies to pass but attenuates a specific range (band) offrequencies. It is essentially the inverse of a bandpass filter.
</ul>

#### Working Principle:

<ul>
  The Band Reject Filter combines the properties of:
  
  <li><b>Low Pass Filter (LPF):</b> Passes frequencies below a certain cutoff f<sub>L</sub> </li>
  
  <li><b>High Pass Filter (HPF):</b> Passes frequencies above a certain cutoff f<sub>H</sub> </li>
  By combining these two filters (LPF + HPF), a band of frequencies between  and  is attenuated, creating a "notch" in the frequency response.
</ul>

#### Types of Band Reject Filters:
<ul>
  <b>1. Passive BRF –</b> Uses only R, L, and C components.
  
  <b>2. Active BRF –</b> Uses op-amps along with R and C; offers better control and gain.
</ul>

#### Resonant Frequency (Notch Frequency):

<ul>
  In a simple RLC circuit, the notch frequency  (the frequency that is most attenuated) is given by:
  
  <p>
    <strong>f<sub>0</sub> = 1/2π√(LC)</strong>
  </p>
  
  Where:
  
  <li>L = Inductance in Henry (H)</li>
  
  <li>C = Capacitance in Farads (F)</li>
  
  At this frequency, the impedance of the LC circuit becomes very high, blocking signal flow.
</ul>

#### Frequency Response Characteristics:

<ul>
  <li>At low frequencies: Inductor acts as a short, allowing signal to pass.</li>
  
  <li>At high frequencies: Capacitor acts as a short, again allowing signal to pass.</li>
  
  <li>At resonant frequency : LC tank has maximum impedance, and signal is blocked → output drops sharply.</li>
  
  The resulting frequency response graph shows a dip (notch) at , hence the name Notch Filter.
</ul>

#### Applications

<ul>
  <li>Noise suppression (e.g., removing 50/60 Hz hum from audio systems)</li>
  
  <li>Communication systems (to block specific interfering frequencies)</li>
  
  <li>Medical instruments (e.g., notch filters in ECG to remove power line noise)</li>
  
  <li>Signal processing and instrumentation</li>
</ul>

