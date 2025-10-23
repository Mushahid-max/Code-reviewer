import { useState, useEffect } from 'react'
import './App.css'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import Prism from "prismjs"
import axios from "axios"
import Markdown from "react-markdown"
import "prismjs/components/prism-javascript"

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`)
  const [review, setReview] = useState("")

  useEffect(() => {
    Prism.highlightAll()
  }, [review])

  async function reviewCode () {
    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", { code })
      setReview(response.data)
    } catch (error) {
      console.error("Error fetching review:", error)
      setReview("Error fetching review")
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={newCode => setCode(newCode)}
              highlight={code => Prism.highlight(code, Prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira Code", "Fira Mono", monospace',
                fontSize: 17,
                border: '1px solid #ddd',
                borderRadius: "5px",
                height: "100%",
                width: "100%",
                backgroundColor: "#2d2d2d",
                color: "#fff"
              }}
            />
          </div>
          <div onClick={reviewCode} className="review">Review</div>
        </div>

        <div className="right">
         <Markdown>{review}</Markdown>
        </div>
      </main>
    </>
  )
}

export default App
