import React, { useRef, useState } from 'react'
import Head from 'next/head'
import { toast } from 'react-toastify'

import { Container } from '../styles/pages/Home'

const Home: React.FC = () => {
  const toastId = useRef(null)
  const [downloadIsDisabled, setDownloadIsDisabled] = useState(false)

  const downloadPDF = async () => {
    setDownloadIsDisabled(true)
    toastId.current = toast.success('Your download was started!', {
      autoClose: 10000,
      draggable: false,
      closeOnClick: false,
      position: 'top-center'
    })
    fetch('http://localhost:3333/report/5')
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]))
        const link = document.createElement('a')

        link.href = url
        link.setAttribute('download', 'report.pdf')
        document.body.appendChild(link)
        link.click()
        link.parentNode.removeChild(link)

        setDownloadIsDisabled(false)
        toast.dismiss(toastId.current)
      })
  }
  return (
    <Container>
      <Head>
        <title>Home</title>
      </Head>

      <h1>Download PDF</h1>
      <button disabled={downloadIsDisabled} onClick={downloadPDF}>
        Download
      </button>
    </Container>
  )
}

export default Home
