import React, { useRef, useEffect, useState } from 'react'
import { Button, Form, Container, Col, Row } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom'
import { addUserDetails } from '../store/actions/userActions'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import mapboxgl from 'mapbox-gl'
import '../App.css'
import axios from 'axios'

mapboxgl.accessToken =
  'pk.eyJ1IjoiYWxlc2FuZHJvZ2VyYXJkIiwiYSI6ImNraG05ajdwNjA5OGYyeXFmeGp1ZHh5b3oifQ.K1CU3YqUh16FWJsLjO0h7g'

function PaymentPage() {
  const { register, handleSubmit, errors } = useForm()
  const dispatch = useDispatch()
  const history = useHistory()

  const onSubmit = async (data) => {
    dispatch(
      addUserDetails({
        name: data.name,
        address: data.address,
        phone: data.phone,
      })
    )
    history.goBack()
  }

  // *********************** INI MAP ********************************

  const mapContainerRef = useRef(null)
  const [lng, setlng] = useState(107.63182)
  const [lat, setlat] = useState(-6.9545939)
  const [zoom, setzoom] = useState(14)
  const [address, setaddress] = useState('')

  function getAddress(long, latit) {
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${latit}.json?access_token=pk.eyJ1IjoiYWxlc2FuZHJvZ2VyYXJkIiwiYSI6ImNraG05ajdwNjA5OGYyeXFmeGp1ZHh5b3oifQ.K1CU3YqUh16FWJsLjO0h7g`
      )
      .then(function (response) {
        setaddress(response.data.features[0].properties.address)
        console.log(
          response.data.features[0],
          response.data.features[0].properties.address,
          '<<<<<<RESPONSEEEEEEEEE'
        )
      })
      .catch(function (error) {
        console.log(error, '<<<<<<<<<<ERRRORRRRRRR')
      })
  }

  // initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // See style options here: https://docs.mapbox.com/api/maps/#styles
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    })

    // add navigation control (zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')

    map.on('style.load', function () {
      map.on('click', function (e) {
        let coordinates = e.lngLat
        new mapboxgl.Popup().setLngLat(coordinates).setHTML('').addTo(map)
        console.log(coordinates, '<<<<<<<<<<<<KOOORDINATTT')
        setlng(coordinates.lng)
        setlat(coordinates.lat)
        const long = coordinates.lng
        const latit = coordinates.lat
        getAddress(long, latit)
      })
    })

    map.on('move', () => {
      setzoom(map.getZoom().toFixed(2))
    })

    // clean up on unmount
    return () => map.remove()
  }, [])

  // ******************************************************************
  return (
    <>
      <Container className='my-5'>
        <Form onSubmit={handleSubmit(onSubmit)} className='pt-5'>
          <Form.Group>
            <h4 className='mb-3'>Form Order</h4>
            <Form.Group controlId='form.name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter your name'
                name='name'
                ref={register({ required: 'Name is required' })}
                isInvalid={errors.name}
              />
              {errors.name && (
                <Form.Text as='div' className='text text-danger'>
                  {errors.name.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId='form.phone'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter phone number'
                name='phone'
                ref={register({ required: 'Phone is required' })}
                isInvalid={errors.name}
              />
              {errors.phone && (
                <Form.Text as='div' className='text text-danger'>
                  {errors.phone.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId='form.address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter your address'
                name='address'
                ref={register({ required: 'Address is required' })}
                isInvalid={errors.name}
                value={address}
                onChange={(event) => setaddress(event.target.value)}
              />
              {errors.address && (
                <Form.Text as='div' className='text text-danger'>
                  {errors.address.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId='form.address'>
              <div
                className='map-container mx-auto mb-2'
                style={{ width: '100%', height: '250px', position: 'relative' }}
                ref={mapContainerRef}
              />
            </Form.Group>

            {JSON.stringify(register)}
            <Button className='w-100' variant='primary' type='submit'>
              Save
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </>
  )
}
export default PaymentPage
