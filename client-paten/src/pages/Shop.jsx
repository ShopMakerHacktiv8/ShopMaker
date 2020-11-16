import React, { useState } from 'react'
import { Form, Button, Container, Col, Row, Alert } from 'react-bootstrap'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useSelector } from 'react-redux'

export default function Shop() {

  const [ copied, setCopied ] = useState("")

  const { shopInfo } = useSelector(
    state => state.shopLoginReducer
  )
  
  return (
    <Container>
      <div style={{ height: "70vh" }} className="d-flex align-items-center justify-content-center flex-column">
        <h3>Your Shop is Ready!</h3>
        <CopyToClipboard text={`https://shopmaker-pwa.web.app/${shopInfo.id}`}
          onCopy={() => setCopied({copied: true})}>
          <Button variant="success">Share Now!</Button>
        </CopyToClipboard>

        {copied ? <span style={{color: 'red'}}>Copied.</span> : null}
      </div>
    </Container>
  )
}