import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

function Appointment() {

  const { docId } = useParams();
  const { doctorsData } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);

  useEffect(() => {
    if (!doctorsData) return;

    const info = doctorsData.find(doc => doc.id === parseInt(docId));
    setDocInfo(info);

  }, [doctorsData, docId]);

  if (!docInfo) return <div>Loading...</div>;

  return (
    <div>

      <div>
        <img src={docInfo.image} alt="" />
      </div>

      <div>
        <p>{docInfo.name}  <FontAwesomeIcon icon={faCircleCheck} className='text-blue-800' />  </p>
        <div>
          <p>{docInfo.degree}</p>
        </div>
      </div>

    </div>
  )
}

export default Appointment;
