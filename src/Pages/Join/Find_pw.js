import React from "react";
import HeaderSub from "Components/Header/HeaderSub";
import GoContents from "Components/GoContents";
export default function Find_pw() {
  return (
    <React.Fragment>
      <GoContents />

      <div id="wrap" className="wrap">
        <div id="container" className="container">
          <HeaderSub title="비밀번호 찾기" />

          {/* <nav id="menu" className="nav">
				<Link to="MA001.html" className="btn active">
					<div className="img-wrap">
						<svg viewBox="0 0 30 30">
							<g>
								<path fill="none" stroke="#000" stroke-miterlimit="10" className="path-stroke"
									d="M123.929 151.773l-10.075 8.185v12.151H134v-12.151z"
									transform="translate(4.925 5.356) translate(-113.853 -151.773)" />
								<path d="M0 0H1.09V6.094H0z" className="path-fill"
									transform="translate(4.925 5.356) translate(9.447 14.242)" />
							</g>
						</svg>
					</div>
					<span className="name en">HOME</span>
				</Link>
				<Link to="CA001.html" className="btn">
					<div className="img-wrap">
						<svg viewBox="0 0 30 30">
							<g transform="translate(4.707 8.22)">
								<g id="그룹_10">
									<path id="사각형_21" fill="none" stroke="#000" stroke-miterlimit="10"
										className="path-stroke" d="M0 0H20.586V14.594H0z" />
									<path id="선_3" fill="none" stroke="#000" stroke-miterlimit="10"
										className="path-stroke" d="M0 0L3.615 0" transform="translate(2.967 3.571)" />
								</g>
							</g>
						</svg>
					</div>
					<span className="name en">PAY</span>
				</Link>
				<Link to="TO001.html" className="btn">
					<div className="img-wrap">
						<svg viewBox="0 0 30 30">
							<g>
								<path fill="#fff" stroke="#000" stroke-miterlimit="10"
									d="M432.186 186.516h2.255a1.877 1.877 0 0 0 1.877-1.877v-3.856a1.877 1.877 0 0 0-1.877-1.877h-2.255"
									transform="translate(0.5 0.5) translate(3.933 8.22) translate(-413.168 -176.682)" />
								<path fill="#ff592e"
									d="M177.215 741.58h19.323s1.279 10.174-7.815 11.686-11.651-5.637-11.509-8.524"
									transform="translate(0.5 0.5) translate(3.933 8.22) translate(-176.933 -738.22)" />
								<path fill="none" stroke="#000" stroke-miterlimit="10"
									d="M330.758 167.045v7.171c0 4.866 4.33 8.363 9.671 8.363s9.671-3.5 9.671-8.363v-7.171z"
									transform="translate(0.5 0.5) translate(3.933 8.22) translate(-330.758 -167.045)" />
							</g>
						</svg>
					</div>
					<span className="name en">ORDER</span>
				</Link>
				<Link to="ME001.html" className="btn">
					<div className="img-wrap">
						<svg viewBox="0 0 30 30">
							<g transform="translate(4.445 4.589)">
								<circle cx="10.555" cy="10.555" r="10.555" fill="none" stroke="#000"
									stroke-miterlimit="10" className="path-stroke" />
								<g transform="translate(6.919 6.254)">
									<path d="M838.286 219.463a4.767 4.767 0 0 1-6.742 0" fill="none" stroke="#000"
										stroke-miterlimit="10" className="path-stroke"
										transform="translate(-831.28 -212.257)" />
									<path d="M0 0L0 2.191" fill="none" stroke="#000" stroke-miterlimit="10"
										className="path-stroke" transform="translate(0 0.114)" />
									<path d="M0 0L0 2.191" fill="none" stroke="#000" stroke-miterlimit="10"
										className="path-stroke" transform="translate(7.271 0.114)" />
									<path d="M842.755 181.032v4.676h-1.562" fill="none" stroke="#000"
										stroke-miterlimit="10" className="path-stroke"
										transform="translate(-839.12 -181.032)" />
								</g>
							</g>
						</svg>
					</div>
					<span className="name en">MY</span>
				</Link>
				<Link to="AP001.html" className="btn">
					<div className="img-wrap">
						<svg viewBox="0 0 30 30">
							<g transform="translate(4.754 7.637)">
								<path d="M0 0L20.492 0" fill="#fff" stroke="#000" stroke-miterlimit="10"
									className="path-stroke" transform="translate(0 -0.637)" />
								<path d="M0 0L20.492 0" fill="#fff" stroke="#000" stroke-miterlimit="10"
									className="path-stroke" transform="translate(0 7.363)" />
								<path d="M0 0L20.492 0" fill="#fff" stroke="#000" stroke-miterlimit="10"
									className="path-stroke" transform="translate(0 15.363)" />
							</g>
						</svg>
					</div>
					<span className="name en">MENU</span>
				</Link>
			</nav> */}

          <div id="content" className="login search">
            <div className="w-inner">
              <div className="form-wrap">
                <form className="form">
                  <div className="title-wrap">
                    <h2 className="title">
                      등록하신 휴대전화 번호로 인증하여
                      <br />
                      비밀번호를 확인합니다.
                    </h2>
                  </div>

                  <fieldset className="fieldset">
                    <legend className="blind">비밀번호 찾기</legend>
                    <div className="field">
                      <label className="blind" htmlFor="userId">
                        아이디 또는 이메일주소
                      </label>
                      <div className="insert">
                        <input type="text" className="input-text medium" id="userId" placeholder="아이디나 이메일주소를 입력해주세요." />
                      </div>
                    </div>
                    <div className="field">
                      <label className="blind" htmlFor="userPhone">
                        휴대전화 번호
                      </label>
                      <div className="insert">
                        <div className="bundle">
                          <input
                            type="number"
                            className="input-text medium"
                            id="userPhone"
                            placeholder="휴대전화 번호를 입력해 주세요."
                            inputMode="numeric"
                          />
                          <button type="button" className="btn dark-g small">
                            인증하기
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <label className="blind" htmlFor="numChk">
                        인증번호
                      </label>
                      <div className="insert">
                        <input type="number" className="input-text medium" id="numChk" placeholder="인증번호를 입력해 주세요." inputMode="numeric" />
                      </div>
                    </div>
                  </fieldset>
                  <div className="btn-area">
                    <button className="btn dark full large">인증번호 입력</button>
                  </div>
                </form>
              </div>

              {/* [D]: 휴대전화 번호 인증시 노출 */}
              <div className="result-wrap">
                <div className="title-wrap">
                  <h2 className="title">새로운 비밀번호를 설정해 주세요.</h2>
                </div>

                <div className="form-wrap">
                  <form className="form">
                    <fieldset className="fieldset">
                      <legend className="blind">비밀번호 재설정</legend>
                      <div className="field">
                        <label className="blind" htmlFor="userPw">
                          비밀번호 입력
                        </label>
                        <div className="insert">
                          <input type="password" className="input-text medium" id="userPw" placeholder="비밀번호를 입력해 주세요." />
                        </div>
                        <p className="guide-txt">8자리 이상 영문, 숫자, 특수문자 중 2가지 이상 사용해 주세요.</p>
                      </div>
                      <div className="field">
                        <label className="blind" htmlFor="userPwChk">
                          비밀번호 재입력
                        </label>
                        <div className="insert">
                          <input type="password" className="input-text medium" id="userPwChk" placeholder="비밀번호를 한번 더 입력해 주세요." />
                        </div>
                      </div>
                    </fieldset>
                    <div className="btn-area">
                      <button className="btn dark full large">비밀번호 재설정</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* // #content */}
        </div>
        {/* // #container */}
      </div>
    </React.Fragment>
  );
}
