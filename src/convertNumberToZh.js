function toZhDigit(digit) {
  digit = typeof digit === 'number' ? digit.toString() : digit;
  const zh = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const unit = ['千', '百', '十', ''];
  const quot  = ['万', '亿', '兆'];
  
  let breakDigits = Math.ceil(digit.length/4);
  let notBreakSegment = digit.length%4 || 4;
  let segment;
  let zeroFlag = [];
  let result = '';
  
  while (breakDigits > 0) {
    if (!result) {
      segment = digit.slice(0, notBreakSegment);
      let segmentLen = segment.length;
      for (let i = 0; i < segmentLen; i++) {
        if (segment[i] !== 0) {
          if (zeroFlag.length > 0) {
            result += '零' + zh[segment[i]] + unit[4 - segmentLen + i];
            if (i === segmentLen - 1 && breakDigits > 1) {
              result += quot[breakDigits - 2]
            }
            zeroFlag.length = 0;
          } else {
            result += zh[segment[i]] + unit[4-segmentLen+i];
            if (i === segmentLen-1 && breakDigits > 1) {
              result += quot[breakDigits-2]
            }
          }
        } else {
          if (segmentLen == 1) {
            result += zh[segment[i]];
            break;
          }
          zeroFlag.push(segment[i]);
          continue;
        }
        
      }
    }
  }

}