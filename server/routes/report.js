import express from "express"

const router = express.Router()

router.post("/", (req,res)=>{

 const {title,summary,steps,impact,poc,remediation} = req.body

 const markdown = `
# ${title}

## Summary
${summary}

## Steps to Reproduce
${steps}

## Impact
${impact}

## Proof of Concept
${poc}

## Remediation
${remediation}
`

 res.json({markdown})

})

export default router
