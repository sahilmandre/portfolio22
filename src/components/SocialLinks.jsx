import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaFacebookF,
} from 'react-icons/fa6'
import { SOCIALS } from '../data/site'
import './SocialLinks.css'

const ICONS = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  youtube: FaYoutube,
  facebook: FaFacebookF,
}

export default function SocialLinks({ className = '' }) {
  return (
    <ul className={`socials ${className}`}>
      {SOCIALS.map(({ label, href, icon }) => {
        const Icon = ICONS[icon]
        return (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="socials__link"
            >
              <Icon aria-hidden="true" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
