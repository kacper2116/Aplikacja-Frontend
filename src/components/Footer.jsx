import React from 'react'
import styles from '../styles/footer.module.css'
import { GrFacebook } from 'react-icons/gr'
import { BsTwitter } from 'react-icons/bs'
import { BsInstagram } from 'react-icons/bs'
import { SiTiktok } from 'react-icons/si'


const FooterSection = ({ data }) => {

  return (

    <div className={styles.FooterSection}>
      <h3>{data.header}</h3>
      <div>
        {data.content.map((item, index) => {
          return (
            <span key={index}><a href={data.links[index]}>{item}</a></span>
          )
        })}
      </div>
    </div>
  )
}



const FooterSection1 = {
  header: "Konto",
  content: ["Logowanie", "Rejestracja"],
  links: ["#/login", "#/register"]
}
const FooterSection2 = {
  header: "Gry",
  content: ["Najnowsze", "Wszystkie gry"],
  links: ["#/products/Latest%20Games", "#/products/All%20Games",]
}


const SocialMediaIcons = [<GrFacebook />, <BsTwitter />, <BsInstagram />, <SiTiktok />]

const FooterSection3 = {
  header: "Social media",
  content: SocialMediaIcons,
  links: ["https://www.facebook.com/", "https://twitter.com/", "https://www.instagram.com/", "https://www.tiktok.com/"]
}




const Footer = () => {
  return (

    <nav className={styles.Container}>
      <div className={styles.Wrapper}>
        
        <FooterSection data={FooterSection1} />
        <FooterSection data={FooterSection2} />
        <FooterSection data={FooterSection3} />
        

      </div>
    </nav>

  )
}

export default Footer