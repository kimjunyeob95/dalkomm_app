import React from "react";
import { Link } from "react-router-dom";

export default function Nav({ order }) {
  return (
    <nav id="menu" className="nav">
      <Link to="/" className={`btn ${order === 1 && "active"} `}>
        <div className="img-wrap">
          <svg viewBox="0 0 30 30">
            <g>
              <path
                fill="none"
                stroke="#000"
                strokeMiterlimit="10"
                className="path-stroke"
                d="M123.929 151.773l-10.075 8.185v12.151H134v-12.151z"
                transform="translate(4.925 5.356) translate(-113.853 -151.773)"
              />
              <path d="M0 0H1.09V6.094H0z" className="path-fill" transform="translate(4.925 5.356) translate(9.447 14.242)" />
            </g>
          </svg>
        </div>
        <span className="name en">HOME</span>
      </Link>
      <Link to="/pay" className={`btn ${order === 2 && "active"} `}>
        <div className="img-wrap">
          <svg viewBox="0 0 30 30">
            <g transform="translate(4.707 8.22)">
              <g id="그룹_10">
                <path id="사각형_21" fill="none" stroke="#000" strokeMiterlimit="10" className="path-stroke" d="M0 0H20.586V14.594H0z" />
                <path
                  id="선_3"
                  fill="none"
                  stroke="#000"
                  strokeMiterlimit="10"
                  className="path-stroke"
                  d="M0 0L3.615 0"
                  transform="translate(2.967 3.571)"
                />
              </g>
            </g>
          </svg>
        </div>
        <span className="name en">PAY</span>
      </Link>
      <Link to="/order" className={`btn ${order === 3 && "active"} `}>
        <div className="img-wrap">
          <svg viewBox="0 0 30 30">
            <g>
              <path
                fill="#fff"
                stroke="#000"
                strokeMiterlimit="10"
                d="M432.186 186.516h2.255a1.877 1.877 0 0 0 1.877-1.877v-3.856a1.877 1.877 0 0 0-1.877-1.877h-2.255"
                transform="translate(0.5 0.5) translate(3.933 8.22) translate(-413.168 -176.682)"
              />
              <path
                fill="#ff592e"
                d="M177.215 741.58h19.323s1.279 10.174-7.815 11.686-11.651-5.637-11.509-8.524"
                transform="translate(0.5 0.5) translate(3.933 8.22) translate(-176.933 -738.22)"
              />
              <path
                fill="none"
                stroke="#000"
                strokeMiterlimit="10"
                d="M330.758 167.045v7.171c0 4.866 4.33 8.363 9.671 8.363s9.671-3.5 9.671-8.363v-7.171z"
                transform="translate(0.5 0.5) translate(3.933 8.22) translate(-330.758 -167.045)"
              />
            </g>
          </svg>
        </div>
        <span className="name en">ORDER</span>
      </Link>
      <Link to="/mypage" className={`btn ${order === 4 && "active"} `}>
        <div className="img-wrap">
          <svg viewBox="0 0 30 30">
            <g transform="translate(4.445 4.589)">
              <circle cx="10.555" cy="10.555" r="10.555" fill="none" stroke="#000" strokeMiterlimit="10" className="path-stroke" />
              <g transform="translate(6.919 6.254)">
                <path
                  d="M838.286 219.463a4.767 4.767 0 0 1-6.742 0"
                  fill="none"
                  stroke="#000"
                  strokeMiterlimit="10"
                  className="path-stroke"
                  transform="translate(-831.28 -212.257)"
                />
                <path d="M0 0L0 2.191" fill="none" stroke="#000" strokeMiterlimit="10" className="path-stroke" transform="translate(0 0.114)" />
                <path d="M0 0L0 2.191" fill="none" stroke="#000" strokeMiterlimit="10" className="path-stroke" transform="translate(7.271 0.114)" />
                <path
                  d="M842.755 181.032v4.676h-1.562"
                  fill="none"
                  stroke="#000"
                  strokeMiterlimit="10"
                  className="path-stroke"
                  transform="translate(-839.12 -181.032)"
                />
              </g>
            </g>
          </svg>
        </div>
        <span className="name en">MY</span>
      </Link>
      <Link to="/menu" className={`btn ${order === 5 && "active"} `}>
        <div className="img-wrap">
          {order === 5 ? (
            <svg viewBox="0 0 30 30">
              <g id="타원_121" fill="#fff" stroke="#ff592e" transform="translate(5 13.5)">
                <circle stroke="none" cx="2" cy="2" r="2" />
                <circle fill="none" cx="2" cy="2" r="1.5" />
              </g>
              <g id="타원_122" fill="#fff" stroke="#ff592e" transform="translate(13 13.5)">
                <circle stroke="none" cx="2" cy="2" r="2" />
                <circle fill="none" cx="2" cy="2" r="1.5" />
              </g>
              <g id="타원_123" fill="#fff" stroke="#ff592e" transform="translate(21 13.5)">
                <circle stroke="none" cx="2" cy="2" r="2" />
                <circle fill="none" cx="2" cy="2" r="1.5" />
              </g>
            </svg>
          ) : (
            <svg viewBox="0 0 30 30">
              <g id="타원_121" fill="#fff" stroke="#000" transform="translate(5 13.5)">
                <circle stroke="none" cx="2" cy="2" r="2" />
                <circle fill="none" cx="2" cy="2" r="1.5" />
              </g>
              <g id="타원_122" fill="#fff" stroke="#000" transform="translate(13 13.5)">
                <circle stroke="none" cx="2" cy="2" r="2" />
                <circle fill="none" cx="2" cy="2" r="1.5" />
              </g>
              <g id="타원_123" fill="#fff" stroke="#000" transform="translate(21 13.5)">
                <circle stroke="none" cx="2" cy="2" r="2" />
                <circle fill="none" cx="2" cy="2" r="1.5" />
              </g>
            </svg>
          )}
        </div>
        <span className="name en">OTHER</span>
      </Link>
    </nav>
  );
}
