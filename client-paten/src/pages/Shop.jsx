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
        <Row>
          <Col sm={12} className='d-flex justify-content-center mt-4'>
            <Image src={'/assets/home.svg'} className='w-25 mb-3' fluid />
          </Col>
        </Row>
        <h3>Your Shop is Ready!</h3>
        <QRCode value={`https://shopmaker-pwa.web.app/${shopInfo.id}`} />,
        <CopyToClipboard
          text={`https://shopmaker-pwa.web.app/${shopInfo.id}`}
          onCopy={() => setCopied({ copied: true })}
        >
          <Button variant='success' className='rounded'>
            Share Now!
          </Button>
        </CopyToClipboard>
        {copied ? <span style={{ color: 'red' }}>Copied.</span> : null}
      </div>
    </Container>
  )
}
