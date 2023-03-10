import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
function ViewPage() {
  let { page } = useParams()

  return (
    <div>
      <iframe
        src={
          "https://4ifjn614cg.execute-api.us-east-1.amazonaws.com/view/" +
          page +
          "#view=fitH"
        }
        width="100%"
        height={1000}
        margin={0}
        padding={0}
        border="none"
      ></iframe>
    </div>
  )
}
export default ViewPage
