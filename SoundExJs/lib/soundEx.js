// phoneme.js

function convertToSoundEx(program) {
  // Confirm there is something to do
  const phnmsToConvert = program.phonemes.trim();
  if (!phnmsToConvert) {
    console.log("No phonemes to convert");
    return undefined;
  }
  
  // Split the supplied text at any word boundaries
  const words = phnmsToConvert.split(/\|/).map(function (w) { return w.toLowerCase() });

  // Convert it to an array of phoneme hashes
  program.soundExx = [].concat.apply([], words.map(function (w, wIndex) {
    const sndXx = [];
    // Split each word into phonemes
    const phnms = w.split(/\s+/).map(function (p) { return p.toLowerCase() });
    phnms.forEach(function (p, index) {
      // Add back in word dividers - these may be filtered back out later
      if (!p) {
        if (index === 0) {
          p = "|";
        } else {
          return;
        }
      }

      const sndExRules = program.sndExRules.filter(function (s) {
        const rx = new RegExp(s.regex);
        return rx.test(p);
      });
      if (index === 0 && !!sndExRules[0].leadingValue) {
        sndXx.push(sndExRules[0].leadingValue);
      } else if (!sndExRules[0].dump || program.exclusions.indexOf(sndExRules[0].dump) === -1) {
        sndXx.push(sndExRules[0].value);
      }
    });

    return sndXx;
  }));
  
  // Return the whole thing
  return program;
}

exports.toSoundEx = convertToSoundEx;