import CVSS from "cvss"

export const calculateCVSS = (vector) => {

 const cvss = new CVSS(vector)

 return {
  score:cvss.getScore(),
  severity:cvss.getRating()
 }

}
