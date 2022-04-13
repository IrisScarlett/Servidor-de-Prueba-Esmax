import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

import axios from 'axios'
import { endpointApi } from '../../helpers/variableApi'

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12
    }
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2
  }
}))
export default function BotonVacioRF ({ datosLibreta, planta, estanque, estVolumen, setEstVolumen }) {
  const [checkVacio, setCheckVacio] = useState(true)

  const handleCheckBoxVacio = (e) => {
    setCheckVacio({
      checked: e.target.checked
    })
    console.log('cambie')
  }

  useEffect(async () => {
    const { data: { datos } } = await axios.get(endpointApi + `/api/forms/infoCalibracion${planta}&${estanque}&${(parseInt(datosLibreta?.altura_interna) / 10)}`)

    // & Vaciar el input de volumen estanque si el checkbox vacio esta activado
    if (checkVacio.checked === true) {
      setEstVolumen(0)
    } else if (checkVacio.checked === false) {
      setEstVolumen(datos[0]?.est_volumen)
    }
  }, [datosLibreta, checkVacio, estVolumen])

  return (
    <FormGroup>

      <FormControlLabel
        label='Vacio'
        control={<Android12Switch defaultChecked={false} />}
        onChange={handleCheckBoxVacio}

      />

    </FormGroup>
  )
}
