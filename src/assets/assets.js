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

import DrAyesha from "./dr-ayesha-5c67a90482519.webp";
import DrUsman from "./Dr.-Usman.jpg";
import DrZainab from "./dr-zainab.jpeg";
import DrBilal from "./drbial.jpeg";
import DrNoor from "./dr noor.webp";

export const specialityData = [
    {
 speciality: 'General-Physician',
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
        speciality: 'Gynaecologist',
 image: pediatrics
    },
     {
        speciality: 'OPD',
 image: mission
    },
]



// Doctors Data
export const doctorsData = [
  {
    id: 1,
    name: "Dr. Sarah Ahmed",
    speciality: "Cardiologist",
    degree: "MBBS, FCPS (Cardiology)",
    about: "10+ years of experience in treating heart diseases. Specialist in ECG, angiography, and heart failure management. Known for her calm, patient-centered approach.",
    image: DrSarah,
  },
  {
    id: 2,
    name: "Dr. Ali Khan",
    speciality: "Neurologist",
    degree: "MBBS, FCPS (Neurology)",
    about: "12+ years of experience in brain and nerve disorders. Expert in migraines, seizures, and neuropathy. Focuses on accurate diagnosis with advanced neuro testing.",
    image: DrAli,
  },
  {
    id: 3,
    name: "Dr. Hamza Raza",
    speciality: "General-Physician",
    degree: "MBBS, MD (Internal Medicine)",
    about: "Expert in routine checkups and chronic illness care. Provides preventive and primary healthcare. Known for friendly, detailed patient guidance.",
    image: DrHamza,
  },
  {
    id: 4,
    name: "Dr. Maryam Saleem",
    speciality: "Orthopedic",
    degree: "MBBS, MS (Orthopedics)",
    about: "8+ years of experience in bone and joint care. Specialist in fractures, arthritis, and sports injuries. Provides personalized recovery plans.",
    image: DrMaryam,
  },
  {
    id: 5,
    name: "Dr. Hassan Qureshi",
    speciality: "Gasterologist",
    degree: "MBBS, FCPS (Gastroenterology)",
    about: "Expert in stomach and liver diseases with 11+ years of experience. Skilled in endoscopy, hepatitis, and gastric disorders. Known for clear and effective consultations.",
    image: DrHassan,
  },

  // NEW DOCTORS
  {
    id: 6,
    name: "Dr. Ayesha Siddiqui",
    speciality: "Dermatologist",
    degree: "MBBS, MD (Dermatology)",
    about: "Specialist in skin, hair, and nail treatments. 9+ years of experience in acne, pigmentation, and cosmetic dermatology. Provides safe and effective skin solutions.",
    image: DrAyesha,
  },
  {
    id: 7,
    name: "Dr. Usman Tariq",
    speciality: "Pediatrician",
    degree: "MBBS, FCPS (Pediatrics)",
    about: "Expert in child health with 10+ years of experience. Handles newborn to teen medical care. Known for gentle and caring treatment for kids.",
    image: DrUsman,
  },
  {
    id: 8,
    name: "Dr. Zainab Fatima",
    speciality: "Gynaecologist",
    degree: "MBBS, FCPS (Gyneacology & Obstetrics)",
    about: "Experienced in women health, pregnancy care, and fertility. 8+ years of practice helping women with safe guidance. Known for supportive, respectful care.",
    image: DrZainab,
  },
  {
    id: 9,
    name: "Dr. Bilal Arif",
    speciality: "ENT Specialist",
    degree: "MBBS, FCPS (ENT)",
    about: "Specialist in ear, nose, and throat treatments. 9+ years of experience in sinus issues, throat infections, and hearing problems. Provides accurate and quick relief.",
    image: DrBilal,
  },


  // {
  //   id: 10,
  //   name: "Dr. Shanza Khan",
  //   speciality: "Psychiatrist",
  //   image: DrShanza,
  // },
  // {
  //   id: 11,
  //   name: "Dr. Imran Sheikh",
  //   speciality: "Cardiologist",
  //   image: DrImran,
  // },
  {
  id: 12,
  name: "Dr. Noor Fatima",
  speciality: "Neurologist",
  degree: "MBBS, FCPS (Neurology)",
  about: "Expert in treating brain and nerve-related disorders. Skilled in managing migraines, strokes, and neuropathy. Known for her careful evaluation and patient-friendly behavior.",
  image: DrNoor,
},

  // {
  //   id: 13,
  //   name: "Dr. Saad Javed",
  //   speciality: "General Physician",
  //   image: DrSaad,
  // },
  // {
  //   id: 14,
  //   name: "Dr. Areeba Shah",
  //   speciality: "Orthopedic",
  //   image: DrAreeba,
  // },
  // {
  //   id: 15,
  //   name: "Dr. Kamran Hashmi",
  //   speciality: "Gasterologist",
  //   image: DrKamran,
  // },
  // {
  //   id: 16,
  //   name: "Dr. Rabia Suleman",
  //   speciality: "Dermatologist",
  //   image: DrRabia,
  // },
  // {
  //   id: 17,
  //   name: "Dr. Farhan Mehmood",
  //   speciality: "Pediatrician",
  //   image: DrFarhan,
  // },
  // {
  //   id: 18,
  //   name: "Dr. Hira Bashir",
  //   speciality: "Gynecologist",
  //   image: DrHira,
  // },
  // {
  //   id: 19,
  //   name: "Dr. Adeel Aslam",
  //   speciality: "ENT Specialist",
  //   image: DrAdeel,
  // },
  // {
  //   id: 20,
  //   name: "Dr. Mehwish Rehman",
  //   speciality: "Psychiatrist",
  //   image: DrMehwish,
  // },
];
