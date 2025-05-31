### Procedure

<b>1. Component Selection:</b>

<ul>
  <li>Choose suitable values of R, L, and C to design a band reject filter for the desired notch frequency .</li>
  
  <li>Use the formula:</li>
  <p>
  <strong>f<sub>0</sub> = 1/2π√(LC) </strong>
  </p>
 </ul> 

<b>2. Initial Conditions:</b>

<ul>
  <li>Set the function generator for a low initial frequency (e.g., 100 Hz).</li>
  <li>Set constant input amplitude (e.g., 1 V peak-to-peak).</li> 
</ul>


<b>3. Frequency Sweep:</b>

<ul>
  <li>Gradually increase the frequency in steps (e.g., 100 Hz to 10 kHz).</li>
  
  <li>At each frequency step, note the output voltage (Vout).</li>
  
  <li>Pay attention around the expected notch frequency — the output will drop significantly.</li>
</ul>

<b>4. Record Observations:</b>
<ul>
  <li>Tabulate values of Frequency (Hz) vs. Output Voltage (V).</li>
  
  <li>Calculate the gain in dB using:</li>
  
  <p>
  <strong>Gain(dB) = 20log<sub>10</sub> (V<sub>out</sub> / V<sub>in</sub>)</strong>
  </p> 
</ul>

<b>5. Plot Frequency Response:</b>

<ul>
  <li>Plot a graph of Gain(dB) vs Frequency(Hz).</li>
  
  <li>The graph will show a notch(dip) at the reject frequency.</li> 
</ul>

<b>6. Analysis:</b>

<ul>
  <li>Identify the notch frequency from the graph.</li>
  
  <li>Compare the theoretical and experimental values of f<sub>0</sub> </li>
  
  <li>Discuss the bandwidth and quality factor(Q) if required.</li> 
</ul>


