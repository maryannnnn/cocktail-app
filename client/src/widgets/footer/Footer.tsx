import {FC} from "react";
import './footer.scss'
import './media.scss'

const Footer: FC = () => {
  return (
    <div className="footer">
      <div className="container">
          <div className="footer__inner">
              Copyright © 2024
          </div>
      </div>
    </div>
  )
}

export default Footer