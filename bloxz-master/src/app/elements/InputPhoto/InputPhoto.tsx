import { cameraOutline } from 'ionicons/icons'
import { IonIcon, IonButton } from '@ionic/react'
import React from 'react'
import { useCamera } from '@ionic/react-hooks/camera'
import { CameraResultType, CameraSource } from '@capacitor/core'
import FormControl from 'app/elements/FormControl'
import { Caption } from 'app/fundamentals/Typography'
import { InputPhotoProps } from './types'

const InputPhoto = ({ name, label, formik: { touched, errors, setFieldValue } }: InputPhotoProps) => {
  const { getPhoto } = useCamera()
  const takePhoto = async () => {
    const cameraPhoto = await getPhoto({
      height: 200,
      width: 300,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100,
    })
    return cameraPhoto.dataUrl
  }

  const snapshot = () =>
    takePhoto().then(dataUrl => {
      setFieldValue(name, dataUrl)
    })

  return (
    <div>
      <FormControl
        error={!!(touched[name] && errors[name])}
        errorMsg={errors[name] as string}
        data-testid="input-photo"
      >
        <Caption data-testid="input-photo__label">{label}</Caption>
        <IonButton color="primary" onClick={snapshot}>
          <IonIcon icon={cameraOutline} />
        </IonButton>
      </FormControl>
    </div>
  )
}

export default InputPhoto
