import React, { useState } from 'react'
import {
  Form,
  Button,
  Container,
  Col,
  Row,
  Alert,
  Image,
} from 'react-bootstrap'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useSelector } from 'react-redux'
var QRCode = require('qrcode.react')

export default function Shop() {
  const [copied, setCopied] = useState('')

  const { shopInfo } = useSelector((state) => state.shopLoginReducer)

  return (
    <Container>
      <div
        style={{ height: '70vh' }}
        className='d-flex align-items-center justify-content-center flex-column'
      >
        <div className="mb-5 text-center mt-5">
          <h1>Hello, {shopInfo.name}</h1> <br></br>
          <h3>Your Shop is Ready!</h3>
          <h5>Now, you can scan this QR-Code and share to your potential customer</h5>
        </div>
        
        <Row>
          <Col sm={6} className='d-flex justify-content-center'>
            <Row>
              <Col sm={12} className="d-flex justify-content-center">
              <QRCode value={`https://shopmaker-pwa.web.app/${shopInfo.id}`} size="200" />,
                
              </Col>
              <Col sm={12} className="d-flex justify-content-center">
                

              </Col>
            </Row>
          </Col>
          <Col sm={6} className="d-flex justify-content-center mt-4">
            <Row >
              <Col sm={12} className='d-flex justify-content-center'>
                <h5>Or, you can share this link</h5>
              </Col>
              
              <Col sm={12} className="d-flex justify-content-center mt-1">
                <CopyToClipboard
                  text={`https://shopmaker-pwa.web.app/${shopInfo.id}`}
                  onCopy={() => setCopied({ copied: true })}
                >
                  <Button variant='success' className='rounded' size="sm">
                    Share Now!
                  </Button>
                </CopyToClipboard>
                
              </Col>
              <Col sm={12} className="d-flex justify-content-center">
              {copied ? <span style={{ color: 'red' }}>Copied.</span> : null}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Container>
  )
}
