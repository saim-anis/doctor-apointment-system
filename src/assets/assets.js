import Generalcare from "./Generalcare.svg";
import neurology from "./neurology.svg";
import Cardiology from "./Cardiology.svg";
import Gasterology from "./Gasterology.svg";
import orthopedics from "./orthopedics.svg";
import pediatrics from "./pediatrics.svg"
import mission from "./mission.svg"

// doctors
import DrMaryam from "./Dr Maryam.avif"
import DrAli from "./Dr ali.avif"
import DrSarah from  "./Dr sarah saleem.avif"
import DrHamza from  "./Dr. Hamza Raza.avif"
import DrHassan from  "./Dr. Hassan Qureshi.avif"


export const specialityData = [
    {
 speciality: 'General-physician',
 image: Generalcare


    },{
        speciality: 'Neurologist',
 image: neurology
    },
    {
        speciality: 'Cardiologist',
 image: Cardiology
    },{
        speciality: 'Gasterologist',
 image: Gasterology
    },{
        speciality: 'Orthopedic',
 image: orthopedics
    },
    {
        speciality: 'Prthopedic',
 image: pediatrics
    },
     {
        speciality: 'OPD',
 image: mission
    }
]



// Doctors Data

export const doctorsData = [
  {
    id: 1,
    name: "Dr. Sarah Ahmed",
    speciality: "Cardiologist",
    
    image: DrSarah,
  },
  {
    id: 2,
    name: "Dr. Ali Khan",
    speciality: "Neurologist",
   
    image: DrAli,
  },
  {
    id: 3,
    name: "Dr. Hamza Raza",
    speciality: "General Physician",
    
    image: DrHamza,
  },
  {
    id: 4,
    name: "Dr. Maryam Saleem",
    speciality: "Orthopedic",
   
    image: DrMaryam,
  },
  {
    id: 5,
    name: "Dr. Hassan Qureshi",
    speciality: "Gasterologist",
    
    image: DrHassan,
  },



  // Duplicate data start
  {
    id: 2,
    name: "Dr. Ali Khan",
    speciality: "Neurologist",
   
    image: DrAli,
  },
  {
    id: 5,
    name: "Dr. Hassan Qureshi",
    speciality: "Gasterologist",
    
    image: DrHassan,
  },
  {
    id: 4,
    name: "Dr. Maryam Saleem",
    speciality: "Orthopedic",
   
    image: DrMaryam,
  },
  {
    id: 1,
    name: "Dr. Sarah Ahmed",
    speciality: "Cardiologist",
    
    image: DrSarah,
  },
  // Duplicate data end
  // 1:27:55 sec
];